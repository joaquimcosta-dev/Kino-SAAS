import db from "../config/db.js";

//função listar produtos pela db
export const listarProdutos = () =>{
    return db.query("SELECT * FROM produto")
};
//função procurar produto pela db
export const buscarProdutoId = (id)=>{
    return db.query(
        "SELECT * FROM produto WHERE id_prod = ?", [id]
    );
};
//função criar produto pela db
export const cadastrarProduto = (nome, img, preco, descricao, quantidade, id_user, id_cat) =>{
    return db.query(
        "INSERT INTO produto (nome, img, preco, descricao, quantidade, id_user, id_cat) VALUES (?,?,?,?,?,?,?)",
        [nome, img, preco, descricao, quantidade, id_user, id_cat]
    );
}
//função atualizar produto pela db
export const atualizarProduto = (id, nome, img, preco, descricao, quantidade, id_cat) =>{
    return db.query(
        "UPDATE produto SET nome=?, img=?, preco=?, descricao=?, quantidade=?, id_cat=? WHERE id_prod=?",
        [nome, img, preco, descricao, quantidade, id_cat, id]
    );
}

//função deletar produto pela db
export const eliminarProduto = (id)=>{
    return db.query(
        "DELETE FROM produto WHERE id_prod=?", [id],
    );
}