import { Op } from "sequelize";
import db from "../models/index.js";

const { purchases, detailPurchases } = db.models;
// Obtener todas las compras
const getAllPurchases = async (req, res) => {
  try {
    const allPurchases = await purchases.findAll({
      include: [{ model: detailPurchases, as: "detail_purchases" }],
    });
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
    const purchase = await purchases.findByPk(shopping_id, {
      include: [{ model: detailPurchases, as: "detail_purchases" }],
    });
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
  const { purchases, detailPurchases, products } = db.models;
  const { date, supplier, detailPurchasesBody } = req.body;

  const transaction = await db.sequelize.transaction();

  try {
    if (!detailPurchasesBody || detailPurchasesBody.length === 0) {
      return res
        .status(400)
        .json({ error: "Debe agregar al menos un producto en la compra." });
    }

    // Verificar si todos los productos existen antes de continuar
    const productIds = detailPurchasesBody.map((item) => item.id_products);
    const existingProducts = await products.findAll({
      where: { id_products: productIds },
      transaction,
    });

    if (existingProducts.length !== productIds.length) {
      await transaction.rollback();
      return res
        .status(400)
        .json({
          error:
            "Uno o más productos no existen. Verifique los productos antes de realizar la compra.",
        });
    }

    let price = 0;
    let taxes = 0;

    for (let item of detailPurchasesBody) {
      price += item.unit_price * item.count;
      taxes += (item.value_taxes / 100) * item.unit_price * item.count;
    }

    const total_price = price + taxes;

    // Crear la compra
    const newPurchase = await purchases.create(
      {
        date,
        count: detailPurchasesBody.length,
        price,
        supplier,
        taxes,
        subtotal: price,
        total_price,
      },
      { transaction }
    );

    // Crear detalles de la compra y actualizar stock en una sola transacción
    const purchaseDetails = detailPurchasesBody.map((item) => ({
      id_purchases: newPurchase.id_purchases,
      id_products: item.id_products,
      count: item.count,
      unit_price: item.unit_price,
      value_taxes: item.value_taxes,
      total:
        (item.unit_price + (item.unit_price * item.value_taxes) / 100) *
        item.count,
    }));

    await detailPurchases.bulkCreate(purchaseDetails, { transaction });

    // Actualizar stock de productos en la BD
    for (const product of existingProducts) {
      const purchasedItem = detailPurchasesBody.find(
        (item) => item.id_products === product.id_products
      );
      product.stock += purchasedItem.count;
      await product.save({ transaction });
    }

    await transaction.commit();

    res.status(201).json({
      message: "Compra al proveedor generada con éxito. Stock actualizado.",
      purchase: newPurchase,
    });
  } catch (error) {
    await transaction.rollback();
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
  const { purchase_id } = req.params;

  try {
    const purchase = await purchases.findByPk(purchase_id);
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
