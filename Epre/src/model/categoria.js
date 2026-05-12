import db from "../config/db.js";
//funcao para casdastrar categoria
export const criarCategoria = async date => {
    const { nome } = data;
    const novaCat = await db.query("insert into categoria(nome) values (?)", [
        nome
    ]);
    return novaCat;
};

//listar todas as categirias
export const listar = async () => {
    const [lista] = await db.query("slect nome from categoria");
    return lista;
};

//funcao para deletar
export const deletar = async id => {
    const deletado = await db.query("delete from  categoria where id_cat =?", [
        id
    ]);
};
//funcao para atualizar categirias
export const atualizar = async ({ id, nome }) => {
    const atualizado = await db.query(
        "update categoria set nome =? where id =?",
        [nome, id]
    );
};
