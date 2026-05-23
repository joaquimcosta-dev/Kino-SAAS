import express from 'express';
import {auth} from '../middlewares/auth.js'
import controllerPrivado from '../controllers/controller_usuario.js';
import controllerProduto from '../controllers/controller_produto.js'
import listarReclamacao from "../controllers/controllerReclamacao.js";
import controllerFuncionario from "../controllers/controllerFuncionario.js";


const router = express.Router();

router.use("/usuario",controllerPrivado);
router.use("/produto", auth, controllerProduto);
router.use("/listar",listarReclamacao);
router.use("/funcionario", controllerFuncionario);

export default router;
