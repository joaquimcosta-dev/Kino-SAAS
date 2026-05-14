import db from '../config/db.js';

//Função paara atualizar uma reclamação existente na db
export const atualizarReclamacao = async({id,data}) =>{
    const{nome,motivo,descricao,data_reclamacao,telefone}=data;
    const atualizado = await db.query("update reclamacao SET nome=?, motivo=?, descricao=?, data=?,telefone=? WHERE id_reclamacao=?",
        [nome,motivo,descricao,data_reclamacao,telefone,id]
    );
    return atualizado;
}

//Função para buscar uma unica reclamação
export const listarReclamacaoPorld = async (id) => {
    const reclamacao = await db.query("SELECT * FROM reclamacao WHERE id _reclamacao =?", [id]); return reclamacao[0];
}


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
