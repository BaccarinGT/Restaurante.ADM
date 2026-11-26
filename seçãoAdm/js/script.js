const botaoTema = document.getElementById("tema");

botaoTema.addEventListener("change", function() {

    document.body.classList.toggle("dark", botaoTema.checked);

});