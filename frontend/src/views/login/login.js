const alertaErro = document.querySelector(".notificacao");
const load = document.querySelector(".load");
const username = document.querySelector("#user");
const senha = document.querySelector("#senha");
const formLogin = document.querySelector("#form");
const URL = "http://localhost:3000/index/usuario/login";

//funcao para fazer login
const fazerLogin = async (data) => {
try {
const response = await fetch(URL, {
method: "post",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(data),
});

if (response.ok) {

load.classList.remove("mostrar-load");
(response) => response.json();
const dados = await response.json();
localStorage.setItem('token', dados.token);
localStorage.setItem('user',JSON.stringify(dados.user))
console.log(JSON.stringify(dados.user))
window.location.href = '../dash_bord/das_bord.html'
}
alertaErro.classList.toggle("mostrar");
} catch (e) {
console.log("erro ao tentar logar " + e);
}
};

//formulario login
formLogin.addEventListener("submit", (e) => {
e.preventDefault();
data = {
username: username.value,
senha: senha.value,
};
load.classList.toggle("mostrar-load");
setTimeout(5000);
fazerLogin(data);
});