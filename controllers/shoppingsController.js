import { Sequelize, Op} from "sequelize";
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
  const { shopping, detailShopping, products } = db.models;

  const {
    date,
    userId,
    customer,
    payment_method,
    detailShoppingBody,
  } = req.body;

  const transaction = await db.sequelize.transaction();
  
  try {

    if (!userId || isNaN(userId) || userId <= 0) {
      return res.status(400).json({ error: "Debe asociar un cajero válido para generar la venta" });
    }

    // Verificación si el userId existe en la base de datos
    const existingUser = await db.models.users.findByPk(userId);
    if (!existingUser) {
      return res.status(400).json({ error: "El cajero indicado no existe" });
    }
  
    if (!detailShoppingBody || detailShoppingBody.length === 0) {
      return res.status(400).json({error: "Debe agregar al menos un producto al carrito de compras"})
    };

    const productIds = detailShoppingBody.map((item) => item.id_products);
    const existingProducts = await products.findAll({ where: { id_products: productIds },
      transaction });

    if (existingProducts.length !== productIds.length) {
      await transaction.rollback()
      return res.status(400).json({ error: "Uno o más productos no existen. Verifique los productos que se están facturando." });
    }

    let subtotal = 0;
    let taxes = 0;

    for (let item of detailShoppingBody) {
      subtotal += item.unit_price * item.count;
      taxes += ((item.value_taxes / 100) * item.unit_price) * item.count; 
    }

    const total_sale = taxes + subtotal;

    const newShopping = await shopping.create({
      date,
      userId,
      customer,
      payment_method,
      taxes,
      subtotal,
      total_sale ,
    }, {transaction});

    const shoppingDetails = detailShoppingBody.map((item) => ({
      id_shopping: newShopping.id_shopping,
      id_products: item.id_products,
      count: item.count,
      unit_price: item.unit_price,
      value_taxes: item.value_taxes,
      buy_price:item.buy_price,
      code_earn:item.code_earn,
      total: (item.unit_price + (item.unit_price * item.value_taxes) / 100) * item.count
    }));
    
    await detailShopping.bulkCreate(shoppingDetails, {transaction});
    
    for (const product of existingProducts) {
      const shoppingItem = detailShoppingBody.find((item)=> item.id_products === product.id_products);

      if (product.stock < shoppingItem.count) {
        await transaction.rollback();
        return res.status(400).json({ error: `Stock insuficiente para el producto ${product.id_products}` });
      };
      product.stock -= shoppingItem.count;
      await product.save({transaction});
    };

    await transaction.commit()

    console.log("Se genero la compra con exito");
    res.status(201).json( {
      message: `Se genero la compra con exito. Cobrar ${newShopping.total_sale} Stock actualizado.`,
      shopping: newShopping,
    });
  } catch (error) {
    await transaction.rollback();
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
