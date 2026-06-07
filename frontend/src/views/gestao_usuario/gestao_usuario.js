const URL_BASE = "http://localhost:3000"

let funcionarios = [];
let usuarios = {};
let idFunEditando = null;
let idFunDel = null;

const getFuncionario = async()=>{
  try{
    const response = await fetch(URL_BASE+"/funcionario/listar")
    if (response.ok){
      const res = await response.json()
      funcionarios = res.map(f => ({
        id_fun: String(f.id_fun || f.id),
        nome: f.nome,
        bilhete: String(f.bilhete || f.bi),
        tel: String(f.tel || f.telefone)
      }));
      await getUsuarios();
      renderizar(funcionarios)
    }
  }catch(e){
    console.log('Deu ruim ao buscar funcionários no servidor', e)
  }
}

const getUsuarios = async()=>{
  try{
    const response = await fetch(`${URL_BASE}/usuario/listar`)
    if (response.ok){
      const res = await response.json()
      usuarios = res.reduce((acc, u) => {
        acc[String(u.id_funcionario || u.id_fun)] = {
          id_usuario: u.id || u.id_usuario, // Guarda o ID do usuário também se precisar
          username: u.username,
          perfil: u.perfil
        };
        return acc;
      }, {});
    }
  }catch(e){
    console.log('Erro ao buscar usuários', e)
  }
}

