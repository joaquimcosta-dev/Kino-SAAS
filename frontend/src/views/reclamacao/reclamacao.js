const nome = document.querySelector("#nome");
const telefone = document.querySelector("#telefone");
const motivo = document.querySelector("#selecaoReclamacao");
const formulario = document.getElementById("complaintForm");
const btn = document.getElementById("submitBtn");
const mensagem = document.getElementById("message");
const not_reclamacao = document.querySelector(".not_reclamacao");
// URL base para facilitar a manutenção
const BASE_URL = "http://localhost:3000/index/fazer/reclamacao";
const MENU_URL = "../../util/menu.html";
const LOAD_URL = "../../util/load.html";
const menu = document.querySelector(".menu");
const load = document.querySelector(".loading");
const aviso = [
    "Reclamcao enviado com sucesso",
    "Formulário não enviado",
    "Erro no servidor!, por favor tente mais tarde"
];

// 1. Restrição Visual para o Telefone
telefone.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
    if (this.value.length > 9) {
        this.value = this.value.slice(0, 9);
    }
});

// --- OPERAÇÕES DO CRUD ---

// [CREATE] - Enviar Reclamação
const enviarReclamacao = async data => {
    setTimeout(() => {
        // removendo o load na tela
        load.style.display = "none";
    }, 3000);
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            not_reclamacao.innerHTML = aviso[0];
            not_reclamacao.style.backgroundColor = "green";
            not_reclamacao.classList.toggle("not_mostrar");
            setTimeout(() => {
                not_reclamacao.classList.toggle("not_mostrar");
            }, 5000);
            limpar();
        } else {
            not_reclamacao.innerHTML = aviso[1];
            not_reclamacao.style.backgroundColor = "red";
            not_reclamacao.classList.toggle("not_mostrar");
            setTimeout(() => {
                not_reclamacao.classList.toggle("not_mostrar");
            }, 5000);
            resetarBotao();
        }
    } catch (e) {
        console.error("Erro de conexão:", e);
        not_reclamacao.innerHTML = aviso[2];
        not_reclamacao.style.backgroundColor = "red";
        not_reclamacao.classList.toggle("not_mostrar");
        setTimeout(() => {
            not_reclamacao.classList.toggle("not_mostrar");
        }, 5000);
        resetarBotao();
    }
    
};
//funcao que import o menu na pasta uitl
const getMenu = async () => {
    try {
        const res = await fetch(MENU_URL);
        if (res.ok) {
            const re = await res.text();
            menu.innerHTML = re;
            return;
        }
        console.log("nao carregado");
        return;
    } catch (e) {
        console.log("erro ao tentar pegar o menu");
        return;
    }
};
//funcao que import o load na pasta uitl
const getLoad = async () => {
    try {
        const res = await fetch(LOAD_URL);
        if (res.ok) {
            const re = await res.text();
            load.innerHTML = re;
            return;
        }
        console.log("nao carregado load");
        return;
    } catch (e) {
        console.log("erro ao tentar pegar o load");
        return;
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
    nome.value = "";
    telefone.value = "";
    motivo.selectedIndex = 0;
    mensagem.value = "";
    resetarBotao();
};

const resetarBotao = () => {
    btn.innerText = "enviar";
    btn.disabled = false;
};

// --- EVENTO PRINCIPAL ---

formulario.addEventListener("submit", e => {
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
        tel: telefone.value,
        motivo: motivo.value,
        descricao: mensagem.value.trim()
    };

    btn.innerText = "enviando...";
    btn.disabled = true;
    // colocando o load na tela
    load.style.display = "flex";
    enviarReclamacao(data);
});
getMenu();
getLoad();
