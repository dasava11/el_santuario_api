import express from "express";
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  editCustomer,
  deleteCustomer,
  destroyCustomer,
  getCustomerByName,
} from "../controllers/customersController.js";

const router = express.Router();

router.get("/", getAllCustomers);
router.get("/:customer_id", getCustomerById);
router.get("/name/", getCustomerByName);
router.post("/", createCustomer);
router.put("/", editCustomer);
router.delete("/:customer_id", deleteCustomer);
router.delete("/destroy/:customer_id", destroyCustomer);

export default router;
