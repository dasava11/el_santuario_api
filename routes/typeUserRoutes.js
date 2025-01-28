import express from "express";
import { createTypeUser, getAllTypeUsers, getTypeUserById, getTypeUserByName, editTypeUser, deleteTypeUser } from "../controllers/typeUserController.js";

const router = express.Router();

router.get("/", getAllTypeUsers);
router.get("/:id_userType", getTypeUserById);
router.get("/rol/", getTypeUserByName);
router.post("/", createTypeUser);
router.put("/:typeUser_id", editTypeUser);
router.delete("/:id_userType", deleteTypeUser);

export default router;