function adicionarContato() {
  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let telefone = document.getElementById("telefone").value;
  let categoria = document.getElementById("categoria").value;

  let table = document.getElementById("result-contacts").getElementsByTagName('tbody')[0];
  let newRow = table.insertRow(table.rows.length);
  
  let cell1 = newRow.insertCell(0);
  cell1.textContent = nome;
  
  let cell2 = newRow.insertCell(1);
  cell2.textContent = email;
  
  let cell3 = newRow.insertCell(2);
  cell3.textContent = telefone;
  
  let cell4 = newRow.insertCell(3);
  cell4.textContent = categoria;
  
  let cell5 = newRow.insertCell(4);
  cell5.innerHTML = '<i class="fa fa-trash" onclick="excluirContato(this)"></i>' + 
      ' <i class="fa fa-pencil" onclick="editarContato(this)"></i>';
  
  // Limpar o formulário após adicionar o contato
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("categoria").value = "";
}

function excluirContato(icon) {
  var confirmation = confirm("Tem certeza de que deseja excluir este contato?");
  if (confirmation) {
      var row = icon.parentNode.parentNode;
      row.parentNode.removeChild(row);
  }
}

function editarContato(icon) {
    var row = icon.parentNode.parentNode;
    
    // Obtenha os valores atuais dos campos
    var nome = row.getElementsByTagName("td")[0].textContent;
    var email = row.getElementsByTagName("td")[1].textContent;
    var telefone = row.getElementsByTagName("td")[2].textContent;
    var categoria = row.getElementsByTagName("td")[3].textContent;
    
    // Abra um modal de edição
    var modal = document.getElementById("register-contacts");
    var nomeInput = modal.querySelector("nome");
    var emailInput = modal.querySelector("email");
    var telefoneInput = modal.querySelector("telefone");
    var categoriaInput = modal.querySelector("categoria");
    
    // Preencha os campos do modal com os valores atuais
    nomeInput.value = nome;
    emailInput.value = email;
    telefoneInput.value = telefone;
    categoriaInput.value = categoria;
    
    // Defina uma função de salvamento para aplicar as alterações
    var salvarBotao = modal.querySelector("#salvar-edicao");
    salvarBotao.onclick = function() {
      // Obtenha os novos valores dos campos do modal
      var novoNome = nomeInput.value;
      var novoEmail = emailInput.value;
      var novoTelefone = telefoneInput.value;
      var novaCategoria = categoriaInput.value;
      
      // Atualize os valores na linha da tabela
      row.getElementsByTagName("td")[0].textContent = novoNome;
      row.getElementsByTagName("td")[1].textContent = novoEmail;
      row.getElementsByTagName("td")[2].textContent = novoTelefone;
      row.getElementsByTagName("td")[3].textContent = novaCategoria;
      
      // Feche o modal
      modal.style.display = "none";
    };
    
    // Abra o modal de edição
    modal.style.display = "block";
  }
  

function pesquisarContato() {
  var pesquisa = document.getElementById("pesquisa").value.toLowerCase();
  var table = document.getElementById("result-contacts").getElementsByTagName('tbody')[0];
  var rows = table.getElementsByTagName("tr");
  
  for (var i = 0; i < rows.length; i++) {
      var nome = rows[i].getElementsByTagName("td")[0].textContent.toLowerCase();
      if (nome.includes(pesquisa)) {
          rows[i].style.display = "";
      } else {
          rows[i].style.display = "none";
      }
        // Fazer uma solicitação POST ao backend com os dados
  fetch('http://localhost:3000/contatos/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => { 
      console.log(response)

      if (!response.ok) {
        throw new Error('Não foi possível adicionar o contato no servidor.');
      }
      return response.json(); // Se o servidor retorna uma resposta JSON, você pode processá-la aqui
    })
    .then(data => {
      // Faça algo com a resposta do backend, se necessário
    })
    .catch(error => {
      // Trata erros, como falha na solicitação ou processamento de dados
      console.error(error);
    });
  }
}