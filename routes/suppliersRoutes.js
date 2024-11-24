import express from "express";
import {createSuppliers,getAllSuppliers,getSuppliersById,updateSuppliers, deleteSuppliers} from '../controllers/suppliersController.js'

const router = express.Router()

router.post('/',createSuppliers)
router.get('/',getAllSuppliers)
router.get('/:id',getSuppliersById)
router.put('/:id',updateSuppliers)
router.delete('/:id',deleteSuppliers)

export default router