// Cadastra/Atualiza usuario no banco usando o ID do funcionário
const postUsuario = async(idFuncionario, data)=>{
  try{
    const response = await fetch(`${URL_BASE}/usuario/cadastrar/${idFuncionario}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    if (response.ok){
      toast('Conta salva com sucesso!', 'ok');
      await getFuncionario();
      return true;
    } else {
      const erro = await response.json();
      toast(erro.message || 'Erro ao salvar conta', 'erro');
      return false;
    }
  }catch(e){
    console.log('erro ao salvar usuário', e)
    toast('Erro de conexão com servidor', 'erro')
    return false;
  }
}

// Nova função: apaga usuário no banco pelo ID do funcionário
const deletarUsuario = async(idFuncionario)=>{
  try{
    const response = await fetch(`${URL_BASE}/usuario/deletar/${idFuncionario}`, {
      method: "DELETE"
    });
    console.log(response.status)

    if (response.ok){
      toast('Conta eliminada com sucesso!', 'ok');
      await getFuncionario(); // Recarrega tudo pra atualizar a tabela
      return true;
    } else {
      const erro = await response.json();
      toast(erro.message || 'Erro ao eliminar conta', 'erro');
      return false;
    }
  }catch(e){
    console.log('erro tentando deletar usuário', e)
    toast('Erro de conexão com servidor', 'erro')
    return false;
  }
}

function renderizar(lista) {
  const tbody = document.getElementById('tbody');
  const vazio = document.getElementById('vazio');
  document.getElementById('totalCount').textContent = lista.length;

  if (!lista.length) {
    tbody.innerHTML = '';
    vazio.style.display = 'block';
    return;
  }
  vazio.style.display = 'none';

  const ini = n => n? n[0].toUpperCase(): '?';

  tbody.innerHTML = lista.map(f => {
    const u = usuarios[f.id_fun];
    const tem =!!u;

    const badgeClass =!tem? 'sem-conta': u.perfil;
    const badgeTxt =!tem? 'Sem conta': (u.perfil === 'admin'? 'Admin': 'Funcionário');
    const usernameTxt = tem? u.username: '—';

    const btns = tem
 ? `<button class="btn-sm btn-editar" onclick="abrirEditar('${f.id_fun}')">✏️ Editar</button>
       <button class="btn-sm btn-del" onclick="pedirDel('${f.id_fun}')">🗑 Eliminar</button>`
    : `<button class="btn-sm btn-criar" onclick="abrirCriar('${f.id_fun}')">➕ Criar conta</button>`;

    return `<tr>
      <td data-label="Funcionário">
        <div class="celula-nome">
          <div class="av">${ini(f.nome)}</div>
          <div>
            <div style="font-weight:700">${f.nome}</div>
            <div style="font-size:.72rem;color:var(--cinza-txt)">${f.id_fun}</div>
          </div>
        </div>
      </td>
      <td data-label="BI">${f.bilhete}</td>
      <td data-label="Telefone">${f.tel}</td>
      <td data-label="Username">${usernameTxt}</td>
      <td data-label="Perfil"><span class="badge ${badgeClass}">${badgeTxt}</span></td>
      <td data-label="Acções"><div class="acoes">${btns}</div></td>
    </tr>`;
  }).join('');
}

function filtrarTabela() {
  const termo = document.getElementById('busca').value.toLowerCase();
  const perfil = document.getElementById('filtroPerfil').value;

  let lista = funcionarios.filter(f => {
    const u = usuarios[f.id_fun];
    const txt = `${f.nome} ${f.bilhete} ${f.tel} ${u? u.username: ''}`.toLowerCase();
    const ok1 =!termo || txt.includes(termo);

    let ok2 = true;
    if (perfil === 'sem-conta') ok2 =!u;
    else if (perfil) ok2 = u && u.perfil === perfil;

    return ok1 && ok2;
  });

  renderizar(lista);
}

function abrirCriar(id) {
  idFunEditando = String(id);
  const f = funcionarios.find(x => x.id_fun === idFunEditando);

  if (!f) {
    toast('Funcionário não encontrado!', 'erro');
    return;
  }

  document.getElementById('modalTitulo').textContent = 'Criar Conta de Usuário';
  document.getElementById('labelSenha').textContent = 'Senha';
  document.getElementById('infoFun').innerHTML =
    `<strong>Funcionário:</strong> ${f.nome}<br>
     <strong>BI:</strong> ${f.bilhete} &nbsp;|&nbsp; <strong>Tel:</strong> ${f.tel}`;
  document.getElementById('fUser').value = '';
  document.getElementById('fSenha').value = '';
  document.getElementById('fPerfil').value = 'funcionario';
  limparInv();
  abrir('ovForm');
}

function abrirEditar(id) {
  idFunEditando = String(id);
  const f = funcionarios.find(x => x.id_fun === idFunEditando);
  const u = usuarios[idFunEditando];

  if (!f ||!u) {
    toast('Funcionário ou usuário não encontrado!', 'erro');
    return;
  }

  document.getElementById('modalTitulo').textContent = 'Editar Usuário';
  document.getElementById('labelSenha').textContent = 'Nova senha (deixe em branco para não alterar)';
  document.getElementById('infoFun').innerHTML =
    `<strong>Funcionário:</strong> ${f.nome}<br>
     <strong>BI:</strong> ${f.bilhete} &nbsp;|&nbsp; <strong>Tel:</strong> ${f.tel}`;
  document.getElementById('fUser').value = u.username;
  document.getElementById('fSenha').value = '';
  document.getElementById('fPerfil').value = u.perfil;
  limparInv();
  abrir('ovForm');
}

async function guardarUsuario() {
  const user = document.getElementById('fUser').value.trim();
  const senha = document.getElementById('fSenha').value;
  const perfil = document.getElementById('fPerfil').value;
  const editando =!!usuarios[idFunEditando];
  let valido = true;

  const elUser = document.getElementById('fUser');
  if (!user) { elUser.classList.add('inv'); valido = false; }
  else elUser.classList.remove('inv');

  const elSenha = document.getElementById('fSenha');
  if (!editando && senha.length < 6) {
    elSenha.classList.add('inv');
    valido = false;
  } else if (editando && senha && senha.length < 6) {
    elSenha.classList.add('inv');
    valido = false;
  } else elSenha.classList.remove('inv');

  if (!valido) return;

  const data = {
    username: user,
    perfil: perfil
  };

  if (senha) data.senha = senha;

  const sucesso = await postUsuario(idFunEditando, data);

  if (sucesso) {
    fechar('ovForm');
  }
}

function pedirDel(id) {
  idFunDel = String(id); // Pega o ID do funcionário
  const f = funcionarios.find(x => x.id_fun === idFunDel);
  const u = usuarios[idFunDel];

  if (!u) {
    toast('Usuário não encontrado!', 'erro');
    return;
  }

  document.getElementById('txtDel').textContent =
    `Vai eliminar a conta de "${u.username}" (${f.nome}). Esta acção não pode ser revertida.`;
  abrir('ovDel');
}

// Apaga de vez o usuário usando a nova função
async function confirmarDel() {
  if (!idFunDel) return;

  // Chama a função que apaga no banco
  const sucesso = await deletarUsuario(idFunDel);

  if (sucesso) {
    idFunDel = null;
    fechar('ovDel');
  }
}

function abrir(id) { document.getElementById(id).classList.add('aberto'); }
function fechar(id) { document.getElementById(id).classList.remove('aberto'); }
function fecharSeFundo(e, id) { if (e.target === document.getElementById(id)) fechar(id); }
function limparInv() {
  ['fUser', 'fSenha'].forEach(i => document.getElementById(i).classList.remove('inv'));
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { fechar('ovForm'); fechar('ovDel'); }
});

let _tt;
function toast(msg, tipo = 'ok') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = `toast v ${tipo}`;
  clearTimeout(_tt);
  _tt = setTimeout(() => el.classList.remove('v'), 3200);
}

getFuncionario()