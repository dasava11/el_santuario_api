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

router.get("/", getAllCustomers);
router.get("/byid/:id_customers", getCustomerById);
router.get("/name/", getCustomerByName);
router.post("/", createCustomer);
router.put("/:id_customers", editCustomer);
router.delete("/:customer_id", deleteCustomer);

export default router;
