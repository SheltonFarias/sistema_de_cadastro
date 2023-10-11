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

  fetch('http://localhost:3000/contatos', {
    method: 'POST',
    headers:{
      'content-type': 'application/json',
    },
    body: {
      name: nome,
      email:email,
      phone: telefone,
      categoria: categoria 
    }
  })
  .then((response) => response.json())
  .then((data) => console.log(data))
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
    
    // Obtenha o nome atual da categoria
    var nome = row.getElementsByTagName("td")[0].textContent;
    
    // Abra o modal de edição
    var modal = document.getElementById("modal-edit");
    var nomeInput = modal.querySelector("#edit-nome");
    
    // Preencha o campo do modal com o valor atual
    nomeInput.value = nome;
    
    var salvarBotao = modal.querySelector("#salvar-edicao");
    salvarBotao.onclick = function () {
      // Obtenha o novo valor do campo do modal
      var novoNome = nomeInput.value;
      
      // Atualize o valor na linha da tabela
      row.getElementsByTagName("td")[0].textContent = novoNome;
      
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
  
  fetch('http://localhost:3000/contatos', {
    method: 'GET',
    headers:{
      'content-type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))

  for (var i = 0; i < rows.length; i++) {
      var nome = rows[i].getElementsByTagName("td")[0].textContent.toLowerCase();
      if (nome.includes(pesquisa)) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
  }
}

// Atualize a função editarContato para preencher o formulário de registro com os dados do contato selecionado
function editarContato(icon) {
  let row = icon.parentNode.parentNode;

  let nome = row.getElementsByTagName("td")[0].textContent;
  let email = row.getElementsByTagName("td")[1].textContent;
  let telefone = row.getElementsByTagName("td")[2].textContent;
  let categoria = row.getElementsByTagName("td")[3].textContent;
    
  fetch('http://localhost:3000/contatos', {
    method: 'PUT',
    headers:{
      'content-type': 'application/json',
    },
    body: {
      name: nome,
      email:email,
      phone: telefone,
      categoria: categoria 
    }
  })
  .then((response) => response.json())
  .then((data) => console.log(data))

  // Passa a edição para o formulario register-contacts
  document.getElementById("nome").value = nome;
  document.getElementById("email").value = email;
  document.getElementById("telefone").value = telefone;
  document.getElementById("categoria").value = categoria;
  
  // Defina a ação do botão "Adicionar Contato" para atualizar o contato em vez de adicionar um novo
  var adicionarBotao = document.querySelector("button[onclick='adicionarContato()']");
  adicionarBotao.innerText = "Salvar Edição";
  adicionarBotao.onclick = function () {
      salvarEdicao(row);
    };
  }
  
  function salvarEdicao(row) {
    let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let telefone = document.getElementById("telefone").value;
  let categoria = document.getElementById("categoria").value;
  
  // Atualize os valores na linha da tabela
  row.getElementsByTagName("td")[0].textContent = nome;
  row.getElementsByTagName("td")[1].textContent = email;
  row.getElementsByTagName("td")[2].textContent = telefone;
  row.getElementsByTagName("td")[3].textContent = categoria;
  
  // Limpeza do campo edição
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("categoria").value = "";
  
  // Retorna a função do botão para adicionar contatos
  let adicionarBotao = document.querySelector("button[onclick='adicionarContato()']");
  adicionarBotao.innerText = "Adicionar Contato";
  adicionarBotao.onclick = adicionarContato;
}

// Função para preencher a tabela com os dados da consulta GET
function preencherTabelaComContatos(contatos) {
  let table = document.getElementById("result-contacts").getElementsByTagName('tbody')[0];
  // Limpe a tabela antes de preencher com os novos dados
  table.innerHTML = "";

  contatos.forEach(contato => {
    let newRow = table.insertRow(table.rows.length);

    let cell1 = newRow.insertCell(0);
    cell1.textContent = contato.name;

    let cell2 = newRow.insertCell(1);
    cell2.textContent = contato.email;

    let cell3 = newRow.insertCell(2);
    cell3.textContent = contato.phone;

    let cell4 = newRow.insertCell(3);
    cell4.textContent = contato.categoria;

    let cell5 = newRow.insertCell(4);
    cell5.innerHTML = '<i class="fa fa-trash" onclick="excluirContato(this)"></i>' +
      ' <i class="fa fa-pencil" onclick="editarContato(this)"></i>';
  });
}

// Função para realizar a consulta GET e preencher a tabela
function atualizarTabelaComContatos() {
  fetch('http://localhost:3000/contatos', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      preencherTabelaComContatos(data); // Preenche a tabela com os dados recebidos
    });
}

// Chame a função para preencher a tabela quando a página for carregada
window.addEventListener('load', atualizarTabelaComContatos);

