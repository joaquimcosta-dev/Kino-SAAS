import  *as model from '../model/usuario.js';


//Serviço para autenticação de usuario
export const autenticacao = async(data)=>{
    const {nome}=data;
    const autenticado = await model.login({nome});
    return autenticado;
}
//Serviço para criar  usuario
export const criar_usuario=async(data)=>{
    const novo=await model.criarUsuario(data);
    return novo;
}
//Serviço para deletar usuario
export const deletar_usuario=async(id)=>{
    const deletado = await model.deletarUsuario(id);
    return deletado;
}

//Serviço para buscar usuario por id
export const buscar_usuarioId=async(id)=>{
    const encontrado = await model.buscarUsuarioId(id);
    return encontrado;
}

//Serviço para buscar todos os usuario 
export const buscar_todos_usuarios=async()=>{
    const lista = await model.listarTodosUsuarios();
    return lista;
}
