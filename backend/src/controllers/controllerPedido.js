import express from 'express';
import *as servico from "../service/service_pedido.js"
const controller = express.Router();
controller.post("/criar",async (req,res)=>{
if (!req.body.item.length){
return res.status(400).json({message: "Deve ter pelo menos um item no carrinho"})
}
if (!req.body.nome){
return res.status(400).json({message: "O cambo nome é obrigatório"})

}
const data=req.body;
try{
const novo = await servico.criarPedido(data)
return res.status(201).json(novo);
}catch(e){
  console.log(e)
  return res.status(500).json({message: "erro ao tentar fazer pedido"})
}


})
export default controller;