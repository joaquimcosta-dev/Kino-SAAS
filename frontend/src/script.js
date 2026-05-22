const abrir_carrinho = document.querySelector("#carrinho");
const fechar_modal_carrinho = document.querySelector("#fechar_modal_carrinho");
const modal_carrinho = document.querySelector(".modal_carrinho");
const removerItemCarrinho = document.querySelector('.remover-item-pedido')
const btnEnviarPedido = document.querySelector('#form_carrinho');
const nome_cliente = document.querySelector('#nome_pedido');
const cliente_telefone = document.querySelector('#numero_pedido');
const cliente_endereco = document.querySelector('#endereco_pedido');
const divChefe =document.querySelector('.pratos')
const contadorCarrinho =document.querySelector('.cart-badge')
const corpoTbPedido=document.querySelector(".tbody-pedido")
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
  btnAdd.onclick=()=>adcionarCarrinho(`${e.id_prod}`)
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
//atualizar o contador a cada segundo
setInterval(()=>{
contadorCarrinho.innerHTML=itensPedido.length})
//adicionando modal carrinho na tela
abrir_carrinho.addEventListener("click", (e) => {
  modal_carrinho.classList.toggle("mostrar");
});

//removendo modal carrinho na tela
fechar_modal_carrinho.addEventListener("click", (e) => {
  modal_carrinho.classList.toggle("mostrar");
});



//adicionando elementos selecionados na tel
 let quant =0
const adicionarPedidoNaLista=()=>{
   quant +=1;
  itensPedido.forEach((e)=>{
    //criar os elementos
    const linhaTabele =document.createElement("tr")
    const numero =document.createElement("td")
  const nome = document.createElement("td")
  const preco = document.createElement("td")
  const remover =document.createElement("td")
  const link =document.createElement("a");
  const qnt =document.createElement("td")
  const valor= document.createElement("td")
  link.innerHTML='remover'
  link.href='#';
  link.onclick=()=>removerItens(`${e.id_prod}`)
  //inserindo conteudos nos elementos criados
  numero.innerHTML=quant;
  nome.innerHTML=e.nome;
  preco.innerHTML=e.preco
  qnt.innerHTML=e.qtd
  valor.innerHTML=(e.preco*e.qtd)+'kz'
  //adcionando elementos no td
  linhaTabele.append(numero)
  linhaTabele.append(nome)
  linhaTabele.append(preco)
  linhaTabele.append(qnt)
  linhaTabele.append(valor)
  remover.append(link)
  linhaTabele.append(remover)
  corpoTbPedido.append(linhaTabele)
  
  
  }
  )
}

//funccao para adiciomar prato no carrinho
const adcionarCarrinho =(id)=>{
 listaProduto.forEach((e)=>{
   let data={
     id_prod:e.id_prod,
     nome:e.nome,
     preco:e.preco,
     qtd:1
   };
   
    if(e.id_prod==id){
    itensPedido.push(data);
    adicionarPedidoNaLista()
    itensPedido.forEach((p)=>{
      if (e.id_prod==p.id_prod) {
        p.id_prod=+1;
        
      } else {
        
      }
      
    }
    )
    
    }
  }
  )

}

//funcao para remover elemntos da tela
const removerItens= (id)=>{
  const removido=id.target
  console.log(removido)
  
  
}
removerItemCarrinho.addEventListener('click',(e)=>{
  const b=e.target.parentElement.parentNode.remove();
  
  
  
});

//enviar pedido 
btnEnviarPedido.addEventListener('submit',(e)=>{
  e.preventDefault();
  const data={
    nome:nome_cliente.value,
    telefone:cliente_telefone.value,
    endereco:cliente_endereco.value,
    item:itensPedido
  }
  console.log(data);
  
});