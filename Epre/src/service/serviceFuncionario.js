import *as funcionario from "../model/funcionario.js";
//funcao para criar novo funcionario
export const criarFuncionario = async (data) => {
  const {nome, bi, tel, datas}=data;
  const novo = await funcionario.criar_funcionario({nome,bi, tel,datas});
  return novo;
}
//funcao para buscar o funcionario
export const buscarFuncionarioId = async (id) => {
  const encontrado= await funcionario.buscarFuncicionarioId(id);
  return encontrado;
}
//Serviço para listar todos os usuarios
export const listarFuncionarios = async()=>{
  const lista = await funcionario.listarTodosFuncionarios();
  return lista;
}
// serviço para deletar funcionario
export const deletar_funcionario =async(id)=>{
  const eliminado = await funcionario.deletarUsuario(id);
  return eliminado;
} 
//serviço para editar funcionario
export const editarFuncionario = async (data)=>{
  const editado = await funcionario.atualizar_funcionario(data);
  return editado;
}

//service procuraFuncionario por bilhete
export const procurarBilhete = async (bi)=>{
  const encontrado =await funcionario.procurandoBi(bi);
  return encontrado;
}