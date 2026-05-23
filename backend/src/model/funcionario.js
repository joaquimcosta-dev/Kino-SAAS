import db from "../config/db.js";
// funcao com sql para criar funcionarios
export const criar_funcionario = async data => {
    const { nome, bi, data_nasc, tel } = data;
    const novo = await db.query(
        "insert into funcionario(nome, bi, data_nasc, tel) values (?,?,?,?)",
        [nome, bi, data_nasc, tel]
    );
    return novo;
};

// funcao com sql para buscar funcionarios id
export const buscarFuncicionarioId = async id => {
    const [encontrado] = await db.query(
        "select *from funcionario where id_fun=?",
        [id]
    );
    return encontrado[0] || null;
};

// funcao com sql para eliminar funcionarios
export const deletarUsuario = async id => {
    const [eliminado] = await db.query(
        "delete from funcionario where id_fun=?",
        [id]
    );
};

// funcao com sql para buscar todos funcionarios
export const listarTodosFuncionarios = async () => {
    const lista = await db.query(
        "select id_fun, nome, bi, tel, data_nasc from funcionario"
    );
    return lista;
};

// funcao com sql para atualizar funcionarios
export const atualizar_funcionario = async data => {
    const { id, nome, bi, tel, data_nasc } = data;
    const atualizado = await db.query(
        "update funcionario set (nome, bi, tel, data_nasc) values (?,?,?,?) where id=?",
        [nome, bi, tel, data_nasc, id]
    );
    return atualizado;
};

//procurando bi do funcionario
export const procurandoBi = async bi => {
    const [bilhete] = await db.query("select * from funcionario where bi=?", [
        bi
    ]);
    return bilhete[0] || null;
};
