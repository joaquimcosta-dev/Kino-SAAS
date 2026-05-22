const abrir_carrinho = document.querySelector("#carrinho");
const fechar_modal_carrinho = document.querySelector("#fechar_modal_carrinho");
const modal_carrinho = document.querySelector(".modal_carrinho");
const removerItemCarrinho = document.querySelector('.remover-item-pedido')
const btnEnviarPedido = document.querySelector('#btn_pedido');
const nome_cliente = document.querySelector('#nome_pedido');
const cliente_telefone = document.querySelector('#numero_pedido');
const cliente_endereco = document.querySelector('#endereco_pedido');
const divChefe =document.querySelector('.pratos')
const contadorCarrinho =document.querySelector('.cart-badge')
const removerItem =[];
const itensPedido =[];
const listaProduto=[
  {
    "id_prod":1,
    "nome":"Hambúrguer",
    "preco":1500,
    "img":"img/cat_fast_food.jpg"
  },
    {
    "id_prod":2,
    "nome":"Salda composto",
    "preco":3000,
    "img":"img/cat_almoco.jpg"
  },
    {
    "id_prod":3,
    "nome":"cocktail",
    "preco":1000,
    "img":"img/cat_bebidas.jpg"
  },
    {
    "id_prod":4,
    "nome":"Bife",
    "preco":3000,
    "img":"img/cat_jantar.jpg"
  },
]
//percorendo a lista de produto e colocar na tela
listaProduto.forEach((e)=>{
  //criação dos elementos html
  const div =document.createElement('div')
  const preco =document.createElement('span')
  const nome =document.createElement('h5')
  const imgAdd =document.createElement('img')
  const btnAdd =document.createElement('button')
  const divInf =document.createElement('div')
  //adicionando class nos elementos 
  preco.setAttribute("class","prato-price")
  divInf.setAttribute("class","prato-info")
  btnAdd.setAttribute("class","btn-add-cart")
  div.setAttribute("class","prato-card")
  imgAdd.src="icons/adicionar.svg"
  div.style.backgroundImage=`url(${e.img})`
  //adicionando informação nos elementos
  preco.innerHTML=e.preco+"Kz"
  nome.innerHTML=e.nome
  //adicionano na div
  divInf.append(nome)
  btnAdd.append(imgAdd)
  divInf.append(btnAdd)
  div.append(preco)
  div.append(divInf)
  divChefe.append(div)
  
  
})
contadorCarrinho.innerHTML=itensPedido.length
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