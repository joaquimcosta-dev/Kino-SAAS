import express from "express";
import * as service from "../service/service_produto.js";
import { auth, permissaoAdmin } from "../middlewares/auth.js";
import * as servicoCategoria from "../service/service_categoria.js";
import { buscar_usuarioId } from "../service/service_user.js";

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
controller.post("/cadastrar", auth, permissaoAdmin, async (req, res) => {
    try {
        const { nome, img, preco, descricao, requerQtd, id_cat } = req.body;
        //buscar categoria
        //const id_cat = req.params.id;
        //const cat = await servicoCategoria.buscarCatId(id_cat);
        //verificar se a categoria existe
        /*  if (!cat) {
            return res
            .status(404)
            .json({ message: "categoria não encontrado" });
            //return res.status(404).json({message:"Categoria não econtrado"});
            }*/

        if (!req.body.nome || !req.body.preco || !req.body.img || !req.body.descricao) {
            console.log(message)
            return res.status(400).json({ message: "Campo obrigatório" });
        }

        //pegar o id do usuario logado
        const id_user = req.user.id;
        if (!id_user) {
            return res.status(401).json({ message: "Usuario não autenticado" })
        }
        console.log(nome, img, preco, descricao, requerQtd, id_cat, id_user);
        const resultado = await service.cadastrarProduto({
            nome,
            img,
            preco,
            descricao,
            requerQtd,
            id_cat,
            id_user
        });

        return res.status(201).json(resultado);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ menssagem: "Erro de cadastro" });
    }
});

//rota para buscar produto
controller.get("/listar/:id", auth, async (req, res) => {
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
        const id = parseInt(req.params.id);

        // verifica o id
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ mensagem: "Id inválido" });
        }
        const { nome, img, preco, descricao, requerQtd } = req.body;

        const resultado = await service.atualizarProduto(
            id,
            nome,
            img,
            preco,
            descricao,
            requerQtd
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
