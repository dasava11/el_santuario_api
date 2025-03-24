import express from "express";
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  editCustomer,
  deleteCustomer,
  getCustomerByName,
} from "../controllers/customersController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: API para gestionar clientes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - name
 *         - document
 *       properties:
 *         id_customers:
 *           type: integer
 *           description: ID único del cliente
 *           example: 1
 *         name:
 *           type: string
 *           description: Nombre del cliente
 *           example: "Carlos Rodríguez"
 *         document:
 *           type: string
 *           description: Documento de identidad
 *           example: "1234567890"
 *         email:
 *           type: string
 *           description: Correo electrónico del cliente
 *           example: "carlos@example.com"
 *         phone:
 *           type: string
 *           description: Número de teléfono del cliente
 *           example: "+573001234567"
 */

/**
 * @swagger
 * /customers/:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Lista de todos los clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */
router.get("/", getAllCustomers);

/**
 * @swagger
 * customers/byid/{id_customers}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id_customers
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a buscar
 *     responses:
 *       200:
 *         description: Datos del cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Cliente no encontrado
 */
router.get("/byid/:customers_id", getCustomerById); 

/**
 * @swagger
 * customers/name/:
 *   get:
 *     summary: Buscar clientes por nombre
 *     tags: [Customers]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del cliente a buscar
 *     responses:
 *       200:
 *         description: Lista de clientes encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       404:
 *         description: No se encontraron clientes con ese nombre
 */

router.get("/name/", getCustomerByName);

/**
 * @swagger
 * customers/:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - document
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Carlos Rodríguez"
 *               document:
 *                 type: string
 *                 example: "1234567890"
 *               email:
 *                 type: string
 *                 example: "carlos@example.com"
 *               phone:
 *                 type: string
 *                 example: "+573001234567"
 *     responses:
 *       201:
 *         description: Cliente creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Datos inválidos
 */
router.post("/", createCustomer);

/**
 * @swagger
 * customers/{id_customers}:
 *   put:
 *     summary: Editar un cliente
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id_customers
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Carlos Rodríguez"
 *               document:
 *                 type: string
 *                 example: "1234567890"
 *               email:
 *                 type: string
 *                 example: "carlos@example.com"
 *               phone:
 *                 type: string
 *                 example: "+573001234567"
 *     responses:
 *       200:
 *         description: Cliente actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Cliente no encontrado
 */
router.put("/:id_customers", editCustomer);

/**
 * @swagger
 * customers/{customer_id}:
 *   delete:
 *     summary: Eliminar un cliente
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a eliminar
 *     responses:
 *       200:
 *         description: Cliente eliminado correctamente
 *       404:
 *         description: Cliente no encontrado
 */
router.delete("/:id_customers", deleteCustomer);

export default router;
