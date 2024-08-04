const alteracaoTema = document.querySelector(".theme-toggle");
const botaoTema = document.getElementById("theme-icon");
const themeSystem = localStorage.getItem("themeSystem") || "light";

alteracaoTema.addEventListener("click", () => {
  const novoTema = document.body.classList.contains("dark-mode") ? "light" : "dark";
  definicaoItem(novoTema);
});
