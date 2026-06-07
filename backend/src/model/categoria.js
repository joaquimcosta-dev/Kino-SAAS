import db from "../config/db.js";


//funcao para casdastrar categoria
export const criarCategoria = async data => {
    const { nome } = data;
    const [novaCat] = await db.query("insert into categoria(nome) values (?)", [
        nome
    ]);
    return novaCat[0];
};

//listar todas as categirias
export const listar = async () => {
    const listar = await db.query("select id_cat, nome from categoria");
    return listar;
};

//funcao para buscar por id
export const listarId = async id => {
    const [buscado] = await db.query(
        "select nome from  categoria where id_cat =?",
        [id]
    );
    return buscado[0] || null;
};

//funcao para deletar
export const deletar = async id => {
    const [deletado] = await db.query(
        "delete from  categoria where id_cat =?",
        [id]
    );
    return deletado[0];
};
//funcao para atualizar categorias
export const atualizar = async ({ id, nome }) => {
    const [atualizado] = await db.query(
        "update categoria set nome =? where id =?",
        [nome, id]
    );
    return atualizado[0];
};
