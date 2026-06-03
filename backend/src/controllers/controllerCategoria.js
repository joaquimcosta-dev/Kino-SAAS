import express from 'express';
const controller= express.Router();
import *as service from '../service_categoria.js';
import { auth } from '../middlewares/auth.js';


//buscar cat
controller.get("/buscar", auth, async(req, res)=>{
  try{

    const cat = service.buscarCat()
    return res.status(200).json(cat)

  }catch(e){
    console.log(e);
    return res.status(400).json({message: "Erro ao listar categoria"});
  }
}) 


//buscar cat por id
controller.get("buscar/:id", auth, async(req,res)=>{
  if (!req.body.id) {
    return res.status(400).json({message:"id invalido"});
  }
  const id=req.body.id;
try {
    const encontrado= await service.buscarCatId(id);
    if (!encontrado) {
     return res.status(404).json({message:"Categoria não encontrado"})
      
    }
  return res.status(200).json(encontrado);

} catch (e) {
  return res.status(500).json({message:"Erro no servidor"})
      
}
})

