import express from 'express';
const controller= express.Router();
import *as service from "../service/service_categoria.js";
import { auth, permissaoAdmin } from '../middlewares/auth.js';


//criar cat
controller.post("/criar", auth, permissaoAdmin, async (req, res) =>{
  try{
    const {nome} = req.body;

    if(!req.body.nome){
      console.log(massage)
      return res.status(400).json({massage: "Campo obrigatorio"})
    }

    console.log(nome);
    const resultado = await service.criarCat({nome});

    return res.status(201).json({resultado});

  }catch(e){
    console.log(e)
    return res.status(500).json({menssagem: "Erro ao criar categoria"})
  }
})

//buscar cat
controller.get("/buscar", async(req, res)=>{
  try{

    const cat = await service.buscarCat()
    return res.status(200).json(cat)

  }catch(e){
    console.log(e);
    return res.status(400).json({message: "Erro ao listar categoria"});
  }
}) 


//buscar cat por id
controller.get("/buscar/:id", async(req,res)=>{
  if (!req.params.id) {
    return res.status(400).json({message:"id invalido"});
  }
  const id = req.body.id;
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

export default controller;