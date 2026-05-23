import *as modal from "../model/pedido.js";
import *as serviceProduto from "../service/service_produto.js";
export const criarPedido = async (data) => {
const {nome, telefone, endereco, item} = data
const produtos = await serviceProduto.listarProdutos();
//verificar se tem produtos ou comidaas disponiveis
if (produtos.length <= 0){
throw new Error('Sem comidas para fazer pedido')
}
//percorrendo o array produtos e inserir no movo arrya
const novo = [];
for (const it of produtos){
for (const itemP of item){
if (it.id_prod == itemP.id_prod && it.preco == itemP.preco ){
novo.push(it)
}
}
}
novo.forEach((e)=>{
  serviceProduto.atualizarProduto(e)
})
return novo;

console.log(novo.length)
}