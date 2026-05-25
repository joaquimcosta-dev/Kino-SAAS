import db from "../config/db.js";

export const criarPedirProduto =async ({id_ped,id_prod,qtd})=>{
    const novo = await db.query("insert into pedido_produto (id_ped,id_prod,qtd) values(?,?,?)",[id_ped,id_prod,qtd]);
}