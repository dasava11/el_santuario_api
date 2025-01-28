import express from 'express'
import administradorRoutes from './administradorRoutes.js'
import typeUserRoutes from './typeUserRoutes.js'
import productsRoutes from './productsRoutes.js'
import suppliersRoutes from './suppliersRoutes.js'
import customersRoutes from './customersRoutes.js'
import shoppingRoutes from './shoppingRoutes.js'
import purchasesRoutes from './purchasesRoutes.js'

const router = express.Router()

// Routing
router.use('/typeUser', typeUserRoutes)
router.use('/manager', administradorRoutes)
router.use('/products',productsRoutes)
router.use('/suppliers',suppliersRoutes)
router.use('/customers',customersRoutes)
router.use('/shoppings',shoppingRoutes)
router.use('/purchases',purchasesRoutes)

export default router;