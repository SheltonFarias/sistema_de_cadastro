document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("contact-form");
  const tableBody = document.querySelector("#contatos tbody");
  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const telefoneInput = document.getElementById("telefone");
  const categoriaInput = document.getElementById("categoria");

  form.addEventListener("submit", function(event) {
      event.preventDefault();

      const nome = nomeInput.value;
      const email = emailInput.value;
      const telefone = telefoneInput.value;
      const categoria = categoriaInput.value;

      // Verifique se os campos não estão vazios
      if (nome.trim() === "" || email.trim() === "" || telefone.trim() === "") {
          alert("Por favor, preencha todos os campos.");
          return;
      }

      // Adicione uma nova linha à tabela
      const newRow = tableBody.insertRow();
      newRow.innerHTML = `
          <td>${nome}</td>
          <td>${email}</td>
          <td>${telefone}</td>
          <td>${categoria}</td>
      `;

      // Limpe os campos do formulário
      nomeInput.value = "";
      emailInput.value = "";
      telefoneInput.value = "";
      categoriaInput.value = "Amigos";
  });
});