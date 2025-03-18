import express from "express";
import {
  createSuppliers,
  getAllSuppliers,
  getSuppliersById,
  editSuppliers,
  deleteSuppliers,
  destroySuppliers,
  getSuppliersByName
} from "../controllers/suppliersController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: API para gestionar proveedores
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Supplier:
 *       type: object
 *       properties:
 *         id_suppliers:
 *           type: integer
 *           example: 1
 *         nit:
 *           type: string
 *           example: "900123456-7"
 *         name:
 *           type: string
 *           example: "Proveedor XYZ S.A."
 *         address:
 *           type: string
 *           example: "Calle 123 #45-67, Bogotá"
 *         city:
 *           type: string
 *           example: "Bogotá"
 *         phone:
 *           type: string
 *           example: "+57 320 456 7890"
 *         email:
 *           type: string
 *           example: "contacto@proveedorxyz.com"
 *         active:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /suppliers/:
 *   get:
 *     summary: Obtener todos los proveedores
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: Lista de proveedores obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Supplier'
 */
router.get("/", getAllSuppliers);

/**
 * @swagger
 * /suppliers/byid/{supplier_id}:
 *   get:
 *     summary: Obtener un proveedor por ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: supplier_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proveedor a obtener
 *     responses:
 *       200:
 *         description: Proveedor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 *       404:
 *         description: Proveedor no encontrado
 */
router.get("/byid/:supplier_id", getSuppliersById);

/**
 * @swagger
 * /suppliers/name/:
 *   get:
 *     summary: Buscar proveedores por nombre
 *     tags: [Suppliers]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nombre o parte del nombre del proveedor
 *     responses:
 *       200:
 *         description: Lista de proveedores encontrados
 *       404:
 *         description: No se encontraron proveedores con ese nombre
 */
router.get("/name/", getSuppliersByName);

/**
 * @swagger
 * /suppliers/:
 *   post:
 *     summary: Crear un nuevo proveedor
 *     tags: [Suppliers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nit:
 *                 type: string
 *                 example: "900123456-7"
 *               name:
 *                 type: string
 *                 example: "Proveedor ABC Ltda."
 *               address:
 *                 type: string
 *                 example: "Av. Principal 45 #12-34, Medellín"
 *               city:
 *                 type: string
 *                 example: "Medellín"
 *               phone:
 *                 type: string
 *                 example: "+57 312 987 6543"
 *               email:
 *                 type: string
 *                 example: "ventas@proveedorabc.com"
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Proveedor creado exitosamente
 *       400:
 *         description: Datos inválidos en la solicitud
 */
router.post("/", createSuppliers);

/**
 * @swagger
 * /suppliers/{supplier_id}:
 *   put:
 *     summary: Editar un proveedor
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: supplier_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proveedor a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nit:
 *                 type: string
 *                 example: "900987654-3"
 *               name:
 *                 type: string
 *                 example: "Proveedor Actualizado S.A."
 *               address:
 *                 type: string
 *                 example: "Calle 99 #12-99, Cali"
 *               city:
 *                 type: string
 *                 example: "Cali"
 *               phone:
 *                 type: string
 *                 example: "+57 318 654 3210"
 *               email:
 *                 type: string
 *                 example: "info@proveedoractualizado.com"
 *               active:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Proveedor actualizado exitosamente
 *       404:
 *         description: Proveedor no encontrado
 */
router.put("/:supplier_id", editSuppliers);

/**
 * @swagger
 * /suppliers/delete/{supplier_id}:
 *   delete:
 *     summary: Desactivar un proveedor (borrado lógico)
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: supplier_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proveedor a desactivar
 *     responses:
 *       200:
 *         description: Proveedor desactivado exitosamente
 *       404:
 *         description: Proveedor no encontrado
 */
router.delete("/delete/:supplier_id", deleteSuppliers);

/**
 * @swagger
 * /suppliers/destroy/{supplier_id}:
 *   delete:
 *     summary: Eliminar un proveedor permanentemente
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: supplier_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proveedor a eliminar
 *     responses:
 *       200:
 *         description: Proveedor eliminado exitosamente
 *       404:
 *         description: Proveedor no encontrado
 */
router.delete("/destroy/:supplier_id", destroySuppliers);

export default router;
