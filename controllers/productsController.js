import { Sequelize, Op } from "sequelize";
import db from "../models/index.js";

const createProduct = async (req, res) => {
  const { products } = db.models;
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
    if (
      !name ||
      !unit_price ||
      !code ||
      !brand ||
      !stock ||
      !taxes_code ||
      !active
    ) {
      return res
        .status(400)
        .json({ message: "Falta dilienciar informacion obligatoria" });
    }

    await products.create({
      name,
      description,
      brand,
      stock,
      unit_price,
      code,
      taxes_code,
      active: active ?? true,
    });
    return res.status(201).json({ message: `${name} fue creado con exito` });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "No se envio un id" });
    }
    const productById = await products.findByPk(id);

    if (!productById) {
      return res
        .status(400)
        .json({ message: `no se encontraron productos con el id: ${id}` });
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

    return res.status(200).json(productByName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editProduct = async (req, res) => {
  const { products } = db.models;
  const {
    id_products,
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
    const existingProduct = await products.findByPk(id_products);

    if (!existingProduct) {
      return res.status(404).json({
        message: `No se encontró un producto con el id: ${id_products}`,
      });
    }

    const fieldsToUpdate = {};

    if (name !== undefined) fieldsToUpdate.name = name;
    if (description !== undefined) fieldsToUpdate.description = description;
    if (brand !== undefined) fieldsToUpdate.brand = brand;
    if (stock !== undefined) fieldsToUpdate.stock = stock;
    if (unit_price !== undefined) fieldsToUpdate.unit_price = unit_price;
    if (code !== undefined) fieldsToUpdate.code = code;
    if (taxes_code !== undefined) fieldsToUpdate.taxes_code = taxes_code;
    if (active !== undefined) fieldsToUpdate.active = active;

    // Verificar si hay al menos un campo a actualizar
    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({
        message: "No se proporcionaron campos para actualizar",
      });
    }

    await existingProduct.update(fieldsToUpdate);

    return res.status(200).json({
      message: `${name} fue actualizado con éxito`,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const toggleProductStatus = async (req, res) => {
  const { products } = db.models;
  const { id } = req.params;
  try {
    const existingProduct = await products.findByPk(id);

    if (!existingProduct) {
      return res
        .status(404)
        .json({ message: `No se encontró el producto con el id: ${id}` });
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
  editProduct,
  toggleProductStatus,
};
