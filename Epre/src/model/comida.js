import db from "../config/db.js";

// funcao model para criar comida
export const criarComida = (data)=>{
const {nome,id_prod}=data;
const novo = await db.query("insert into comida (nome,id_prod) values (?,?)",[nome,id_prod]);
return novo;

}

// funcao model para listar comida
export const ListarComida = ()=>{
const lista = await db.query(" select *from comida");
return lista;

}

// funcao model para listar id comida
export const listarComida = (id)=>{
const [encontrad] = await db.query("select *from comida where id_comida=?",[id]);
return encontrado[0] || null;

}
// funcao model para eliminar comida
export const criarComida = (id)=>{
const [eliminado] = await db.query("delete from comida where id_comida=?",[id]);
return encontrado[0] || null;

}