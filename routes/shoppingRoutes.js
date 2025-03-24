import express from "express";
import {
  getAllShoppings,
  getShoppingById,
  createShopping,
  editShopping,
  destroyShopping
} from "../controllers/shoppingsController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Shopping
 *   description: API para gestionar compras de clientes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Shopping:
 *       type: object
 *       properties:
 *         id_shopping:
 *           type: integer
 *           example: 1
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2025-03-18T14:30:00Z"
 *         userId:
 *           type: integer
 *           example: 5
 *         customer:
 *           type: integer
 *           example: 3
 *         payment_method:
 *           type: string
 *           example: "Tarjeta de crédito"
 *         taxes:
 *           type: integer
 *           example: 1500
 *         subtotal:
 *           type: integer
 *           example: 13500
 *         total_sale:
 *           type: integer
 *           example: 15000
 */

/**
 * @swagger
 * /shoppings/:
 *   get:
 *     summary: Obtener todas las compras de clientes
 *     tags: [Shopping]
 *     responses:
 *       200:
 *         description: Lista de compras obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shopping'
 */
router.get('/', getAllShoppings);

/**
 * @swagger
 * /shoppings/byid/{shopping_id}:
 *   get:
 *     summary: Obtener una compra por ID
 *     tags: [Shopping]
 *     parameters:
 *       - in: path
 *         name: shopping_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la compra a obtener
 *     responses:
 *       200:
 *         description: Compra encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shopping'
 *       404:
 *         description: Compra no encontrada
 */
router.get('/byid/:shopping_id', getShoppingById);

/**
 * @swagger
 * /shoppings/:
 *   post:
 *     summary: Crear una nueva compra de cliente
 *     tags: [Shopping]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 5
 *               customer:
 *                 type: integer
 *                 example: 3
 *               payment_method:
 *                 type: string
 *                 example: "Tarjeta de crédito"
 *               taxes:
 *                 type: integer
 *                 example: 1500
 *               subtotal:
 *                 type: integer
 *                 example: 13500
 *               total_sale:
 *                 type: integer
 *                 example: 15000
 *     responses:
 *       201:
 *         description: Compra creada exitosamente
 *       400:
 *         description: Datos inválidos en la solicitud
 */
router.post('/', createShopping);

/**
 * @swagger
 * /shoppings/{shopping_id}:
 *   put:
 *     summary: Editar una compra de cliente
 *     tags: [Shopping]
 *     parameters:
 *       - in: path
 *         name: shopping_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la compra a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 6
 *               customer:
 *                 type: integer
 *                 example: 4
 *               payment_method:
 *                 type: string
 *                 example: "Efectivo"
 *               taxes:
 *                 type: integer
 *                 example: 1800
 *               subtotal:
 *                 type: integer
 *                 example: 16200
 *               total_sale:
 *                 type: integer
 *                 example: 18000
 *     responses:
 *       200:
 *         description: Compra actualizada exitosamente
 *       404:
 *         description: Compra no encontrada
 */
router.put('/:shopping_id', editShopping);

/**
 * @swagger
 * /shoppings/destroy/{shopping_id}:
 *   delete:
 *     summary: Eliminar una compra de cliente de forma permanente
 *     tags: [Shopping]
 *     parameters:
 *       - in: path
 *         name: shopping_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la compra a eliminar
 *     responses:
 *       200:
 *         description: Compra eliminada exitosamente
 *       404:
 *         description: Compra no encontrada
 */
router.delete('/destroy/:shopping_id', destroyShopping);

export default router;
