import express from 'express';
import controller from '../controllers/controller_usuario.js';
import reclamacao from "../controllers/controllerReclamacao.js";
import pedido from '../controllers/controllerPedido.js';
import produto from "../controllers/controller_produto.js"
const router = express.Router();


router.use("/usuario",controller);
router.use("/fazer",reclamacao);
router.use("/pedido",pedido)
router.use("/produto",produto)
export default router;