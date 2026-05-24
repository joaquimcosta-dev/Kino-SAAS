const abrir_carrinho = document.querySelector("#carrinho");
const fechar_modal_carrinho = document.querySelector("#fechar_modal_carrinho");
const modal_carrinho = document.querySelector(".modal_carrinho");
const removerItemCarrinho = document.querySelector('.remover-item-pedido')
const btnEnviarPedido = document.querySelector('#form_carrinho');
const nome_cliente = document.querySelector('#nome_pedido');
const cliente_telefone = document.querySelector('#numero_pedido');
const cliente_endereco = document.querySelector('#endereco_pedido');
const divChefe = document.querySelector('.pratos')
const contadorCarrinho = document.querySelector('.cart-badge')
const corpoTbPedido = document.querySelector(".tbody-pedido")
const form_pesquisar = document.querySelector('.form_pesquisar')
const inputProcurar = document.querySelector('#inputProcurar')
const result_pesquisa = document.querySelector('.result_pesquisa')
const URL_PEDIDO = "http://localhost:3000/Index/pedido/criar";
const URL_BASE = "http://localhost:3000"
const removerItem = [];
const itensPedido = [];
//conexao com o back, usando o fetch
const getProduto = async()=>{
try{
//fazendo o get
const response = await fetch(`${URL_BASE}/Index/produto/listar`);
//verificando o estatus
if (response.ok){
const res = await response.json();
listaProduto(res);
return res;
}
console.log("Não foi possivel listar pridutos");
return;

}catch(e){
console.log("Erro ao tentar listar produto", e)
}

}
//percorendo a lista de produto e colocar na tela
const listaProduto = (data)=>{
  divChefe.innerHTML=''
data.forEach((e)=>{
//criação dos elementos html
const div = document.createElement('div')
const preco = document.createElement('span')
const nome = document.createElement('h5')
const imgAdd = document.createElement('img')
const btnAdd = document.createElement('button')
const divInf = document.createElement('div')
//adicionando class nos elementos
preco.setAttribute("class", "prato-price")
divInf.setAttribute("class", "prato-info")
btnAdd.setAttribute("class", "btn-add-cart")
btnAdd.onclick = ()=>adcionarCarrinho(`${e.id_prod}`)
div.setAttribute("class", "prato-card")
imgAdd.src = "icons/adicionar.svg"
div.style.backgroundImage = `url(${e.img})`
//adicionando informação nos elementos
preco.innerHTML = e.preco+"Kz"
nome.innerHTML = e.nome
//adicionano na div
divInf.append(nome)
btnAdd.append(imgAdd)
divInf.append(btnAdd)
div.append(preco)
div.append(divInf)
divChefe.append(div)


})
}
//atualizar o contador a cada segundo
setInterval(()=>{
contadorCarrinho.innerHTML = itensPedido.length})
//adicionando modal carrinho na tela
abrir_carrinho.addEventListener("click", (e) => {
modal_carrinho.classList.toggle("mostrar");
});

//removendo modal carrinho na tela
fechar_modal_carrinho.addEventListener("click", (e) => {
modal_carrinho.classList.toggle("mostrar");
});
//adicionando elementos selecionados na tel
const adicionarPedidoNaLista = ()=>{
//limpando o corpopedido
corpoTbPedido.innerHTML = '';
itensPedido.forEach((e, index)=>{
//criar os elementos
const linhaTabele = document.createElement("tr")
const numero = document.createElement("td")
const nome = document.createElement("td")
const preco = document.createElement("td")
const remover = document.createElement("td")
const link = document.createElement("a");
const qnt = document.createElement("td")
const valor = document.createElement("td")
link.innerHTML = 'remover'
link.href = '#';
link.onclick = (b)=>removerItens(b, e.id_prod)
//inserindo conteudos nos elementos criados
numero.innerHTML = index + 1;
nome.innerHTML = e.nome;
preco.innerHTML = e.preco
qnt.innerHTML = e.qtd
valor.innerHTML = (e.preco*e.qtd)+'kz'
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
const adcionarCarrinho = async(id)=>{
//recebendo valores que vem da funcao getProduto
const produto = await getProduto();
let data;
//achando o produto no array produto
const enco = produto.find(e=>e.id_prod == id)
if (!enco)return;
const prod = itensPedido.find(e=>e.id_prod == enco.id_prod);
if (!prod){
data = {
id_prod: enco.id_prod,
nome: enco.nome,
preco: enco.preco,
qtd: 1
}
//adicionar produto na lidta de pedido
itensPedido.push(data);
} else {
//percorendo array oara atualizar a qtd
itensPedido.forEach((e)=>{
if (e.id_prod == enco.id_prod){
return e.qtd++
}
});
console.log(itensPedido);

}
adicionarPedidoNaLista()
}
//para procurar comida
form_pesquisar.addEventListener('submit', (e)=>{
e.preventDefault()
const buscar = inputProcurar.value


const res = listaProduto.filter(p=>p.nome == buscar);

res.forEach((e)=>{
//criação dos elementos html
const div = document.createElement('div')
const preco = document.createElement('span')
const nome = document.createElement('h5')
const imgAdd = document.createElement('img')
const btnAdd = document.createElement('button')
const divInf = document.createElement('div')
//adicionando class nos elementos
preco.setAttribute("class", "prato-price")
divInf.setAttribute("class", "prato-info")
btnAdd.setAttribute("class", "btn-add-cart")
btnAdd.onclick = ()=>adcionarCarrinho(`${e.id_prod}`)
div.setAttribute("class", "prato-card")
imgAdd.src = "icons/adicionar.svg"
div.style.backgroundImage = `url(${e.img})`
//adicionando informação nos elementos
preco.innerHTML = e.preco+"Kz"
nome.innerHTML = e.nome
//adicionano na div
divInf.append(nome)
btnAdd.append(imgAdd)
divInf.append(btnAdd)
div.append(preco)
div.append(divInf)
result_pesquisa.style.display = "flex"
result_pesquisa.append(div)
} )
})

//funcao para remover elemntos da tela
const removerItens = (e,id)=>{
const remover = (e.target.parentElement.parentNode)
const index = itensPedido.findIndex(e=>e.id_prod == id);
//remover o item do array
itensPedido.splice(index, 1)
remover.remove();
}
//funcao enviar dados no back
const postPedido = async(data)=>{
try{
const response = await fetch(URL_PEDIDO, {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(data)
})
if (response.ok)return console.log("sucesso")
return console.log(await response.json())

}catch(e){
console.log(e);
}
}
//enviar pedido
btnEnviarPedido.addEventListener('submit', (e)=>{
e.preventDefault();
const data = {
nome: nome_cliente.value,
telefone: cliente_telefone.value,
endereco: cliente_endereco.value,
item: itensPedido
}
postPedido(data);

});
getProduto()