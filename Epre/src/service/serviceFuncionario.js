import *as funcionario from "../model/funcionario.js";
export const criarFuncionario = async (data) => {
  const {nome, bi, tel, data}=data;
  const novo = await funcionario.criar_funcionario({nome,bi, tel,data});
  return novo;
}
const buscarFuncionario = async (id) => {
  const [encontrado] = await funcionario.buscarFuncicionarioId(id);
  return encontrado[0] || null;
}