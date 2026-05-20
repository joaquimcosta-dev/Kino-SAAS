import modal from "../model/pedido.js";
import serviceProduto from "../service/service_produto.js";
export const criarPedido = async ({
  nome,
  telefone,
  endereco,
  cod,
  datas,
  itens,
}) => {
  // Validação: só nome é obrigatório agora
  if (!nome) {
    throw new Error("Nome é obrigatório");
  }

  if (!itens || itens.length === 0) {
    throw new Error("O pedido precisa ter pelo menos 1 item");
  }
  //Adiciona cada item na tabela pedir_comida ligada ao pedido
  for (const item of itens) {
    if (!item.id_comida) {
      throw new Error("Um dos itens não tem id_comida");
    }
    //buscar buscat produto no banco
    const produto = await modal.listarTodosPedido();
    if (produto.length <= 0) {
      throw new Error("Sem produtos a ser pedido");
    }
    //criar um novo array
    const novo_pe = [];
    //procurando ou interando a tabela itens
    for (const p of itens) {
      //comparando a o id da intens com oque vem no banco
      if (p.id_pro === itens.id_prod) {
        //comparando a quantidade do banco com o array itens
        if (produto.quantidade >= p.quantidade && produto.preco === p.preco) {
          novo_pe.push(p);
        }
        throw new Error("Quantidade pouca no estoque");
      }
      throw new Error("Id diferente");
    }

    // Cria o pedido principal na tabela pedido
    const [resultado] = await pedidoModel.criar_pedido(novo_pe);
    const id_pedido = resultado.insertId;

    for (const p of novo_pe) {
      if (p.id_prod === produto.id_prod) {
        let atualizar = {
          id_prod: p.id_prod,
          quantidade: produto.quantidade - p.quantidade,
        };
        await serviceProduto.atualizarProduto(atualizar);
      }
    }
    //atualizar a quantidade no banco

    /* await pedirComidaModel.criarPedirComida({
      id_ped: id_pedido,
      id_comida: item.id_comida,
    });*/ 
  }

  return {
    id_pedido,
    mensagem: "Pedido criado com sucesso",
    total_itens: itens.length,
  };
};
