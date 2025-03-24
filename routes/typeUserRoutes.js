import express from "express";
import {
  createTypeUser,
  getAllTypeUsers,
  getTypeUserById,
  getTypeUserByName,
  editTypeUser,
  deleteTypeUser
} from "../controllers/typeUserController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: UserType
 *   description: API para gestionar tipos de usuario
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserType:
 *       type: object
 *       properties:
 *         id_userType:
 *           type: integer
 *           example: 1
 *         rol:
 *           type: string
 *           example: "Administrador"
 *         active:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /userType/:
 *   get:
 *     summary: Obtener todos los tipos de usuario
 *     tags: [UserType]
 *     responses:
 *       200:
 *         description: Lista de tipos de usuario obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserType'
 */
router.get("/", getAllTypeUsers);

/**
 * @swagger
 * /userType/byid/{id_userType}:
 *   get:
 *     summary: Obtener un tipo de usuario por ID
 *     tags: [UserType]
 *     parameters:
 *       - in: path
 *         name: id_userType
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de usuario a obtener
 *     responses:
 *       200:
 *         description: Tipo de usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserType'
 *       404:
 *         description: Tipo de usuario no encontrado
 */
router.get("/byid/:id_userType", getTypeUserById);

/**
 * @swagger
 * /userType/rol/:
 *   get:
 *     summary: Buscar tipos de usuario por nombre de rol
 *     tags: [UserType]
 *     parameters:
 *       - in: query
 *         name: rol
 *         schema:
 *           type: string
 *         description: Nombre o parte del nombre del rol
 *     responses:
 *       200:
 *         description: Lista de tipos de usuario encontrados
 *       404:
 *         description: No se encontraron tipos de usuario con ese nombre
 */
router.get("/rol/", getTypeUserByName);

/**
 * @swagger
 * /userType/:
 *   post:
 *     summary: Crear un nuevo tipo de usuario
 *     tags: [UserType]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rol:
 *                 type: string
 *                 example: "Gerente"
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Tipo de usuario creado exitosamente
 *       400:
 *         description: Datos inválidos en la solicitud
 */
router.post("/", createTypeUser);

/**
 * @swagger
 * /userType/{typeUser_id}:
 *   put:
 *     summary: Editar un tipo de usuario
 *     tags: [UserType]
 *     parameters:
 *       - in: path
 *         name: typeUser_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de usuario a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rol:
 *                 type: string
 *                 example: "Supervisor"
 *               active:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Tipo de usuario actualizado exitosamente
 *       404:
 *         description: Tipo de usuario no encontrado
 */
router.put("/:typeUser_id", editTypeUser);

/**
 * @swagger
 * /userType/{id_userType}:
 *   delete:
 *     summary: Eliminar un tipo de usuario
 *     tags: [UserType]
 *     parameters:
 *       - in: path
 *         name: id_userType
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de usuario a eliminar
 *     responses:
 *       200:
 *         description: Tipo de usuario eliminado exitosamente
 *       404:
 *         description: Tipo de usuario no encontrado
 */
router.delete("/:id_userType", deleteTypeUser);

export default router;
