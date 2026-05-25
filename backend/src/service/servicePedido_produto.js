import *as model from "../model/pedido_produto.js"

export const pedido_produto=async(data)=>{
  const pediProd = await model.criarPedirProduto(data)
}