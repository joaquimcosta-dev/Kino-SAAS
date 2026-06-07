let funcionarios = [
    { id_fun:'FUN001', nome:'Ana Luísa Ferreira', bi:'003456789LA041', tel:'923 456 789' },
    { id_fun:'FUN002', nome:'Carlos Mendes',      bi:'006712345LA031', tel:'912 345 678' },
    { id_fun:'FUN003', nome:'Sofia Neto',         bi:'009012345LA021', tel:'934 567 890' },
    { id_fun:'FUN004', nome:'Rui Baptista',       bi:'001122334LA011', tel:'941 234 567' },
  ];

  /* Usuários: indexados por id_fun */
  let usuarios = {
    'FUN001': { username:'ana.ferreira', senha:'***', perfil:'admin'       },
    'FUN002': { username:'carlos.mendes', senha:'***', perfil:'funcionario' },
  };

  /* Controlo de modal */
  let idFunEditando = null;
  let idFunDel      = null;

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     RENDERIZAR TABELA
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
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

    const ini = n => n ? n[0].toUpperCase() : '?';

    tbody.innerHTML = lista.map(f => {
      const u   = usuarios[f.id_fun];
      const tem = !!u;

      const badgeClass = !tem ? 'sem-conta' : u.perfil;
      const badgeTxt   = !tem ? 'Sem conta' : (u.perfil === 'admin' ? 'Admin' : 'Funcionário');
      const usernameTxt = tem ? u.username : '—';

      const btns = tem
        ? `<button class="btn-sm btn-editar" onclick="abrirEditar('${f.id_fun}')">✏️ Editar</button>
           <button class="btn-sm btn-del"    onclick="pedirDel('${f.id_fun}')">🗑 Eliminar</button>`
        : `<button class="btn-sm btn-criar"  onclick="abrirCriar('${f.id_fun}')">➕ Criar conta</button>`;

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
        <td data-label="BI">${f.bi}</td>
        <td data-label="Telefone">${f.tel}</td>
        <td data-label="Username">${usernameTxt}</td>
        <td data-label="Perfil"><span class="badge ${badgeClass}">${badgeTxt}</span></td>
        <td data-label="Acções"><div class="acoes">${btns}</div></td>
      </tr>`;
    }).join('');
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     FILTRAR
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function filtrarTabela() {
    const termo   = document.getElementById('busca').value.toLowerCase();
    const perfil  = document.getElementById('filtroPerfil').value;

    let lista = funcionarios.filter(f => {
      const u   = usuarios[f.id_fun];
      const txt = `${f.nome} ${f.bi} ${f.tel} ${u ? u.username : ''}`.toLowerCase();
      const ok1 = !termo || txt.includes(termo);

      let ok2 = true;
      if (perfil === 'sem-conta') ok2 = !u;
      else if (perfil)            ok2 = u && u.perfil === perfil;

      return ok1 && ok2;
    });

    renderizar(lista);
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     MODAIS
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function abrirCriar(id) {
    idFunEditando = id;
    const f = funcionarios.find(x => x.id_fun === id);
    document.getElementById('modalTitulo').textContent = 'Criar Conta de Usuário';
    document.getElementById('labelSenha').textContent  = 'Senha';
    document.getElementById('infoFun').innerHTML =
      `<strong>Funcionário:</strong> ${f.nome}<br>
       <strong>BI:</strong> ${f.bi} &nbsp;|&nbsp; <strong>Tel:</strong> ${f.tel}`;
    document.getElementById('fUser').value  = '';
    document.getElementById('fSenha').value = '';
    document.getElementById('fPerfil').value= 'funcionario';
    limparInv();
    abrir('ovForm');
  }

  function abrirEditar(id) {
    idFunEditando = id;
    const f = funcionarios.find(x => x.id_fun === id);
    const u = usuarios[id];
    document.getElementById('modalTitulo').textContent = 'Editar Usuário';
    document.getElementById('labelSenha').textContent  = 'Nova senha (deixe em branco para não alterar)';
    document.getElementById('infoFun').innerHTML =
      `<strong>Funcionário:</strong> ${f.nome}<br>
       <strong>BI:</strong> ${f.bi} &nbsp;|&nbsp; <strong>Tel:</strong> ${f.tel}`;
    document.getElementById('fUser').value   = u.username;
    document.getElementById('fSenha').value  = '';
    document.getElementById('fPerfil').value = u.perfil;
    limparInv();
    abrir('ovForm');
  }

  function guardarUsuario() {
    const user   = document.getElementById('fUser').value.trim();
    const senha  = document.getElementById('fSenha').value;
    const perfil = document.getElementById('fPerfil').value;
    const editando = !!usuarios[idFunEditando];
    let valido = true;

    /* Valida username */
    const elUser = document.getElementById('fUser');
    if (!user) { elUser.classList.add('inv'); valido = false; }
    else elUser.classList.remove('inv');

    /* Valida senha: obrigatória na criação; opcional na edição */
    const elSenha = document.getElementById('fSenha');
    if (!editando && senha.length < 6) { elSenha.classList.add('inv'); valido = false; }
    else if (editando && senha && senha.length < 6) { elSenha.classList.add('inv'); valido = false; }
    else elSenha.classList.remove('inv');

    if (!valido) return;

    usuarios[idFunEditando] = {
      username: user,
      senha:    senha || (usuarios[idFunEditando]?.senha ?? '***'),
      perfil,
    };

    fechar('ovForm');
    filtrarTabela();
    toast(editando ? 'Usuário actualizado!' : 'Conta criada com sucesso!', 'ok');
  }

  function pedirDel(id) {
    idFunDel = id;
    const f  = funcionarios.find(x => x.id_fun === id);
    const u  = usuarios[id];
    document.getElementById('txtDel').textContent =
      `Vai eliminar a conta de "${u.username}" (${f.nome}). Esta acção não pode ser revertida.`;
    abrir('ovDel');
  }

  function confirmarDel() {
    const u = usuarios[idFunDel];
    const nome = u.username;
    delete usuarios[idFunDel];
    idFunDel = null;
    fechar('ovDel');
    filtrarTabela();
    toast(`Conta "${nome}" eliminada.`, 'ok');
  }

  /* ── Helpers de modal ── */
  function abrir(id)  { document.getElementById(id).classList.add('aberto'); }
  function fechar(id) { document.getElementById(id).classList.remove('aberto'); }
  function fecharSeFundo(e, id) { if (e.target === document.getElementById(id)) fechar(id); }
  function limparInv() {
    ['fUser','fSenha'].forEach(i => document.getElementById(i).classList.remove('inv'));
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { fechar('ovForm'); fechar('ovDel'); }
  });

  /* Toast */
  let _tt;
  function toast(msg, tipo='ok') {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.className = `toast v ${tipo}`;
    clearTimeout(_tt);
    _tt = setTimeout(() => el.classList.remove('v'), 3200);
  }

  /* ── Render inicial ── */
  renderizar(funcionarios);