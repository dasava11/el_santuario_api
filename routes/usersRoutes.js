import express from "express"
import { formularioLogin } from '../controllers/usuarioController.js';

const router = express.Router();

    router.get('/:users_id',getUsersById);
    router.put("/:user_id", editUsers);

export default router

//estos servicios no se requieren porque están sujetos a admin y customers