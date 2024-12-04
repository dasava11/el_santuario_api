import express from 'express'
import administradorRoutes from './administradorRoutes.js'
import usuarioRoutes from './usuarioRoutes.js'
import productsRoutes from './productsRoutes.js'
import suppliersRoutes from './suppliersRoutes.js'
import customersRoutes from './customersRoutes.js'

const router = express.Router()


// Routing
router.use('/auth', usuarioRoutes)
router.use('/administrador', administradorRoutes)
router.use('/products',productsRoutes)
router.use('/suppliers',suppliersRoutes)
router.use('/customers',customersRoutes)

export default router;