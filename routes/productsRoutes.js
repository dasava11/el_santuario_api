import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  editProduct,
  getProductByName,
  toggleProductStatus,
  getProductByCode,
} from "../controllers/productsController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API para gestionar productos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id_products:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Laptop Lenovo"
 *         description:
 *           type: string
 *           example: "Laptop de alto rendimiento para trabajo y gaming."
 *         brand:
 *           type: string
 *           example: "Lenovo"
 *         stock:
 *           type: integer
 *           example: 25
 *         buy_price:
 *           type: number
 *           format: float
 *           example: 850.50
 *         code_earn:
 *           type: integer
 *           example: 12345
 *         unit_price:
 *           type: number
 *           format: float
 *           example: 999.99
 *         code:
 *           type: string
 *           example: "LEN-12345"
 *         taxes_code:
 *           type: integer
 *           example: 2
 *         active:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /products/:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de todos los productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", getAllProducts);

/**
 * @swagger
 * /products/byid/{id_products}:
 *   get:
 *     summary: Obtener producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id_products
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Datos del producto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */
router.get("/byid/:id_products", getProductById);

/**
 * @swagger
 * /products/name/:
 *   get:
 *     summary: Buscar producto por nombre
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del producto a buscar
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */
router.get("/name/", getProductByName);

/**
 * @swagger
 * /products/code/{code}:
 *   get:
 *     summary: Buscar producto por código
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: Código único del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */
router.get("/code/:code", getProductByCode);

/**
 * @swagger
 * /products/:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", createProduct);

/**
 * @swagger
 * /products/{id_products}:
 *   put:
 *     summary: Editar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id_products
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       404:
 *         description: Producto no encontrado
 */
router.put("/:id_products", editProduct);

/**
 * @swagger
 * /products/delete/{id_products}:
 *   delete:
 *     summary: Cambiar el estado de un producto (activo/inactivo)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id_products
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a modificar
 *     responses:
 *       200:
 *         description: Estado del producto cambiado correctamente
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/delete/:id_products", toggleProductStatus);

export default router;