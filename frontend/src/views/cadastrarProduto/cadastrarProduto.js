let nextId = 5;

let fCatSelected   = "";
let editCatSelected = "";
let editingId      = null;
let deletingId     = null;

let mainImgData  = "";
let editImgData  = "";
const navBar = document.querySelector(".nav");
const MENU_URL = "../../util/menu_admin.html";

/* ── HELPERS ── */
function toast(msg, type = "success") {
  const wrap = document.getElementById("toastWrap");
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 2700);
}

function genId() { return nextId++; }

function fmtPrice(v) { return `${Number(v).toFixed(2)}Kz`; }

/* ── RENDER DROPDOWN ── */
function buildCatOptions(ulEl, boxEl, labelEl, selectedRef, onSelect) {
  ulEl.innerHTML = "";
  categories.forEach(cat => {
    const li = document.createElement("li");
    li.textContent = cat;
    li.addEventListener("click", () => {
      onSelect(cat);
      labelEl.textContent = cat;
      boxEl.classList.remove("open");
      ulEl.classList.remove("visible");
    });
    ulEl.appendChild(li);
  });
  const addLi = document.createElement("li");
  addLi.textContent = "+ add categoria";
  addLi.className = "add-cat";
  addLi.addEventListener("click", () => {
    ulEl.classList.remove("visible");
    boxEl.classList.remove("open");
    openCatModal();
  });
  ulEl.appendChild(addLi);
}

function setupSelect(boxEl, ulEl, labelEl, getSelected, setSelected) {
  boxEl.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = ulEl.classList.contains("visible");
    closeAllDropdowns();
    if (!isOpen) {
      buildCatOptions(ulEl, boxEl, labelEl, getSelected(), setSelected);
      ulEl.classList.add("visible");
      boxEl.classList.add("open");
    }
  });
}

function closeAllDropdowns() {
  document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("visible"));
  document.querySelectorAll(".sel-box").forEach(b => b.classList.remove("open"));
  document.querySelectorAll(".ctx-menu").forEach(m => m.classList.remove("visible"));
}
document.addEventListener("click", closeAllDropdowns);

/* ── MAIN FORM SELECT ── */
const fCatBox  = document.getElementById("fCatBox");
const fCatDrop = document.getElementById("fCatDropdown");
const fCatLbl  = document.getElementById("fCatLabel");
setupSelect(fCatBox, fCatDrop, fCatLbl, () => fCatSelected, v => fCatSelected = v);

/* ── selecionar categoria (editar) ── */
const editCatBox  = document.getElementById("editCatBox");
const editCatDrop = document.getElementById("editCatDropdown");
const editCatLbl  = document.getElementById("editCatLabel");
setupSelect(editCatBox, editCatDrop, editCatLbl, () => editCatSelected, v => editCatSelected = v);

/* ── inserir imagem ── */
document.getElementById("mainImgInput").addEventListener("change", function() {
  const file = this.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    mainImgData = e.target.result;
    const preview = document.getElementById("mainImgPreview");
    const placeholder = document.getElementById("mainImgPlaceholder");
    preview.src = mainImgData;
    preview.style.display = "block";
    placeholder.style.display = "none";
  };
  reader.readAsDataURL(file);
});

/* ── adicionar produto ── */
document.getElementById("btnAdd").addEventListener("click", () => {
  const name  = document.getElementById("fNome").value.trim();
  const desc  = document.getElementById("fDesc").value.trim();
  const price = parseFloat(document.getElementById("fPreco").value);
  const cat   = fCatSelected;

  if (!name)  { toast("Informe o nome do produto.", "error"); return; }
  if (!cat)   { toast("Selecione uma categoria.", "error"); return; }
  if (isNaN(price) || price < 0) { toast("Informe um preço válido.", "error"); return; }

  products.push({ id: genId(), name, category: cat, desc, price, img: mainImgData });
  renderGrid();
  toast("Produto adicionado!");

  // reset form
  document.getElementById("fNome").value  = "";
  document.getElementById("fDesc").value  = "";
  document.getElementById("fPreco").value = "";
  fCatSelected = "";
  fCatLbl.textContent = "selecionar categoria";
  mainImgData = "";
  const preview = document.getElementById("mainImgPreview");
  preview.src = ""; preview.style.display = "none";
  document.getElementById("mainImgPlaceholder").style.display = "flex";
  document.getElementById("mainImgInput").value = "";
});

