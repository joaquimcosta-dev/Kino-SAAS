import express from 'express';
import {auth} from '../middlewares/auth.js'
import controllerPrivado from '../controllers/controller_usuario.js';
import controllerProduto from '../controllers/controller_produto.js'
const router = express.Router();
router.use("/usuario",auth,controllerPrivado);
router.use("/produto", auth, controllerProduto);
export default router;
