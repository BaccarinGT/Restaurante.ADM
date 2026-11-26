// LOGIN ADMINISTRATIVO

const formulario = document.getElementById("formLogin");

formulario.addEventListener("submit", function(event) {

    // Impede o recarregamento da página
    event.preventDefault();

    // Captura os dados digitados
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    // Dados de acesso para teste
    const emailADM = "admin@gmail.com";
    const senhaADM = "123456";

    // Verifica as informações
    if (email === emailADM && senha === senhaADM) {

        alert("Login realizado com sucesso!");

        // Redireciona para o painel administrativo
        window.location.href = "../../seçãoAdm/index.html";

    } else {

        alert("E-mail ou senha incorretos!");

    }

});