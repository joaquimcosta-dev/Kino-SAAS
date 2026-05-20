import {listarTodasReclamacao,criar_reclamacao} from '../model/reclamacao.js';

export const listar =async()=>{
  const lista =await listarTodasReclamacao();
  return lista;
}
export const criarReclamacao = async(data)=>{
 // if(!data.nome || !data.tel || !data.motivo || data.descricao){
 //   throw new Error("Este campo deve ser obgrigatório")
 // }
 
  const {nome,tel,motivo,descricao}=data;
  const recla = await criar_reclamacao({nome,tel,motivo,descricao});
  return recla;

}