/* ── RENDER GRID ── */
function renderGrid() {
  const grid = document.getElementById("prodGrid");
  grid.innerHTML = "";

  if (products.length === 0) {
    grid.innerHTML = `<div class="empty">
      <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>
      <p>Nenhum produto cadastrado ainda.</p>
    </div>`;
    return;
  }

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "prod-card";
    card.dataset.id = p.id;

    const imgSrc = p

    card.innerHTML = `
      <img class="prod-img" src="${imgSrc}" alt="${p.name}" onerror="this.src='https://placehold.co/72x72/FDE8D4/F47B20?text=🍔'"/>
      <div class="prod-info">
        <div class="prod-name">${p.name}</div>
        <div class="prod-desc">${p.desc || "—"}</div>
        <div class="prod-price">${fmtPrice(p.price)}</div>
        <div style="margin-top:6px;position:relative;">
          <div class="cat-badge" data-pid="${p.id}">
            <span class="cat-badge-label">${p.category || "sem categoria"}</span>
            <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
            <ul class="dropdown cat-inline-drop" id="catDrop_${p.id}"></ul>
          </div>
        </div>
      </div>
      <div style="position:relative;align-self:flex-start;">
        <button class="menu-btn" data-pid="${p.id}">•••</button>
        <div class="ctx-menu" id="ctx_${p.id}">
          <button class="edit-btn" data-pid="${p.id}">Editar</button>
          <button class="danger del-btn" data-pid="${p.id}">Excluir</button>
        </div>
      </div>
    `;
    grid.appendChild(card);

    // card category inline dropdown
    const badge = card.querySelector(".cat-badge");
    const badgeDrop = card.querySelector(`#catDrop_${p.id}`);
    badge.addEventListener("click", e => {
      e.stopPropagation();
      const isOpen = badgeDrop.classList.contains("visible");
      closeAllDropdowns();
      if (!isOpen) {
        badgeDrop.innerHTML = "";
        categories.forEach(cat => {
          const li = document.createElement("li");
          li.textContent = cat;
          li.addEventListener("click", () => {
            const prod = products.find(x => x.id == p.id);
            if (prod) prod.category = cat;
            badge.querySelector(".cat-badge-label").textContent = cat;
            badgeDrop.classList.remove("visible");
            toast("Categoria atualizada!");
          });
          badgeDrop.appendChild(li);
        });
        const addLi = document.createElement("li");
        addLi.textContent = "+ add categoria";
        addLi.className = "add-cat";
        addLi.addEventListener("click", () => { badgeDrop.classList.remove("visible"); openCatModal(); });
        badgeDrop.appendChild(addLi);
        badgeDrop.classList.add("visible");
      }
    });

    // ⋯ menu
    const menuBtn = card.querySelector(".menu-btn");
    const ctxMenu = card.querySelector(`#ctx_${p.id}`);
    menuBtn.addEventListener("click", e => {
      e.stopPropagation();
      const isOpen = ctxMenu.classList.contains("visible");
      closeAllDropdowns();
      if (!isOpen) ctxMenu.classList.add("visible");
    });

    card.querySelector(".edit-btn").addEventListener("click", e => { e.stopPropagation(); openEditModal(p.id); });
    card.querySelector(".del-btn").addEventListener("click",  e => { e.stopPropagation(); openDelModal(p.id);  });
  });
}

