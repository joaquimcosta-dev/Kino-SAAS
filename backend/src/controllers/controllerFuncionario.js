import express from "express";
import { auth, permissaoAdmin } from "../middlewares/auth.js";
import * as servico from "../service/serviceFuncionario.js";
const controller = express.Router();

//controler para fazer o cadastro do funcionario
controller.post("/cadastrar", async (req, res) => {
  //verificar os campos a serem enviados pelo corpo
  if (!req.body.nome || !req.body.bi || !req.body.tel) {
    return res.status(400).json({ message: "Campos obrigatorio deve sem preenchido" });
  }
  const { nome, bi, data_nasc, tel } = req.body;
  try {
    //procurando bilhete no banco
    const fun = await servico.procurarBilhete(bi);
    if (fun) {
      return res.status(200).json({ message: "Este BI já existe no banco" });
    }
    const novo = await servico.criarFuncionario({ nome, bi, data_nasc, tel });
    return res.status(201).json({ message: "Funcionário cadastrado com sucesso" });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Erro ao tentar cadastrar funcionario" });
  }
});

//controler para listar  funcionario
controller.get("/listar", async (req, res) => {
  try {
    const lista = await servico.listarFuncionarios();
    return res.status(200).json(lista);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "Erro ao tentar listar funcionarios" });
  }
});

//controler para procurar funcionario
controller.get("/listar/:id", async (req, res) => {

  try {
    const id = parseInt(req.params.id);
    //verifica se é um número válido
    if (isNaN(id)) {
      return res.status(400).json({ mensagem: "ID inválido" });
    }
    // verifica se é positivo
    if (id <= 0) {
      return res.status(400).json({ mensagem: "ID inválido" });
    }

    const encontrado = await servico.buscarFuncionarioId(id);
    return res.status(200).json(encontrado);

  } catch (e) {
    return res
      .status(500)
      .json({ message: "Erro ao tentar listar funcionario" });
  }
});


// controler para deletar funcionario
controller.delete("/deletar/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const eliminado = await servico.deletar_funcionario(id);
    return res.status(200).json({ message: "Eliminado com sucesso" });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Erro ao tentar eliminar funcionario" });
  }
});


//controller para atualizar
controller.put("/atualizar/:id", auth, permissaoAdmin, async (req, res) =>{
  
  try{
    const id = parseInt(req.params.id);

    if(isNaN(id)|| id <=0){
      return res.status(400).json({message: "Id invalido"});
    }

    const {nome, bi, data_nasc, tel} = req.body;

    const resultado = await servico.editarFuncionario({
      id, nome, bi, data_nasc, tel
    });

    return res.status(200).json({message: "Funcionario atualizado com sucesso"})

  }catch(e){
    console.log(e);
    return res.status(400).json({message: "Erro ao a atualizar funcionario"});
  }
});

export default controller;
