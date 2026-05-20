const body = document.querySelector("#tbody");
const URL_RECLAMACAO = "http://localhost:3000/listar/listar-reclamacao";

//função para listar as reclamacões
const listarReclamacao = async () => {
  const response = await fetch(URL_RECLAMACAO)
    .then((res) => res.json())
    .then((res) => {
      const sms = ["Lista de reclamação", "Lista vazia"];

      //Map para percorrer o lista vindo do bd
      res.map((e) => {
        //inicio de criacao dos elementos
        const tr = document.createElement("tr");
        const id = document.createElement("td");
        const nome = document.createElement("td");
        const tel = document.createElement("td");
        const sms = document.createElement("td");
        const data = document.createElement("td");
        //fim de criacao dos elementos
        //inserirndo os elemrntos na
        id.innerHTML = e.id_recla;
        nome.innerHTML = e.Nome;
        tel.innerHTML = e.Telefone;
        sms.innerHTML = e.Descricao;
        data.innerHTML = "20/05/2026";
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
