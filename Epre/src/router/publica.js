import express from 'express';
import controller from '../controllers/controller_usuario.js';
import reclamacao from "../controllers/controllerReclamacao.js";
const router = express.Router();
router.use("/usuario",controller);
router.use("/fazer",reclamacao);
export default router;