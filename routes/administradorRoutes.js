import express from "express"
import { crear, consultar, editar } from '../controllers/administradorController.js'

const router = express.Router()

router.get('/crear', crear)

router.get('/consultar', consultar)

router.get('/editar', editar)



export default router