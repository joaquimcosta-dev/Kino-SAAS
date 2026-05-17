import express from 'express';
import {listar} from '../service/servico_reclamacao.js';
const controller = express.Router();
controller.get('/lisrar-reclamacao',async(req,res)=>{
  try {
    const lista =await listar();
    return res.status(200).json(lista)
  } catch (e) {
    return res.status(500).json({message:"erro ao tentar listar reclamação"})
    throw e
  }
})