import express from 'express';
import controller from '../controllers/controller_usuario.js';
import reclamacao from "../controllers/controllerReclamacao.js";
import pedido from '../controllers/controllerPedido.js';
import produto from "../controllers/controller_produto.js";
import categoria from "../controllers/controllerCategoria.js"
const router = express.Router();
router.use("/usuario",controller);
router.use("/fazer",reclamacao);
router.use("/pedido",pedido)
router.use("/produto",produto)
router.use("/categoria", categoria)
export default router;