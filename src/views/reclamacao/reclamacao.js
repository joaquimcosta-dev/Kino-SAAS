const nome = document.querySelector('#nome');
const telefone = document.querySelector('#telefone'); 
const motivo = document.querySelector('#selecaoReclamacao');
const formulario = document.getElementById('complaintForm');
const btn = document.getElementById('submitBtn');
const mensagem = document.getElementById('message');

// URL base para facilitar a manutenção
const BASE_URL = "http://localhost:3000/index/reclamacao";

// 1. Restrição Visual para o Telefone
telefone.addEventListener("input", function() {
    this.value = this.value.replace(/\D/g, ""); 
    if (this.value.length > 9) {
        this.value = this.value.slice(0, 9);
    }
});

// --- OPERAÇÕES DO CRUD ---

// [CREATE] - Enviar Reclamação
const enviarReclamacao = async (data) => {
    try {
        const res = await fetch(`${BASE_URL}/enviar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            alert("Reclamação enviada com sucesso!");
            limpar();
        } else {
            alert("Erro ao enviar para o servidor.");
            resetarBotao();
        }
    } catch (e) {
        console.error("Erro de conexão:", e);
        alert("Servidor desligado. Ligue o backend da Kino.");
        resetarBotao();
    }
};

/* [READ] - Listar Reclamações (Útil para uma página de admin)
const listarReclamacoes = async () => {
    try {
        const res = await fetch(`${BASE_URL}/listar`);
        const lista = await res.json();
        console.log("Lista de Reclamações Atualizada:", lista);
        return lista;
    } catch (e) {
        console.error("Erro ao ler dados:", e);
    }
};

// [DELETE] - Apagar uma Reclamação específica
const apagarReclamacao = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/apagar/${id}`, {
            method: "DELETE"
        });
        if (res.ok) {
            console.log(`Reclamação ${id} removida.`);
            alert("Registo apagado com sucesso.");
        }
    } catch (e) {
        console.error("Erro ao apagar:", e);
    }
};*/

// --- FUNÇÕES AUXILIARES ---

const limpar = () => {
    nome.value = '';
    telefone.value = '';
    motivo.selectedIndex = 0;
    mensagem.value = '';
    resetarBotao();
};

const resetarBotao = () => {
    btn.innerText = "enviar";
    btn.disabled = false;
};

// --- EVENTO PRINCIPAL ---

formulario.addEventListener('submit', (e) => {
    e.preventDefault(); 

    // Validação: Nome sem números
    const contemNumeros = /\d/;
    if (contemNumeros.test(nome.value)) {
        alert("O nome deve conter apenas letras.");
        nome.focus();
        return;
    }

    // Validação: Telefone Angolano (9 dígitos)
    if (telefone.value.length !== 9) {
        alert("O número de telefone em Angola deve ter exatamente 9 dígitos.");
        telefone.focus();
        return;
    }

    if (mensagem.value.trim() === "") {
        alert("Escreva a sua reclamação.");
        return;
    }

    const data = {
        nome: nome.value.trim(),
        telefone: telefone.value,
        motivo: motivo.value,
        descricao: mensagem.value.trim()
    };

    btn.innerText = "enviando...";
    btn.disabled = true;

    enviarReclamacao(data);
});