const abrir_carrinho = document.querySelector("#carrinho");
const fechar_modal_carrinho = document.querySelector("#fechar_modal_carrinho");
const modal_carrinho = document.querySelector(".modal_carrinho");
const removerItemCarrinho = document.querySelector('.remover-item-pedido')
const btnEnviarPedido = document.querySelector('#btn_pedido');
const nome_cliente = document.querySelector('#nome_pedido');
const cliente_telefone = document.querySelector('#numero_pedido');
const cliente_endereco = document.querySelector('#endereco_pedido');
const removerItem =[];
const itensPedido =[];
//adicionando modal carrinho na tela
abrir_carrinho.addEventListener("click", (e) => {
  modal_carrinho.classList.toggle("mostrar");
});

//removendo modal carrinho na tela
fechar_modal_carrinho.addEventListener("click", (e) => {
  modal_carrinho.classList.toggle("mostrar");
});


//função para remover um produto na lista de pedido

const removerItens=(item)=>{
  removerItem.filter((e)=>{
    if(e.id===item.id){
      return e;
    }
  
  }
  )
}
removerItemCarrinho.addEventListener('click',(e)=>{
  const b=e.target.parentElement.parentNode.remove();
  const removido=removerItens(b);
  removido.remove();
  
  
});

//função para adicionar item no carrinho ou array
const adiocionarItensCarriho=(item)=>{
  itensPedido.find((el)=>{
    if (item.id===el.id) {
      el.quantidade+=1;
    } else {
      itensPedido.push(item)
    }
    
  })
}
//enviar pedido 
btnEnviarPedido.addEventListener('submit',(e)=>{
  e.preventDefault();
  const data={
    nome:nome_cliente.value,
    telefone:cliente_telefone.value,
    endereco:cliente_endereco.value,
    item:itensPedido
  }
  console.console.log(data);
  
});