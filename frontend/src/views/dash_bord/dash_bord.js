const body = document.querySelector("#tbody");
const URL_BASE = "http://localhost:3000";
const funcionario = document.querySelector('#nomeFun')
const tbody_pedido = document.querySelector('.tbody-pedido')
const pedidos = document.querySelector("#pedidos")
const pendente = document.querySelector("#pendente").innerHTML=0;
const preparando = document.querySelector("#preparando").innerHTML=0;
const feito = document.querySelector("#feito").innerHTML=0;
const entrega = document.querySelector("#entrega").innerHTML=0;


//função para listar as reclamacões
const listarReclamacao =  async() => {
  try {
    
  
  
  const response = await fetch(URL_BASE+"/listar/listar-reclamacao",{
    method:"GET",
    headers:{
      "Authorization":"Bearer "+localStorage.token,
      "Content-Type":"application/json"
    }
  }
  )
  console.log(response.status)
return
if (response.status === 401 || response.status === 500) {
  //remivendo o token do localStorage
  localStorage.clear();
  window.location.href = "../login/login.html";
  return;
}
  
    if(response.ok){
       //vericando o staus do token
 
      const res=await response.json()
      
      const fun=localStorage.getItem("user");
      const funcio= JSON.parse(fun)
      funcionario.innerHTML=funcio.nome
      const sms = ["Lista de reclamação", "Lista vazia"];

  //consol.log(localStorage.user)
      //Map para percorrer o lista vindo do bd
      res.forEach((e, index) => {
        //inicio de criacao dos elementos
        const tr = document.createElement("tr");
        const id = document.createElement("td");
        const nome = document.createElement("td");
        const tel = document.createElement("td");
        const sms = document.createElement("td");
        const data = document.createElement("td");
        //fim de criacao dos elementos
        //inserirndo os elemrntos na
        id.innerHTML = index +1;
        nome.innerHTML = e.nome;
        tel.innerHTML = e.tel;
        sms.innerHTML = e.descricao;
        data.innerHTML = "20/05/2026";
        tr.append(id);
        tr.append(nome);
        tr.append(tel);
        tr.append(sms);
        tr.append(data);
        body.append(tr);
      });
      res.length > 0 ? body.append(sms[0]) : body.append(sms[1]);
    
    
    
    }else{
   console.log("Não foi possível carregar")
 }
  } catch (e) {
    console.log("erro",e)
  }
}


const listarPedido = async () => {
  
  const response = await fetch(URL_BASE+"/pedido/listar",{
    method:"GET",
    headers:{
      "Authorization":"Bearer "+localStorage.token,
      "Content-Type":"application/json"
    }
  }
  )
    .then((res) => res.json())
    .then((res) => {
      const sms = ["Lista de pedidos", "Lista vazia"];
      pedidos.innerHTML=res.length

  //consol.log(localStorage.user)
      //Map para percorrer o lista vindo do bd
      res.forEach((e, index) => {
        //inicio de criacao dos elementos
        const tr = document.createElement("tr");
        const id = document.createElement("td");
        const nome = document.createElement("td");
        const tel = document.createElement("td");
        const end = document.createElement("td");
        const data = document.createElement("td");
        const estado = document.createElement("td");
        //fim de criacao dos elementos
        //inserirndo os elemrntos na
        id.innerHTML = index +1;
        nome.innerHTML = e.nomeP;
        tel.innerHTML = e.tel;
        data.innerHTML = e.data;
        end.innerHTML=e.endereco;
        estado.innerHTML=e.estado;
        tr.append(id);
        tr.append(nome);
        tr.append(tel);
        tr.append(end);
       // tr.append(data);
         tr.append(estado);
        tbody_pedido.append(tr);
      });
      res.length > 0 ? body.append(sms[0]) : body.append(sms[1]);
    })
    .catch((e) => {
      console.log("Erro ao tentar listar reclamação", e);
    });
};
//funcao para deslogar o usuario
const logout=()=>{
  localStorage.clear();
}
listarPedido();
listarReclamacao();
