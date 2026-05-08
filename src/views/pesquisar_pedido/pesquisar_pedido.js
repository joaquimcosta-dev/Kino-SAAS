const MENU_URL = "../../util/menu.html";
const FOOTER_URL = "../../util/footer.html";
const menu = document.querySelector(".menu");
const rodape = document.querySelector('.rodape')

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
    console.log("erro ao tentar pegar o menu" +e);
    return;
  }
};

//funcao que import o menu na pasta uitl
const getFooter = async () => {
  try {
    const res = await fetch(FOOTER_URL);
    if (res.ok) {
      const re = await res.text();
      rodape.innerHTML = re;
      return;
    }
    
    console.log("nao carregado");
    return;
  } catch (e) {
    console.log("erro ao tentar pegar o rodape" +e);
    return;
  }
};
//chamando a funcao get menu
getMenu();
getFooter();