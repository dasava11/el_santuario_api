import express from "express"
import { createProduct, getAllProducts, getProductById, editProduct,deleteProduct, destroyProduct } from '../controllers/productsController.js'

const router = express.Router()

router.get('/',getAllProducts) 
router.get('/:product_id',getProductById)
router.post('/',createProduct)
router.put('/:product_id',editProduct)
router.delete('/:product_id',deleteProduct)
router.delete('/destroy/:product_id',destroyProduct)

export default router