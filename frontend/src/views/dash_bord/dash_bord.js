const body = document.querySelector("#tbody");
const URL_RECLAMACAO = "http://localhost:3000/listar/listar-reclamacao";
const funcionario = document.querySelector('#nomeFun')

//função para listar as reclamacões
const listarReclamacao = async () => {
  // Verificar se o usuário está logado
  if (!localStorage.token || !localStorage.getItem("user")) {
    window.location.href = "../login/login.html";
    return;
  }

  const response = await fetch(URL_RECLAMACAO, {
    method: "GET",
    headers: {
        "Authorization": "Bearer " + localStorage.token,
        "Content-Type": "application/json"
    }
})
.then((res) => {
    // verificação do token aqui
    if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "../login/login.html";
        return;
    }
    return res.json();
})
.then((res) => {
    // resto do código igual
    const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.nome) {
        funcionario.innerHTML = user.nome;
      }
      const sms = ["Lista de reclamação", "Lista vazia"];

      //consol.log(localStorage.user)
      //Map para percorrer o lista vindo do bd
      res.map((e, index) => {
        //inicio de criacao dos elementos
        const tr = document.createElement("tr");
        const id = document.createElement("td");
        const nome = document.createElement("td");
        const tel = document.createElement("td");
        const sms = document.createElement("td");
        const data = document.createElement("td");
        //fim de criacao dos elementos
        //inserirndo os elemrntos na
        id.innerHTML = index + 1;
        nome.innerHTML = e.nome;
        tel.innerHTML = e.tel;
        sms.innerHTML = e.descricao;
        data.innerHTML = new Date(e.data).toLocaleString('pt-PT', {
          timeZone: 'Africa/Luanda'
        });
        tr.append(id);
        tr.append(nome);
        tr.append(tel);
        tr.append(sms);
        tr.append(data);
        body.append(tr);
      });
      res.length > 0 ? body.append(sms[0]) : body.append(sms[1]);
    })
    .catch((e) => {
      console.log("Erro ao tentar listar reclamação", e);
    });
};
listarReclamacao();