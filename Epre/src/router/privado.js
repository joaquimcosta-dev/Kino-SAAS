import express from 'express';
import {auth} from '../middlewares/auth.js'
import controllerPrivado from '../controllers/controller_usuario.js';
const router = express.Router();
router.use("/usuario",auth,controllerPrivado);
export default router;
