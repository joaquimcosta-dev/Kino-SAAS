import * as ProdutoModel from "../model/produto.js";

export const listarProdutos = async() =>{
    try{
        const[rows] = await ProdutoModel.listarProdutos();
        return rows;
    }catch (e) {
        throw new Error("erros ao listar produtos") 
    }
};

//buscar produto
export const buscarProdutoId = async(id) => {
    try{
        const [rows] = await ProdutoModel.buscarProdutoId(id);

        if(rows.length === 0){
            throw new Error("Produto não encontrado");
        }

        return rows[0];

    }catch(e){
        throw new Error(e.message);
    }
};

//criar
export const cadastrarProduto = async(nome, img, preco, descricao, id_user, id_cat) =>{
    try{

        // validações
        if(!nome || !preco || !id_cat){
            throw new Error("Campos obrigatorios em falta")
        }

        if(isNaN(preco)){
            throw new Error("Preço invalido");
        }

        if(preco <= 0){
            throw new Error("O preco deve ser maior que zero")
        }
        
        if(nome.trim().length() < 3){
            throw new Error("Nome muito curto");
        }

        //remover espaços no inicio e no fim 
        const remvEspNome = nome.trim();

        const [result] = await ProdutoModel.cadastrarProduto(
            remvEspNome, img, preco, descricao, id_user, id_cat
        );

        return {id_prod: result.insertId, mensagem: "produto criado com sucesso"}

    }catch(e){
        throw new Error(e.message)
    }

};

//atualizar
export const atualizarProduto = async(id, nome, img, preco, descricao, id_cat) =>{
    try{

        // verificar se o produto existe
        const [rows] = await ProdutoModel.buscarProdutoId(id)

        if(rows.length === 0){
            throw new Error("Produto não encontrado")
        }

        // validações
        if(!nome || !preco || !id_cat){
            throw new Error("Campos obrigatorios em falta")
        }

        if(isNaN(preco)){
            throw new Error("Preço invalido");
        }

        if(preco <= 0){
            throw new Error("O preco deve ser maior que zero")
        }
        
        if(nome.trim().length() < 3){
            throw new Error("Nome muito curto");
        }

        await ProdutoModel.atualizarProduto(id, nome.trim(), img, preco, descricao, id_cat);

        return {mensagem: "produto criado com sucesso"}

    }catch(e){
        throw new Error(e.message)
    }
};


//eliminar
export const eliminarProduto = async (id) => {
    try {
        // 1. verificar se o produto existe
        const [rows] = await ProdutoModel.buscarProdutoId(id);

        if (rows.length === 0) {
            throw new Error("Produto não encontrado");
        }

        // 2. tudo válido — elimina
        await ProdutoModel.eliminarProduto(id);

        return { mensagem: "Produto eliminado com sucesso" };

    } catch (e) {
        throw new Error(e.message);
    }
};