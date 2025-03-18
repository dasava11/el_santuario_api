import express from "express";
import {
  getAllPurchases,
  getPurchasesById,
  createPurchases,
  editPurchases,
  destroyPurchases
} from "../controllers/purchasesController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Purchases
 *   description: API para gestionar compras
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Purchase:
 *       type: object
 *       properties:
 *         id_purchases:
 *           type: integer
 *           example: 1
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2025-03-18T14:30:00Z"
 *         count:
 *           type: integer
 *           example: 10
 *         price:
 *           type: integer
 *           example: 50000
 *         supplier:
 *           type: integer
 *           example: 3
 *         taxes:
 *           type: integer
 *           example: 8000
 *         subtotal:
 *           type: integer
 *           example: 42000
 *         total_price:
 *           type: integer
 *           example: 50000
 */

/**
 * @swagger
 * /api/purchases/:
 *   get:
 *     summary: Obtener todas las compras
 *     tags: [Purchases]
 *     responses:
 *       200:
 *         description: Lista de compras obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Purchase'
 */
router.get('/', getAllPurchases);

/**
 * @swagger
 * /api/purchases/byid/{purchase_id}:
 *   get:
 *     summary: Obtener una compra por ID
 *     tags: [Purchases]
 *     parameters:
 *       - in: path
 *         name: purchase_id
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
 *               $ref: '#/components/schemas/Purchase'
 *       404:
 *         description: Compra no encontrada
 */
router.get('/byid/:purchase_id', getPurchasesById);

/**
 * @swagger
 * /api/purchases/:
 *   post:
 *     summary: Crear una nueva compra
 *     tags: [Purchases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               count:
 *                 type: integer
 *                 example: 10
 *               price:
 *                 type: integer
 *                 example: 50000
 *               supplier:
 *                 type: integer
 *                 example: 3
 *               taxes:
 *                 type: integer
 *                 example: 8000
 *               subtotal:
 *                 type: integer
 *                 example: 42000
 *               total_price:
 *                 type: integer
 *                 example: 50000
 *     responses:
 *       201:
 *         description: Compra creada exitosamente
 *       400:
 *         description: Datos inválidos en la solicitud
 */
router.post('/', createPurchases);

/**
 * @swagger
 * /api/purchases/{purchase_id}:
 *   put:
 *     summary: Editar una compra
 *     tags: [Purchases]
 *     parameters:
 *       - in: path
 *         name: purchase_id
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
 *               count:
 *                 type: integer
 *                 example: 15
 *               price:
 *                 type: integer
 *                 example: 75000
 *               supplier:
 *                 type: integer
 *                 example: 4
 *               taxes:
 *                 type: integer
 *                 example: 12000
 *               subtotal:
 *                 type: integer
 *                 example: 63000
 *               total_price:
 *                 type: integer
 *                 example: 75000
 *     responses:
 *       200:
 *         description: Compra actualizada exitosamente
 *       404:
 *         description: Compra no encontrada
 */
router.put('/:purchase_id', editPurchases);

/**
 * @swagger
 * /api/purchases/destroy/{purchase_id}:
 *   delete:
 *     summary: Eliminar una compra de forma permanente
 *     tags: [Purchases]
 *     parameters:
 *       - in: path
 *         name: purchase_id
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
router.delete('/destroy/:purchase_id', destroyPurchases);

export default router;
