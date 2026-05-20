document.addEventListener('DOMContentLoaded', () => {
    // Carrega componentes externos (Menu e Rodapé)
    carregarComponentes();

    // Seletores de elementos principais
    const entradaPesquisa = document.getElementById('pesquisaPedido');
    const botoesAba = document.querySelectorAll('.botao-aba');
    const linhasTabela = document.querySelectorAll('#tabelaPedidos tbody tr');
    const itensStatus = document.querySelectorAll('.menu-status li');

    /**
     * Função para carregar Menu e Rodapé da pasta util
     */
    async function carregarComponentes() {
        try {
            // Carrega o Menu
            const resMenu = await fetch('../../util/menu.html');
            const htmlMenu = await resMenu.text();
            // Extrai apenas o conteúdo dentro do body para evitar duplicar tags html/body
            const parser = new DOMParser();
            const docMenu = parser.parseFromString(htmlMenu, 'text/html');
            const cabecalho = docMenu.querySelector('header');
            if (cabecalho) {
                document.getElementById('espaco-menu').appendChild(cabecalho);
            }



            // Carrega o Rodapé
            const resRodape = await fetch('../../util/footer.html');
            const htmlRodape = await resRodape.text();
            const docRodape = parser.parseFromString(htmlRodape, 'text/html');
            const rodape = docRodape.querySelector('footer');
            if (rodape) {
                document.getElementById('espaco-rodape').appendChild(rodape);
            }
        } catch (erro) {
            console.error('Erro ao carregar componentes:', erro);
        }
    }

    /**
     * Lógica de Filtragem por Abas (Entrega, Restaurante, Todos)
     */
    botoesAba.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesAba.forEach(b => b.classList.remove('ativa'));
            botao.classList.add('ativa');

            const filtro = botao.getAttribute('data-filter');

            linhasTabela.forEach(linha => {
                const tipo = linha.getAttribute('data-type');
                const visivel = filtro === 'todos' || tipo === filtro;
                linha.style.display = visivel ? '' : 'none';
            });
        });
    });

    /**
     * Lógica de Pesquisa de Pedidos
     */
    entradaPesquisa.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase();
        
        linhasTabela.forEach(linha => {
            const texto = linha.innerText.toLowerCase();
            linha.style.display = texto.includes(termo) ? '' : 'none';
        });
    });

    /**
     * Lógica de Alteração de Status do Pedido
     */
    itensStatus.forEach(item => {
        item.addEventListener('click', (e) => {
            const novoStatus = e.target.innerText;
            const dropdown = e.target.closest('.dropdown-status');
            const botao = dropdown.querySelector('.botao-status');
            
            // Define a cor do ponto com base no status selecionado
            let corPonto = '#ccc';
            if (novoStatus.includes('Aprovar')) corPonto = '#2ecc71';
            else if (novoStatus.includes('Preparando')) corPonto = '#f39c12';
            else if (novoStatus.includes('Feito')) corPonto = '#3498db';
            else if (novoStatus.includes('Rejeitar')) corPonto = '#e74c3c';

            const temSetaCima = botao.querySelector('.seta-cima');
            
            // Monta o HTML do botão com o ponto colorido, texto e seta
            botao.innerHTML = `
                <span class="ponto-status" style="background-color: ${corPonto}"></span>
                ${novoStatus} 
                <span class="${temSetaCima ? 'seta-cima' : 'seta-baixo'}"></span>
            `;
            
            const menu = dropdown.querySelector('.menu-status');
            menu.style.display = 'none';
            setTimeout(() => menu.style.display = '', 100);
        });
    });
});



