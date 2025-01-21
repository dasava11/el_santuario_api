import express from "express"
import { createProduct, getAllProducts, getProductById, editProduct } from '../controllers/productsController.js'

const router = express.Router()

router.get('/',getAllProducts) 
router.get('/:product_id',getProductById)
router.post('/',createProduct)
router.put('/:product_id',editProduct)


export default router