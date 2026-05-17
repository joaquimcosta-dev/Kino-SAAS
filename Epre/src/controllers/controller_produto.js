import express from "express";
import * as service from "../service/service_produto.js";
import { permissaoAdmin } from "../middlewares/auth.js";
import *as servicoCategoria from "../service/service_categoria.js";
import { buscar_usuarioId} from "../service/service_user.js";

const controller = express.Router();

//rota listar produtos
controller.get("/listar", async (req, res) => {
  try {
    const produtos = await service.listarProdutos();
    return res.status(200).json(produtos);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ menssagem: "Erro ao listar produtos" });
  }
});

//rota para cadastrar produto
controller.post("/cadastrar", async (req, res) => {
    try {
        const { nome, img, preco, descricao, quantidade } = req.body;
        
        // id_user vem do token
        const id_user = req.user.id;

        console.log("BODY:", req.body);
        console.log("ID_USER:", id_user);

        const resultado = await service.cadastrarProduto(
            nome,
            img,
            preco,
            descricao,
            quantidade,
            id_user
        );

        return res.status(201).json(resultado);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ mensagem: e.message });
    }
});

//rota pra buscar produto
controller.get("/listar/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    //verifica se é um número válido
    if (isNaN(id)) {
      return res.status(400).json({ mensagem: "ID inválido" });
    }

    // verifica se é positivo
    if (id <= 0) {
      return res.status(400).json({ mensagem: "ID é inválido" });
    }

    const produto = await service.buscarProdutoId(id);

    return res.status(200).json(produto);
  } catch (e) {
    console.log(e);
    return res.status(404).json({ menssagem: "Erro ao encontrar o produto" });
  }
});

//rota atualizar produto
controller.put("/atualizar/:id", permissaoAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // verifica o id
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ mensagem: "Id inválido" });
    }

    const { nome, img, preco, descricao, quantidade, id_cat } = req.body;

    const resultado = await service.atualizarProduto(
      id,
      nome,
      img,
      preco,
      descricao,
      quantidade,
      id_cat
    );

    return res.status(200).json(resultado);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ mensagem: "erro ao atualizar o produto", error: e.message });
  }
});

//rota Eliminar produto

controller.delete("/eliminar/:id", permissaoAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    //verifica o id
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ mensagem: "id invalido" });
    }

    const eliminar = await service.eliminarProduto(id);
    return res.status(200).json(eliminar);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ mensagem: "erro ao eliminar o produto" });
  }
});

export default controller;