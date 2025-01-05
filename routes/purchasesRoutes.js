import express from "express"
import { getAllPurchases, getPurchasesById, createPurchases, editPurchases, destroyPurchases } from "../controllers/purchasesController"

 const router = express.Router()

router.get('/',getAllPurchases) 
router.get('/:purchase_id',getPurchasesById)
router.post('/',createPurchases)
router.put('/:purchase_id',editPurchases)
router.delete('/destroy/:purchase_id',destroyPurchases)

 export default router