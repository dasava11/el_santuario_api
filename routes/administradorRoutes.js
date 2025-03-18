import express from "express";
import {
  getUserById,
  getAllUsers,
  createUser,
  deleteUser,
  destroyUser,
  editUser,
  getUserByName,
} from "../controllers/administradorController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para gestionar usuarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id_user:
 *           type: integer
 *           example: 1
 *         username:
 *           type: string
 *           example: "JuanPerez"
 *         email:
 *           type: string
 *           example: "juan@example.com"
 *         type_user:
 *           type: integer
 *           example: 2
 *         active:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /manager/:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de todos los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /manager/byid/{id_user}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Datos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/byid/:id_user", getUserById);

/**
 * @swagger
 * /manager/name/:
 *   get:
 *     summary: Buscar usuario por nombre
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del usuario a buscar
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/name/", getUserByName);

/**
 * @swagger
 * /manager/:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "JuanPerez"
 *               email:
 *                 type: string
 *                 example: "juan@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword123"
 *               type_user:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", createUser);

/**
 * @swagger
 * /manager/{id_user}:
 *   put:
 *     summary: Editar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.put("/:id_user", editUser);

/**
 * @swagger
 * /manager/delete/{id_user}:
 *   delete:
 *     summary: Eliminar usuario (borrado lógico)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete("/delete/:id_user", deleteUser);

/**
 * @swagger
 * /manager/destroy/{id_user}:
 *   delete:
 *     summary: Eliminar usuario (borrado físico)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar permanentemente
 *     responses:
 *       200:
 *         description: Usuario eliminado definitivamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete("/destroy/:id_user", destroyUser);

export default router;
