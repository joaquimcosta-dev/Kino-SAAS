const URL_BASE = "http://localhost:3000"
/* ── Dados iniciais de exemplo ── */
let funcionarios = [];

/* Índice do funcionário que está a ser editado/eliminado */
let indiceEditando = null;
let indiceEliminar = null;
/* ── Renderiza a tabela com a lista actual ── */
//funcao que pega dados do banco
const getFuncionario = async()=>{
try{
const response = await fetch(URL_BASE+"/funcionario/listar")
if (response.ok){
const res = await response.json()
// passando p array completo no funcionarios
funcionarios = res;
renderizar(funcionarios);
}
}catch(e){
console.log('erro no servidor, tentando listar funcionario', e)
}
}

//funcao para deletat dados do banco
const deleteFuncionario = async(id)=>{
try{
const response = await fetch(`${URL_BASE}/funcionario/deletar/${id}`, {
method: "DELETE",
headers: {
"Content-type": "application/json"
}});
console.log(response.status)
if (response.ok){
getFuncionario();
}
}catch(e){
console.log('erro no servidor, tentando eliminar funcionario', e)
}
}

//funcao que cria novos dados do banco
const postFuncionario = async(data)=>{
try{
const response = await fetch(URL_BASE+"/funcionario/cadastrar", {
method: "POST",
headers: {
"Content-type": "application/json"
},
body: JSON.stringify(data)
});
if (response.ok){
//chamando a funcao get para atualizar a tela
getFuncionario();
return;
}
}catch(e){
console.log('erro no servidor, tentando cadastrar funcionario', e)
}
}

function renderizar(lista) {
const corpo = document.getElementById('corpo');
const vazio = document.getElementById('estadoVazio');
document.getElementById('totalContador').textContent = lista.length;

if (lista.length === 0) {
corpo.innerHTML = '';
vazio.style.display = 'block';
return;
}

vazio.style.display = 'none';

/* Formata data de AAAA-MM-DD para DD/MM/AAAA */
const formatarData = d => {
if (!d) return '—';
const [a, m, dia] = d.split('-');
return `${dia}/${m}/${a}`;
};

/* Gera a inicial para o avatar */
const inicial = nome => nome ? nome.charAt(0).toUpperCase(): '?';

corpo.innerHTML = lista.map((f, i) => `
<tr>
<td data-label="ID"><span class="badge-id">${f.id_fun}</span></td>
<td data-label="Nome">
<div class="celula-nome">
<div class="avatar">${inicial(f.nome)}</div>
${f.nome}
</div>
</td>
<td data-label="BI">${f.bilhete}</td>
<td data-label="Data Nasc.">${formatarData(f.data_nasc)}</td>
<td data-label="Telefone">${f.tel}</td>
<td data-label="Acções">
<div class="acoes">
<button class="btn-editar"   onclick="abrirModalEditar(${i})">
✏️ Editar
</button>
<button class="btn-eliminar" onclick="pedirEliminar(${i},${f.id_fun})">
🗑 Eliminar
</button>
</div>
</td>
</tr>
`).join('');
}


/* ── Filtrar por texto ── */
function filtrar() {
const termo = document.getElementById('campoBusca').value.toLowerCase();
if (!termo) { renderizar(funcionarios); return; }
const filtrados = funcionarios.filter(f =>
f.nome.toLowerCase().includes(termo) ||
f.bilhete.toLowerCase().includes(termo)
);
renderizar(filtrados);
}

/* ── Abrir modal de criação ── */
function abrirModalNovo() {
indiceEditando = null;
document.getElementById('modalTitulo').textContent = 'Novo Funcionário';
limparFormulario();
document.getElementById('fId').removeAttribute('readonly');
document.getElementById('overlayForm').classList.add('aberto');
}

/* ── Abrir modal de edição ── */
function abrirModalEditar(i) {
// Agora 'i' é o índice real no array, não o id_fun
indiceEditando = i;
const f = funcionarios[i];
document.getElementById('modalTitulo').textContent = 'Editar Funcionário';
document.getElementById('fId').value = f.id_fun;
document.getElementById('fId').setAttribute('readonly', true); /* ID não editável */
document.getElementById('fNome').value = f.nome;
document.getElementById('fBi').value = f.bilhete; // 'bilhete' do objeto
document.getElementById('fNasc').value = f.data_nasc;
document.getElementById('fTel').value = f.tel;
limparErros();
document.getElementById('overlayForm').classList.add('aberto');
}

