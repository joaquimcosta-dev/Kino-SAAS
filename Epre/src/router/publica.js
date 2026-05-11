import express from 'express';
import controller from '../controllers/controller_usuario.js';
const router = express.Router();
router.use("/usuario",controller);
export default router;