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

router.get("/", getAllUsers);
router.get("/byid/:user_id", getUserById);
router.get("/name/", getUserByName);
router.post("/", createUser);
router.put("/:user_id", editUser);
router.delete("/:user_id", deleteUser);
router.delete("/destroy/:user_id", destroyUser);

export default router;
