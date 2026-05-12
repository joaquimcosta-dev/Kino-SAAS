import db from '../config/db.js';
// funcao com sql para criar funcionarios
export const criar_funcionario= async(data)=>{
    const {nome,bilhete,telefone,datas}=data;
    const novo = await db.query("insert into funcionario(nome,bilhe,telefone,data) values (?,?,?,?)",[nome,bilhete,telefone,datas]);
    return novo;
}

// funcao com sql para buscar funcionarios id
export const buscarFuncicionarioId=async(id)=>{
    const encontrado= await db.query("select *from funcionario where id_fun=?",[id]);
    return encontrado[0];

}

// funcao com sql para eliminar funcionarios
export const deletarUsuario = async (id)=>{
    const eliminado]= await db.query("delete from funcionario where id_fun=?",[id]);
    return eliminado;

}

// funcao com sql para buscar todos funcionarios 
export const listarTodosFuncionarios=async()=>{
    const lista= await db.query("select id_fun, nome,bilhe, telefone, id_user from funcionario");
    return lista;
}
// funcao com sql para atualizar funcionarios
export const atualizar_funcionario= async(data)=>{
    const {id,nome,bilhete,telefone,datas}=data;
    const atualizado = await db.query("update funcionario set (nome,bilhe,telefone,data) values (?,?,?,?) where id=?",[nome,bilhete,telefone,datas,id]);
    return atualizado;
}
