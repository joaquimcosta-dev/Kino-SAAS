import db from "../config/db.js";

export const criarPedirComida =async ({id_ped,id_comida})=>{
    const novo = await db.query("insert into pedir_comida (id_ped,id_comida) values(?,?)",[id_ped,id_comida]);
}