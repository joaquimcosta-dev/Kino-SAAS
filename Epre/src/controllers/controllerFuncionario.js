import express from "express";
import * as servico from "../service/serviceFuncionario.js";
const controller = express.Router();

//controler para fazer o cadastro do funcionario
controller.post("/cadastrar", async (req, res) => {
  //verificar os campos a serem enviados pelo corpo
  if (!req.body.nome || !req.body.bilhete || !req.body.data) {
    return res
      .status(400)
      .json({ message: "Campos obrigatorio deve sem preenchido" });
  }
  const { nome, bilhete, data, tel } = req.body;
  try {
    //procurando bilhete no banco
    const fun = await servico.procurarBilhete(bilhete);
    if (fun) {
      return res.status(200).json({ message: "Este BI já existe no banco" });
    }
    const novo = await servico.criarFuncionario({ name, bilhete, data, tel });
    return res.status(201).json(novo);
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
    return res
      .status(500)
      .json({ message: "Erro ao tentar listar funcionario" });
  }
});
//controler para procurar funcionario
controller.get("/listar/:id", async (req, res) => {
  const id = req.body.id;
  try {
    const encontrado = await servico.buscarFuncionario(id);
    return res.status(200).json(encontrado);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Erro ao tentar listar funcionario" });
  }
});
// controler para deletar funcionario
controller.delete("/deletar/:id", async (req, res) => {
  const id = req.body.id;
  try {
    const eliminado = await servico.deletar_funcionario(id);
    return res.status(200).json({ message: "Eliminado com sucesso" });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Erro ao tentar eliminar funcionario" });
  }
});
