import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  editProduct,
  getProductByName,
  toggleProductStatus,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/byid/:product_id", getProductById);
router.get("/name/", getProductByName);
router.post("/", createProduct);
router.put("/:product_id", editProduct);
router.delete("/:product_id", toggleProductStatus);

export default router;
