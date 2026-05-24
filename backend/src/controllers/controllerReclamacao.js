import express from "express";
import { listar, criarReclamacao, eliminar } from "../service/servico_reclamacao.js";
const controller = express.Router();
import { auth } from "../middlewares/auth.js";

controller.get("/listar-reclamacao",auth, async (req, res) => {
  try {
    const lista = await listar();
    return res.status(200).json(lista);
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .json({ message: "erro ao tentar listar reclamação" });
    
  }
});

controller.post("/reclamacao", async (req, res) => {
  const data = {
    nome: req.body.nome,
    tel: req.body.tel,
    motivo: req.body.motivo,
    descricao: req.body.descricao,
  };
  try {
    const re = await criarReclamacao(data);
    return res.status(201).json({ message: "reclamação feita com sucesso" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Erro ao tentar criar reclamção" });
  }
});


controller.delete("/eliminar-reclamacao/:id", auth, async(req, res)=>{
  try{

    const id = parseInt(req.params.id);

    if(isNaN(id) || id <= 0){
      return res.status(400).json({message: "ID invalido"});
    }

    const resultado = await eliminar(id);
    return res.status(200).json({ resultado });

  }catch(e){
    console.log(e);
    return res.status(400).json({message: "Erro ao eliminar reclamação"})
  }
});


export default controller;
