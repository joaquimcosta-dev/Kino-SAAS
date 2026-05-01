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
      load.classList.toggle("mostrar-load");
      (response) => response.json();
      return console.log(response);
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
  fazerLogin(data);
});
