import db from './../config/db.js';
// funcao com sql para criar pedido
export const criar_pedido = async(data)=>{
const {nome, telefone, endereco, cod} = data;
const novo = await db.query("insert into pedido(nome,telefone,endereco,codigo) values (?,?,?,?)", [nome, telefone, endereco, cod]);
return novo;
}

// funcao com sql para buscar pedido id
export const buscarFPrdidoId = async(id)=>{
const [encontrado] = await db.query("select *from pedido where id_ped=?", [id]);
return encontrado[0];

}


// funcao com sql para eliminar pedido
export const deletarPedido = async (id)=>{
const pedido = await db.query("delete from pedido where id_ped=?", [id]);
return pedido;

}

// funcao com sql para buscar todos pedido
export const listarTodosPedido = async()=>{
const lista = await db.query("select  *from pedido");
return lista;
}