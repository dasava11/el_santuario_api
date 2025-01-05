import express from "express"
import { getAllShoppings, getShoppingById, createShopping, editShopping, destroyShopping } from "../controllers/shoppingsController"

 const router = express.Router()

router.get('/',getAllShoppings) 
router.get('/:shopping_id',getShoppingById)
router.post('/',createShopping)
router.put('/:shopping_id',editShopping)
router.delete('/destroy/:shopping_id',destroyShopping)

 export default router