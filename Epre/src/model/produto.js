import db from "Epre/src/config/db.js";

//função listar produtos
export const listarProdutos = () =>{
    return db.promise().query("SELECT * FROM produto")
};
//função procurar produto
export const buscarProdutoId = (id)=>{
    return db.promise().query(
        "SELECT * FROM produto WHERE id_prod = ?",[id]
    );
};
//função criar produto
export const cadastrarProduto = (id_prod, nome, img, preco, descricao, id_user, id_cat) =>{
    return db.promise().query(
        "INSERT INTO produto (id_prod, nome, img, preco, descricao, id_user, id_cat) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [id_prod, nome, img, preco, descricao, id_user, id_cat]
    );
}
//função atualizar produto
export const atualizarProduto = (id, nome, img, preco, descricao, id_cat) =>{
    return db.promise().query(
        "UPDATE produto SET nome=?, img=?, preco=?, descricao=?, id_cat=? WHERE id_prod=?",
        [nome, img, preco, descricao, id_cat, id]
    );
}

//função deletar produto
export const eliminarProduto = (id)=>{
    return db.promise().query(
        "DELETE FROM produto WHERE id_prod=?" [id],
    );
}