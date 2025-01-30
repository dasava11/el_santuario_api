import express from "express";
import {
  createSuppliers,
  getAllSuppliers,
  getSuppliersById,
  editSuppliers,
  deleteSuppliers,
  destroySuppliers,
  getSuppliersByName,
} from "../controllers/suppliersController.js";

const router = express.Router();

router.get("/", getAllSuppliers);
router.get("/byid/:supplier_id", getSuppliersById);
router.get("/name/", getSuppliersByName);
router.post("/", createSuppliers);
router.put("/:supplier_id", editSuppliers);
router.delete("/:supplier_id", deleteSuppliers);
router.delete("/destroy/:supplier_id", destroySuppliers);

export default router;
