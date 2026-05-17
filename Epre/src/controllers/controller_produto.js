import express from "express";
import * as service from "../service/service_produto.js";
import { permissaoAdmin } from "../middlewares/auth.js";

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
controller.post("/cadastrar", permissaoAdmin, async (req, res) => {
    try {
        const { nome, img, preco, descricao, id_cat } = req.body;
        const id_user = req.user.id;
        const resultado = await service.cadastrarProduto(
            nome,
            img,
            preco,
            descricao,
            id_cat,
            id_user
        );
        return res.status(201).json(resultado);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ menssagem: "Erro de cadastro" });
    }
});

//rota pra buscar produto
controller.get("/listar/:id", async (req, res) => {
    try {
        const { id } = req.params.id;

        //verifica se é um número válido
        if (isNaN(id)) {
            return res.status(400).json({ mensagem: "ID inválido" });
        }

        // verifica se é positivo
        if (id <= 0) {
            return res.status(400).json({ mensagem: "ID inválido" });
        }

        const produto = await service.buscarProdutoId(id);

        return res.status(200).json(produto);
    } catch (e) {
        console.log(e);
        return res
            .status(404)
            .json({ menssagem: "Erro ao encontrar o produto" });
    }
});

//rota atualizar produto
controller.put("/atualizar/:id", permissaoAdmin, async (req, res) => {
    try {
        const id = req.params.id;

        // verifica o id
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ mensagem: "Id inválido" });
        }

        const { nome, img, preco, deescricao, id_cat } = req.body;

        const resultado = await service.atualizarProduto(
            id,
            nome,
            img,
            preco,
            deescricao,
            id_cat
        );

        return res.status(200).json(resultado);
    } catch (e) {
        console.log(e);
        return res
            .status(400)
            .json({ mensagem: "erro ao atualizar o produto" });
    }
});

//rota Eliminar produto

controller.delete("/eliminar/;id", permissaoAdmin, async (req, res) => {
    try {
        const id = req.params.id;

        //verifica o id
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ mensagem: "id invalido" });
        }

        const eliminar = service.eliminarProduto(id);
        return res.status(200).json(eliminar);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ mensagem: "erro ao eliminar o produto" });
    }
});

export default controller;
