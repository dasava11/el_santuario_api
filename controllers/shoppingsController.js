import { success, error } from "../red/answers.js";
import { Sequelize, Op } from "sequelize";
import db from "../models/index.js";

// Obtener todos los registros de compras
const getAllShoppings = async (req, res) => {
  const { shopping } = db.models;

  try {
    const allShoppings = await shopping.findAll();
    if (allShoppings.length === 0) {
      return res.status(404).json({ message: "No hay registros de compras" });
    }
    res.status(200).json(allShoppings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una compra por ID
const getShoppingById = async (req, res) => {
  const { Shopping } = db.models;
  const { shopping_id } = req.params;

  try {
    const shopping = await Shopping.findByPk(shopping_id);
    if (!shopping) {
      return res.status(404).json({ message: "Compra no encontrada" });
    }
    res.status(200).json(shopping);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva compra
const createShopping = async (req, res) => {
  const { Shopping } = db.models;
  const { date, userId, customer, payment_method, taxes, subtotal, total_sale } = req.body;

  try {
    const newShopping = await Shopping.create({
      date,
      userId,
      customer,
      payment_method,
      taxes,
      subtotal,
      total_sale,
    });
    res.status(201).json(newShopping);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Editar una compra existente
const editShopping = async (req, res) => {
  const { Shopping } = db.models;
  const { shopping_id } = req.params;
  const { date, userId, customer, payment_method, taxes, subtotal, total_sale } = req.body;

  try {
    const shopping = await Shopping.findByPk(shopping_id);
    if (!shopping) {
      return res.status(404).json({ message: "Compra no encontrada" });
    }

    await shopping.update({
      date,
      userId,
      customer,
      payment_method,
      taxes,
      subtotal,
      total_sale,
    });
    res.status(200).json(shopping);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* // Eliminar (deshabilitar lógicamente) una compra
const deleteShopping = async (req, res) => {
  const { Shopping } = db.models;
  const { shopping_id } = req.params;

  try {
    const shopping = await Shopping.findByPk(shopping_id);
    if (!shopping) {
      return res.status(404).json({ message: "Compra no encontrada" });
    }

    // Aquí se maneja la deshabilitación lógica en lugar de eliminar
    await shopping.update({ isActive: false });
    res.status(200).json({ message: "Compra deshabilitada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; */

// Eliminar una compra permanentemente
const destroyShopping = async (req, res) => {
  const { Shopping } = db.models;
  const { shopping_id } = req.params;

  try {
    const shopping = await Shopping.findByPk(shopping_id);
    if (!shopping) {
      return res.status(404).json({ message: "Compra no encontrada" });
    }

    await shopping.destroy();
    res.status(200).json({ message: "Compra eliminada permanentemente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllShoppings,
  getShoppingById,
  createShopping,
  editShopping,
  destroyShopping,
};
