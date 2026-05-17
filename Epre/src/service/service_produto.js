import * as ProdutoModel from "../model/produto.js";

export const listarProdutos = async() =>{
        const[rows] = await ProdutoModel.listarProdutos();
        return rows;
};

//buscar produto
export const buscarProdutoId = async(id) => {
        const [rows] = await ProdutoModel.buscarProdutoId(id);
        return rows[0];
};

//criar
export const cadastrarProduto = async (nome, img, preco, descricao, quantidade, id_user) => {
    
    // validações obrigatórias
    if (!nome){
        throw new Error("Nome é obrigatório");
    }
    
    if (nome.trim().length < 3){
        throw new Error("Nome muito curto");
    }

    if (!preco){
        throw new Error("Preço é obrigatório");
    }
    
    if (isNaN(preco)){
        throw new Error("Preço inválido");
    }
    
    if (preco <= 0){
        throw new Error("Preço deve ser maior que zero");
    }
    
    if (!id_user){
        throw new Error("Utilizador é obrigatório");
    }
    if(!img){
        throw new Error("Imagem é obrigatória");
    }

    const nomeLimpo = nome.trim();

    const [result] = await ProdutoModel.cadastrarProduto(
        nomeLimpo, img, preco, descricao, quantidade, id_user, null
    );

    return { id_prod: result.insertId, mensagem: "Produto criado com sucesso" };
};;

//atualizar
export const atualizarProduto = async(id, nome, img, preco, descricao, quantidade, id_cat) =>{
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

        await ProdutoModel.atualizarProduto(id, nome.trim(), img, preco, descricao, quantidade, id_cat);

        return {mensagem: "produto atualizado com sucesso"}
};


//eliminar
export const eliminarProduto = async (id) => {
        // 1. verificar se o produto existe
        const [rows] = await ProdutoModel.buscarProdutoId(id);

        if (rows.length === 0) {
            throw new Error("Produto não encontrado");
        }
        // 2. tudo válido — elimina
        await ProdutoModel.eliminarProduto(id);
        return { mensagem: "Produto eliminado com sucesso" };
};