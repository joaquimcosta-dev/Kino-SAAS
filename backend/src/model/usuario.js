import db from './../config/db.js';
// funcao com sql para criar novo usuario
export const criarUsuario = async (data)=>{
    const {username,senhaCripto,perfil,estado,id_fun}= data;
    const [novo] =await db.query("insert into usuario (username,senha,perfil,estado,id_fun) values (?,?,?,?,?)",[username,senhaCripto,perfil,estado,id_fun]);
    return novo[0]
}
// funcao com sql para fazer login
export const login=async({username})=>{
    const [logado] = await db.query("select *from usuario where username = ?",[username])
    return logado[0] || null;
}
// funcao com sql para buscar usuario id
export const buscarUsuarioId=async(id)=>{
    const [encontrado]= await db.query("select *from usuario where id_fun=?",[id]);
    return encontrado[0] || null;
}
// funcao com sql para eliminar usuario
export const deletarUsuario = async (id)=>{
    const [eliminado]= await db.query("delete from usuario where id_user=?",[id]);
    return eliminado[0];

}

// funcao com sql para buscar todos usuarios 
export const listarTodosUsuarios=async()=>{
    const lista= await db.query("select id_user, username,perfil,estado,id_fun from usuario where estado=1");
    return lista[0];
}
