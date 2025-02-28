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

  try {
    console.log(req.body)
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
      return res.status(400).json({ message: "El precio debe ser un número positivo" });
    }

    if (stock < 0 || !Number.isInteger(stock)) {
      return res.status(400).json({ message: "El stock debe ser un número entero positivo" });
    }

    if (stock === 0 && active === true) {
      return res.status(400).json({ message: "El estado del producto no puede ser activo debido a que no hay existencias en su inventario" });
    }

    let calculatedUnitPrice = buy_price + (buy_price * (code_earn / 100));

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
    res.status(500).json({ error: error.message || "Error interno del servidor" });
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
    const { product_id} = req.params;

    if (!product_id) {
      return res.status(400).json({ message: "No se envio un id" });
    }

    const productById = await products.findByPk(product_id);

    if (!productById) {
      return res
        .status(404)
        .json({ message: `no se encontraron productos con el id: ${product_id}` });
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

const getProductByCode = async (req,res) => {
  const { products } = db.models;
  const { code } = req.params;
  try {
    if (!code || code.trim() === ""){
      return res
      .status(400)
      .json ({ message: "El codigo es requerido, no puede estar vacio"});
    }

    const productByCode = await products.findOne({
      where: {
        code: {
          [Op.like]: `%${code}%`,
        },
      },
      // include: [{ model:detail_purchases, as: "detailpurchase"}, { model:detail_shopping, as: "detailshopping"}],
    });

    if (productByCode.length === 0){
      return res.status(404).json({
        message:`No se encontraron productos con el codigo: ${code}`,
      });
    }
    return res.status(200).json(productByCode);
}catch (error){
  res.status(500).json({error: error.message});
}
};

 
const editProduct = async (req, res) => {
  const { products } = db.models;
  const {product_id} = req.params
  const {
    name,
    description,
    brand,
    stock,
    unit_price,
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
    if (description !== undefined) fieldsToUpdate.description = description.trim();
    if (brand !== undefined) fieldsToUpdate.brand = brand.trim();
  
    if (stock !== undefined) {
      if (stock < 0 || !Number.isInteger(stock)) {
        return res.status(400).json({ message: "El stock debe ser un número entero positivo" });
      }
      fieldsToUpdate.stock = stock;
    }
  
    if (unit_price !== undefined) {
      if (unit_price <= 0 || isNaN(unit_price)) {
        return res.status(400).json({ message: "El precio debe ser un número positivo" });
      }
      fieldsToUpdate.unit_price = unit_price;
    }
  
    if (code !== undefined) fieldsToUpdate.code = code.trim();
    if (taxes_code !== undefined) fieldsToUpdate.taxes_code = taxes_code.trim();
  
    // Validación para 'active' si se proporciona
    if (active !== undefined) {
      if (typeof active !== "boolean") {
        return res.status(400).json({ message: "El campo 'active' debe ser un valor booleano" });
      }
      fieldsToUpdate.active = active;
    }
  
    // Verificar si hay al menos un campo a actualizar
    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({
        message: "No se proporcionaron campos para actualizar",
      });
    }
  
    // Actualizar el producto
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
        .json({ message: `No se encontró el producto con el id: ${product_id}` });
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
