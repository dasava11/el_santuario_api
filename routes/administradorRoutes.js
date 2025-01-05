import express from "express"
import { getUserById, getAllUsers, createUser, deleteUser, destroyUser, editUser } from '../controllers/administradorController.js'

const router = express.Router()

router.get("/", getAllUsers)
router.get("/:user_id", getUserById)
router.post("/", createUser)
router.put("/:user_id", editUser);
router.delete("/:user_id", deleteUser);
router.delete("/destroy/:user_id", destroyUser)

export default router