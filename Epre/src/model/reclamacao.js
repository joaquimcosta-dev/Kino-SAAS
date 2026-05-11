import db from '../config/db.js';

//Funcao que contemm o sql para criar nova reclamacao no db
export const criar_reclamacao = async (data)=>{
    const {nome, motivo,descricao, datas,telefone}=data;
    const reclamacao= await db.query("insert into reclamacao (nome,motivo,descricao,data,telefone) values(?,?,?,?,?)",[nome,motivo,descricao,datas,telefone])
    return reclamacao;
}
//Funcao que contemm o sql para deletar reclamacao no db
export const deletarRelclamacao= async(id)=>{
    const eliminado = await db.query("delete from reclamacao where id_reclamacao =?",[id]);
    return eliminado;
}
//Funcao que contemm o sql para listar reclamacao no db
export const listarTodasReclamacao = async()=>{
    const lista = await db.query("select *from reclamcao");
    return lista;
}
