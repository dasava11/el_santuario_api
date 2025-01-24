import { Sequelize, Op, Transaction } from "sequelize";
import db from "../models/index.js";

// Obtener todos los registros de compras
const getAllShoppings = async (req, res) => {
  const { shopping, detailShopping } = db.models;

  try {
    const allShoppings = await shopping.findAll({
      include: [{ model: detailShopping, as: "detail_shoppings" }],
    });
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
  const { shopping, detailShopping } = db.models;

  const { shopping_id } = req.params;

  try {
    const shoppingId = await shopping.findByPk(shopping_id, {
      include: [{ model: detailShopping, as: "detail_shoppings" }],
    });
    if (!shoppingId) {
      return res.status(404).json({ message: "Compra no encontrada" });
    }
    res.status(200).json(shoppingId);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva compra
const createShopping = async (req, res) => {
  const { shopping, detailShopping } = db.models;

  const {
    id_shopping,
    date,
    userId,
    customer,
    payment_method,
    taxes,
    subtotal,
    total_sale,
    detailShoppingBody,
  } = req.body;

  /*   const {id_detail_shopping, id_shoppings, id_products, count, unit_price, value_taxes, total} = req.body */

  try {
    const newShopping = await shopping.create({
      id_shopping,
      date,
      userId,
      customer,
      payment_method,
      taxes,
      subtotal,
      total_sale,
    });

    /*const detailShoppingData = await detailShoppingBody.map(e => ({id_detail_shopping: e.id_detail_shopping, id_shopping: newShopping.id_shopping, id_products: e.id_products, count: e.count, unit_price: e.unit_price, value_taxes: e.value_taxes, total: e.total })); */
    if (detailShoppingBody.length > 0) {
      for (let i = 0; i < detailShoppingBody.length; i++) {
        await detailShopping.create({
          id_detail_shopping: detailShoppingBody[i].id_detail_shopping,
          id_shopping: newShopping.id_shopping,
          id_products: detailShoppingBody[i].id_products,
          count: detailShoppingBody[i].count,
          unit_price: detailShoppingBody[i].unit_price,
          value_taxes: detailShoppingBody[i].value_taxes,
          total: detailShoppingBody[i].total,
        });
      }
    }
    console.log("se creo la compra");
    res.status(201).json(newShopping);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Editar una compra existente
const editShopping = async (req, res) => {
  const { Shopping } = db.models;
  const { shopping_id } = req.params;
  const {
    date,
    userId,
    customer,
    payment_method,
    taxes,
    subtotal,
    total_sale,
  } = req.body;

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
