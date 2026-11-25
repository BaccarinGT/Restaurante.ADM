

// =====================================
// AQUI, é o funcionamento do javaScript das duas abas em uma parte só
// =====================================

// =====================================
// 1. RECUPERANDO OS PEDIDOS
// =====================================

let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];


// =====================================
// 2. SELECIONANDO ELEMENTOS DO HTML
// =====================================

const listaPedidos = document.getElementById("lista-pedidos");
const valorTotal = document.getElementById("valor-total");
const pedidoVazio = document.getElementById("pedido-vazio");


// =====================================
// 3. FUNÇÃO PARA EXIBIR OS PEDIDOS
// =====================================

function exibirPedidos() {

    // Verificando se estamos na página de pedidos
    if (!listaPedidos) return;

    // Limpando a lista
    listaPedidos.innerHTML = "";

    // Verificando se existem pedidos
    if (pedidos.length === 0) {

        pedidoVazio.style.display = "block";
        valorTotal.textContent = "0,00";

        return;
    }

    pedidoVazio.style.display = "none";

    let total = 0;

    // Percorrendo os pedidos
    pedidos.forEach((prato, index) => {

        let item = document.createElement("div");
        item.classList.add("item-pedido");

        let nome = document.createElement("h3");
        nome.textContent = prato.nome;

        let preco = document.createElement("p");
        preco.textContent = `R$ ${Number(prato.preco).toFixed(2).replace(".", ",")}`;

        // Criando botão de remover
        let remover = document.createElement("button");
        remover.textContent = "✕";
        remover.classList.add("remover-pedido");

        // Evento de clique
        remover.addEventListener("click", function () {

            pedidos.splice(index, 1);

            localStorage.setItem("pedidos", JSON.stringify(pedidos));

            exibirPedidos();

        });

        item.appendChild(nome);
        item.appendChild(preco);
        item.appendChild(remover);

        listaPedidos.appendChild(item);

        total += Number(prato.preco) * prato.quantidade;

    });

    // Atualizando o valor total
    valorTotal.textContent = total.toFixed(2).replace(".", ",");

}


// =====================================
// 4. ADICIONANDO PRATOS AO PEDIDO
// =====================================

const botoesAdicionar = document.querySelectorAll(".adicionar");

botoesAdicionar.forEach(botao => {

    botao.addEventListener("click", function () {

        // Capturando nome e preço
        let nome = botao.dataset.nome;
        let preco = Number(botao.dataset.preco);

        // Verificando se o prato já existe
        let pratoExistente = pedidos.find(item => item.nome === nome);

        if (pratoExistente) {

            pratoExistente.quantidade++;

        } else {

            let prato = {
                nome: nome,
                preco: preco,
                quantidade: 1
            };

            pedidos.push(prato);

        }

        // Salvando no LocalStorage
        localStorage.setItem("pedidos", JSON.stringify(pedidos));

        // Exibindo no console
        console.log(pedidos);

    });

});

function exibirPedidos() {

    if (!listaPedidos) return;

    listaPedidos.innerHTML = "";

    if (pedidos.length === 0) {

        pedidoVazio.style.display = "block";
        valorTotal.textContent = "0,00";

        return;
    }

    pedidoVazio.style.display = "none";

    let total = 0;

    pedidos.forEach((prato, index) => {

        let item = document.createElement("div");
        item.classList.add("item-pedido");

        // Nome do prato
        let nome = document.createElement("h3");
        nome.textContent = prato.nome;

        // Preço unitário
        let preco = document.createElement("p");
        preco.textContent = `R$ ${Number(prato.preco).toFixed(2).replace(".", ",")}`;

        // Área de quantidade
        let quantidade = document.createElement("div");
        quantidade.classList.add("quantidade-pedido");

        // Botão diminuir
        let diminuir = document.createElement("button");
        diminuir.textContent = "-";

        diminuir.addEventListener("click", function () {

            if (prato.quantidade > 1) {

                prato.quantidade--;

            } else {

                pedidos.splice(index, 1);

            }

            localStorage.setItem("pedidos", JSON.stringify(pedidos));

            exibirPedidos();

        });

        // Número da quantidade
        let numero = document.createElement("span");
        numero.textContent = prato.quantidade;

        // Botão aumentar
        let aumentar = document.createElement("button");
        aumentar.textContent = "+";

        aumentar.addEventListener("click", function () {

            prato.quantidade++;

            localStorage.setItem("pedidos", JSON.stringify(pedidos));

            exibirPedidos();

        });

        // Botão remover
        let remover = document.createElement("button");
        remover.textContent = "✕";
        remover.classList.add("remover-pedido");

        remover.addEventListener("click", function () {

            pedidos.splice(index, 1);

            localStorage.setItem("pedidos", JSON.stringify(pedidos));

            exibirPedidos();

        });

        // Organizando os elementos
        quantidade.appendChild(diminuir);
        quantidade.appendChild(numero);
        quantidade.appendChild(aumentar);

        item.appendChild(nome);
        item.appendChild(preco);
        item.appendChild(quantidade);
        item.appendChild(remover);

        listaPedidos.appendChild(item);

        // Calculando o total
        total += Number(prato.preco) * prato.quantidade;

    });

    valorTotal.textContent = total.toFixed(2).replace(".", ",");

}


// =====================================
// 5. EXECUTANDO A FUNÇÃO
// =====================================

exibirPedidos();

const botaoFinalizar = document.getElementById("finalizar-pedido");

if (botaoFinalizar) {
    botaoFinalizar.addEventListener("click", function () {

        if (pedidos.length === 0) {
            alert("Você ainda não possui pedidos!");
            return;
        }

        pedidos = [];

        localStorage.removeItem("pedidos");

        exibirPedidos();

        alert("Pedido finalizado com sucesso!");
    });
}



