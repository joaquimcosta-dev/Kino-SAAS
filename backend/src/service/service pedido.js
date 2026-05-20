export const criarPedido = async ({
    nome,
    telefone,
    endereco,
    cod,
    datas,
    itens
}) => {
    // Validação: só nome é obrigatório agora
    if (!nome) {
        throw new Error("Nome é obrigatório");
    }

    if (!itens || itens.length === 0) {
        throw new Error("O pedido precisa ter pelo menos 1 item");
    }

    // 1. Cria o pedido principal na tabela pedido
    const dadosPedido = { nome, telefone, endereco, cod, datas };
    const [resultado] = await pedidoModel.criar_pedido(dadosPedido);
    const id_pedido = resultado.insertId;

    // 2. Adiciona cada item na tabela pedir_comida ligada ao pedido
    for (const item of itens) {
        if (!item.id_comida) {
            throw new Error("Um dos itens não tem id_comida");
        }

        await pedirComidaModel.criarPedirComida({
            id_ped: id_pedido,
            id_comida: item.id_comida
        });
    }

    return {
        id_pedido,
        mensagem: "Pedido criado com sucesso",
        total_itens: itens.length
    };
};
