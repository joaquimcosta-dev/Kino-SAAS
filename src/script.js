const abrir_carrinho = document.querySelector("#carrinho");
const fechar_modal_carrinho = document.querySelector("#fechar_modal_carrinho");
const modal_carrinho = document.querySelector(".modal_carrinho");

//adicionando modal carrinho na tela
abrir_carrinho.addEventListener("click", (e) => {
  modal_carrinho.classList.toggle("mostrar");
  console.log(e.target);
});

//removendo modal carrinho na tela
fechar_modal_carrinho.addEventListener("click", (e) => {
  console.log(e.target);
  modal_carrinho.classList.toggle("mostrar");
});
