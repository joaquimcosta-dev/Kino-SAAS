const nome = document.querySelector('#nome');
const telefone = document.querySelector('#nume');
const motivo =document.querySelector('#selecaoReclamacao');
const formulario = document.getElementById('complaintForm');
const btn = document.getElementById('submitBtn');
const mensagem = document.getElementById('message');
const URL = "http://localhost:3000/index/reclamacao/enviar";

// funcao para envio de reclamacao para o backend
const enviarRclamacao= async(data)=>{
    try {
        const res = await fetch(URL,{
            method:"post",
            headers:{
                "Content-Type":"application-json",
                body:JSON.stringify(data)
            }
        })
        //fazendo a verificacao do envio
         if(res.ok){
            alert("Reclamação enviada com sucesso!");
            return;
            }
             alert("Reclamação não enviada!");
              return;
        
    } catch (e) {
        console.log("Erro ao tentar enviar a reclamação")
    }
}
//funcao para limpar os campos
const limpar=()=>{
    nome.value=''
    telefone.value=''
    motivo.value=''
    mensagem.value=''
    btn.innerText = "enviar";
    btn.disabled = false;
}
formulario.addEventListener('submit', (e)=> {
    if (mensagem.value.trim() === "") {
        alert("Por favor, Digite a sua Reclamação antes de enviar.");
        return;
    }
    e.preventDefault();
    //pegados os valores enviados
    const data ={
        nome:nome.value,
        telefone:telefone.value,
        motivo:motivo.value,
        descricao:mensagem.value
    }
    btn.innerText = "Enviando...";
     btn.disabled = true;
    //chamando a funcao enviar reclamacao
   enviarRclamacao(data);
    // chamando a funcao limpar
    limpar();
   



        
    
});