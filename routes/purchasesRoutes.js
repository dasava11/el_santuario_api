import express from "express"
import { getAllPurchases, getPurchasesById, createPurchases, editPurchases, destroyPurchases } from "../controllers/purchasesController.js"

 const router = express.Router()

router.get('/',getAllPurchases) 
router.get('/byid/:purchase_id',getPurchasesById)
router.post('/',createPurchases)
router.put('/:purchase_id',editPurchases)
router.delete('/destroy/:purchase_id',destroyPurchases)

 export default router