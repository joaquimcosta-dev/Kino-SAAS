import {listarTodasReclamacao} from '../model/reclamacao.js';

export const listar =async()=>{
  const lista =await listarTodasReclamacao();
  return lista;
}