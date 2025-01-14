import { success, error } from "../red/answers.js";
import { Sequelize, Op } from "sequelize";
import db from "../models/index.js";

const { purchases } = db.models;

// Obtener todas las compras
const getAllPurchases = async (req, res) => {
  try {
    const allPurchases = await purchases.findAll();
    if (allPurchases.length === 0) {
      return res.status(404).json({ message: "No hay registros de compras" });
    }
    res.status(200).json(allPurchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener compra por ID
const getPurchasesById = async (req, res) => {
  const { shopping_id } = req.params; // Asegurarse de que el parámetro coincide con las rutas

  try {
    const purchase = await purchases.findByPk(shopping_id);
    if (!purchase) {
      return res.status(404).json({ message: "Compra no encontrada" });
    }
    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva compra
const createPurchases = async (req, res) => {
  const { date, count, price, supplier, taxes, subtotal, total_price } =
    req.body;

  try {
    const newPurchase = await purchases.create({
      date,
      count,
      price,
      supplier,
      taxes,
      subtotal,
      total_price,
    });
    res
      .status(201)
      .json({ message: "Compra creada exitosamente", purchase: newPurchase });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una compra existente
const editPurchases = async (req, res) => {
  const { product_id } = req.params;
  const { date, count, price, supplier, taxes, subtotal, total_price } =
    req.body;

  try {
    const purchase = await purchases.findByPk(product_id);
    if (!purchase) {
      return res.status(404).json({ message: "Compra no encontrada" });
    }

    await purchase.update({
      date,
      count,
      price,
      supplier,
      taxes,
      subtotal,
      total_price,
    });

    res
      .status(200)
      .json({ message: "Compra actualizada exitosamente", purchase });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* // Eliminar (borrado lógico) una compra
const deletePurchases = async (req, res) => {
  const { product_id } = req.params;

  try {
    const purchase = await purchases.findByPk(product_id);
    if (!purchase) {
      return res.status(404).json({ message: "Compra no encontrada" });
    }

    await purchase.update({ active: false }); // Si tienes un campo `active` para borrado lógico
    res.status(200).json({ message: "Compra eliminada (borrado lógico)", purchase });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; */

// Eliminar (borrado físico) una compra

const destroyPurchases = async (req, res) => {
  const { product_id } = req.params;

  try {
    const purchase = await purchases.findByPk(product_id);
    if (!purchase) {
      return res.status(404).json({ message: "Compra no encontrada" });
    }

    await purchase.destroy();
    res.status(200).json({ message: "Compra eliminada permanentemente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllPurchases,
  getPurchasesById,
  createPurchases,
  editPurchases,
  destroyPurchases,
};
