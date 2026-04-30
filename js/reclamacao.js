document.getElementById('complaintForm').addEventListener('submit', function(e) {
    e.preventDefault();


    const message = document.getElementById('message').value;
    const btn = document.getElementById('submitBtn');


    if (message.trim() === "") {
        alert("Por favor, Digite a sua Reclamação antes de enviar.");
        return;
    }


    // Efeito visual de envio
    btn.innerText = "Enviando...";
    btn.disabled = true;


    // Simulação de uma requisição API (backend)
    setTimeout(() => {
        console.log("Mensagem enviada:", message);
        
        alert("Reclamação enviada com sucesso!");
        
        // Limpar formulário
        document.getElementById('message').value = "";
        btn.innerText = "enviar";
        btn.disabled = false;
    }, 1500);
});