/* ── Guardar (criar ou actualizar) ── */
function guardar() {
/* Valida que todos os campos estão preenchidos */
const campos = [ 'fNome', 'fBi', 'fNasc', 'fTel'];
let valido = true;
campos.forEach(id => {
const el = document.getElementById(id);
if (!el.value.trim()) { el.classList.add('invalido'); valido = false; } else el.classList.remove('invalido');
});
if (!valido) return;

const id_fun = document.getElementById('fId').value.trim();

const novo = {
nome: document.getElementById('fNome').value.trim(),
bilhete: document.getElementById('fBi').value.trim(), // agora 'bilhete', igual ao objeto original
data_nasc: document.getElementById('fNasc').value,
tel: document.getElementById('fTel').value.trim(),
};

if (indiceEditando === null) {
/* Criar: verifica ID duplicado (se o ID for preenchido manualmente) */
if (id_fun && funcionarios.some(f => f.id_fun === id_fun)) {
document.getElementById('fId').classList.add('invalido');
mostrarToast('ID já existe.', 'erro');
return;
}
novo.id_fun = id_fun || null; // se backend gera ID, pode ser null
postFuncionario(novo);
// Adiciona imediatamente na lista local para a UI não depender do backend
funcionarios.push(novo);
mostrarToast('Funcionário criado com sucesso!', 'sucesso');
} else {
/* Actualizar */
novo.id_fun = funcionarios[indiceEditando].id_fun; // preserva o ID original
funcionarios[indiceEditando] = novo;
mostrarToast('Funcionário actualizado!', 'sucesso');
}
fecharModal('overlayForm');
renderizar(funcionarios);
document.getElementById('campoBusca').value = '';
}
/* ── Pedir confirmação de eliminação ── */
function pedirEliminar(i,id) {
  //chamando a funcao para deletar daos no bacnco
  const deletado = deleteFuncionario(id);
  if(!deletado.ok) {
    console.log("Não foi possivel elminar este funcionário")
    return
  }
// Agora 'i' é o índice real
indiceEliminar = i;
document.getElementById('textoConfirmar').textContent =
`Vai eliminar "${funcionarios[i].nome}". Esta acção não pode ser revertida.`;
document.getElementById('overlayEliminar').classList.add('aberto');
}

/* ── Confirmar e executar eliminação ── */
function confirmarEliminar() {
if (indiceEliminar === null) return;
const nome = funcionarios[indiceEliminar].nome;
funcionarios.splice(indiceEliminar, 1);
indiceEliminar = null;
fecharModal('overlayEliminar');
renderizar(funcionarios);
document.getElementById('campoBusca').value = '';
mostrarToast(`"${nome}" eliminado.`, 'sucesso');
}

/* ── Fechar modal ── */
function fecharModal(id) {
document.getElementById(id).classList.remove('aberto');
}

/* Fecha ao clicar fora do modal (no overlay) */
function fecharSeOverlay(e, id) {
if (e.target === document.getElementById(id)) fecharModal(id);
}
/* ── Limpar formulário ── */
function limparFormulario() {
['fId', 'fNome', 'fBi', 'fNasc', 'fTel'].forEach(id => {
document.getElementById(id).value = '';
});
limparErros();
}

function limparErros() {
['fId', 'fNome', 'fBi', 'fNasc', 'fTel'].forEach(id => {
document.getElementById(id).classList.remove('invalido');
});
}

/* ── Toast de feedback ── */
let toastTimer = null;
function mostrarToast(msg, tipo = 'sucesso') {
const t = document.getElementById('toast');
t.textContent = msg;
t.className = `toast visivel ${tipo}`;
clearTimeout(toastTimer);
toastTimer = setTimeout(() => t.classList.remove('visivel'), 3000);
}

/* ── Fechar modal com tecla Escape ── */
document.addEventListener('keydown', e => {
if (e.key === 'Escape') {
fecharModal('overlayForm');
fecharModal('overlayEliminar');
}
});

/* ── Render inicial ── */
getFuncionario();