/* ── editar produto modal ── */
function openEditModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  editingId = id;
  editImgData = p.img || "";

  document.getElementById("editNome").value  = p.name;
  document.getElementById("editDesc").value  = p.desc;
  document.getElementById("editPreco").value = p.price;
  editCatSelected = p.category;
  editCatLbl.textContent = p.category || "selecionar categoria";

  const prev = document.getElementById("editImgPreview");
  if (p.img) { prev.src = p.img; prev.style.display = "block"; }
  else        { prev.style.display = "none"; }

  document.getElementById("editImgUploadPreview").style.display = "none";
  document.getElementById("editImgPlaceholder").style.display = "flex";

  document.getElementById("editOverlay").classList.add("visible");
}
document.getElementById("editCancel").addEventListener("click", () => {
  document.getElementById("editOverlay").classList.remove("visible");
  editingId = null; editImgData = "";
  document.getElementById("editImgInput").value = "";
});
document.getElementById("editSave").addEventListener("click", () => {
  const name  = document.getElementById("editNome").value.trim();
  const desc  = document.getElementById("editDesc").value.trim();
  const price = parseFloat(document.getElementById("editPreco").value);
  const cat   = editCatSelected;

  if (!name)  { toast("Informe o nome.", "error"); return; }
  if (!cat)   { toast("Selecione a categoria.", "error"); return; }
  if (isNaN(price) || price < 0) { toast("Preço inválido.", "error"); return; }

  const prod = products.find(x => x.id === editingId);
  if (prod) { prod.name = name; prod.desc = desc; prod.price = price; prod.category = cat; if (editImgData) prod.img = editImgData; }
  renderGrid();
  toast("Produto atualizado!");
  document.getElementById("editOverlay").classList.remove("visible");
  editingId = null; editImgData = "";
  document.getElementById("editImgInput").value = "";
});

// editar produto modal - imagem upload
document.getElementById("editImgInput").addEventListener("change", function() {
  const file = this.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    editImgData = e.target.result;
    const up = document.getElementById("editImgUploadPreview");
    up.src = editImgData; up.style.display = "block";
    document.getElementById("editImgPlaceholder").style.display = "none";
    document.getElementById("editImgPreview").style.display = "none";
  };
  reader.readAsDataURL(file);
});

/* ── excluir produto modal ── */
function openDelModal(id) {
  deletingId = id;
  document.getElementById("delOverlay").classList.add("visible");
}
document.getElementById("delCancel").addEventListener("click", () => {
  document.getElementById("delOverlay").classList.remove("visible");
  deletingId = null;
});
document.getElementById("delConfirm").addEventListener("click", () => {
  products = products.filter(x => x.id !== deletingId);
  renderGrid();
  toast("Produto excluído.", "error");
  document.getElementById("delOverlay").classList.remove("visible");
  deletingId = null;
});

/* ── nova categoria modal ── */
function openCatModal() {
  document.getElementById("newCatName").value = "";
  document.getElementById("catOverlay").classList.add("visible");
}
document.getElementById("catCancel").addEventListener("click", () => {
  document.getElementById("catOverlay").classList.remove("visible");
});
document.getElementById("catSave").addEventListener("click", () => {
  const name = document.getElementById("newCatName").value.trim();
  if (!name) { toast("Informe o nome da categoria.", "error"); return; }
  if (categories.includes(name)) { toast("Categoria já existe.", "error"); return; }
  categories.push(name);
  toast(`Categoria "${name}" adicionada!`);
  document.getElementById("catOverlay").classList.remove("visible");
});

/* ── fechar overlays ao clicar no fundo ── */
["editOverlay","delOverlay","catOverlay"].forEach(id => {
  document.getElementById(id).addEventListener("click", function(e) {
    if (e.target === this) this.classList.remove("visible");
  });
});

//funcao que import o menu admin na pasta uitl
const getMenuAdmin = async () => {
    try {
        const res = await fetch(MENU_URL);
        if (res.ok) {
            const re = await res.text();
           // menu.innerHTML = re;
           console.log(re)
            return;
        }
        console.log("nao carregado");
        return;
    } catch (e) {
        console.log("erro ao tentar pegar o menu");
        return;
    }
};

/* ── INIT ── */
renderGrid();