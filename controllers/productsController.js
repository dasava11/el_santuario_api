import { Sequelize, Op } from "sequelize";
import db from "../models/index.js";

const createProduct = async (req, res) => {
  const { products } = db.models;
  const {
    name,
    description,
    brand,
    stock,
    buy_price,
    code_earn,
    code,
    taxes_code,
    active,
  } = req.body;

  console.log("Request body recibido en producción:", req.body);

  try {
    console.log(req.body);
    if (
      !name?.trim() ||
      !code?.trim() ||
      !brand?.trim() ||
      stock === undefined ||
      taxes_code === undefined ||
      buy_price === undefined ||
      code_earn === undefined
    ) {
      return res
        .status(400)
        .json({ message: "Falta diligenciar informacion obligatoria" });
    }

    const existingProduct = await products.findOne({
      where: {
        name: {
          [Op.like]: name,
        },
      },
    });

    if (existingProduct) {
      return res.status(400).json({ message: `${name} ya existe` });
    }

    const existingProductByCode = await products.findOne({
      where: {
        code,
      },
    });

    if (existingProductByCode) {
      return res.status(400).json({ message: `El código ${code} ya existe` });
    }

    if (buy_price <= 0 || isNaN(buy_price)) {
      return res
        .status(400)
        .json({ message: "El precio debe ser un número positivo" });
    }

    if (stock < 0 || !Number.isInteger(stock)) {
      return res
        .status(400)
        .json({ message: "El stock debe ser un número entero positivo" });
    }

    if (stock === 0 && active === true) {
      return res
        .status(400)
        .json({
          message:
            "El estado del producto no puede ser activo debido a que no hay existencias en su inventario",
        });
    }
    const earnRate = code_earn / 100
    let calculatedUnitPrice = buy_price * (1 + earnRate);

    await products.create({
      name,
      description,
      brand,
      stock,
      buy_price,
      code_earn,
      unit_price: calculatedUnitPrice,
      code,
      taxes_code,
      active: active ?? true,
    });
    return res.status(201).json({ message: `${name} fue creado con exito` });
  } catch (error) {
    console.error("Error en createProduct:", error);
    res
      .status(500)
      .json({ error: error.message || "Error interno del servidor" });
  }
};

const getAllProducts = async (req, res) => {
  const { products } = db.models;

  try {
    const allProducts = await products.findAll();

    if (allProducts.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron los productos" });
    }

    return res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  const { products } = db.models;
  try {
    console.log("Params en controlador:", req.params);
    const { product_id, id_products } = req.params;
    const id = product_id || id_products; // Toma el que venga

    if (!id) {
      return res.status(400).json({ message: "No se envio un id" });
    }

    const productById = await products.findByPk(id);

    if (!productById) {
      return res
        .status(404)
        .json({
          message: `no se encontraron productos con el id: ${id}`,
        });
    }

    return res.status(200).json(productById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductByName = async (req, res) => {
  const { products } = db.models;
  try {
    const { name } = req.query;

    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ message: "El nombre es requerido y no puede estar vacío." });
    }

    const productByName = products.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });

    if (productByName.length === 0) {
      return res.status(404).json({
        message: `No se encontraron productos con el nombre: ${name}`,
      });
    }

    return res.status(200).json(productByName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductByCode = async (req, res) => {
  const { products } = db.models;
  const { code } = req.params;
  try {
    if (!code || code.trim() === "") {
      return res
        .status(400)
        .json({ message: "El codigo es requerido, no puede estar vacio" });
    }

    const productByCode = await products.findOne({
      where: {
        code: {
          [Op.like]: `%${code}%`,
        },
      },
    });

    if (productByCode.length === 0) {
      return res.status(404).json({
        message: `No se encontraron productos con el codigo: ${code}`,
      });
    }
    return res.status(200).json(productByCode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editProduct = async (req, res) => {
  const { products } = db.models;
  console.log("Params en controlador:", req.params);
  const { product_id } = req.params;
  const {
    name,
    description,
    brand,
    stock,
    buy_price,
    code_earn,
    code,
    taxes_code,
    active,
  } = req.body;

  try {
    const existingProduct = await products.findByPk(product_id);

    if (!existingProduct) {
      return res.status(404).json({
        message: `No se encontró un producto con el id: ${product_id}`,
      });
    }

    const fieldsToUpdate = {};

    if (name !== undefined) fieldsToUpdate.name = name.trim();
    if (description !== undefined)
      fieldsToUpdate.description = description.trim();
    if (brand !== undefined) fieldsToUpdate.brand = brand.trim();
    if (code !== undefined) fieldsToUpdate.code = code.trim();

    if (stock !== undefined) {
      if (stock < 0 || !Number.isInteger(stock)) {
        return res
          .status(400)
          .json({ message: "El stock debe ser un número entero positivo" });
      }
      fieldsToUpdate.stock = stock;
    }

    if (buy_price !== undefined) {
      if (buy_price <= 0 || isNaN(buy_price)) {
        return res
          .status(400)
          .json({ message: "El precio debe ser un número positivo" });
      }
      fieldsToUpdate.buy_price = Number(buy_price);
    }

    if (code_earn !== undefined) {
      if (code_earn < 0 || isNaN(code_earn)) {
        return res
          .status(400)
          .json({
            message: "El código de ganancia debe ser un número positivo",
          });
      }
      fieldsToUpdate.code_earn = Number(code_earn);
    }

    if (taxes_code !== undefined) {
      if (taxes_code < 0 || isNaN(taxes_code)) {
        return res
          .status(400)
          .json({
            message: "El código de impuestos debe ser un número positivo",
          });
      }
      fieldsToUpdate.taxes_code = Number(taxes_code);
    }

    if (active !== undefined) {
      if (typeof active !== "boolean") {
        return res
          .status(400)
          .json({ message: "El campo 'active' debe ser un valor booleano" });
      }
      fieldsToUpdate.active = active;
    }

    // 🛠 **Calcular `unit_price` siempre que haya un `buy_price` o `code_earn` actualizado**
    const finalBuyPrice =
      fieldsToUpdate.buy_price !== undefined
        ? fieldsToUpdate.buy_price
        : existingProduct.buy_price;
    const finalCodeEarn =
      fieldsToUpdate.code_earn !== undefined
        ? fieldsToUpdate.code_earn
        : existingProduct.code_earn;

        let finaleErnRate = finalCodeEarn / 100

    if (!isNaN(finalBuyPrice) && !isNaN(finalCodeEarn)) {
      fieldsToUpdate.unit_price = Number(
        (finalBuyPrice + finalBuyPrice * (1 + finaleErnRate)).toFixed(4)
      );
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({
        message: "No se proporcionaron campos para actualizar",
      });
    }

    await existingProduct.update(fieldsToUpdate);

    return res.status(200).json({
      message: `${name || "El producto"} fue actualizado con éxito`,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const toggleProductStatus = async (req, res) => {
  const { products } = db.models;
  const { product_id } = req.params;
  try {
    const existingProduct = await products.findByPk(product_id);

    if (!existingProduct) {
      return res
        .status(404)
        .json({
          message: `No se encontró el producto con el id: ${product_id}`,
        });
    }

    const newStatus = !existingProduct.active;
    await existingProduct.update({ active: newStatus });

    return res.status(200).json({
      message: `El producto ${existingProduct.name} ahora está ${
        newStatus ? "activo" : "inactivo"
      }`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByName,
  getProductByCode,
  editProduct,
  toggleProductStatus,
};
