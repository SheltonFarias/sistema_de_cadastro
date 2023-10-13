function adicionarContato() {
  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let telefone = document.getElementById("telefone").value;
  let categoria = document.getElementById("categoria").value; // Obtém a categoria

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
    ' <i class="fa fa-pencil" onclick="editarContato(this)"></i';

  // Limpar o formulário após adicionar o contato
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("categoria").value = "";

  // Construa o objeto de dados a ser enviado com a solicitação POST
  const data = {
    name: nome,
    email: email,
    phone: telefone,
    category_id: categoria,
  };

  fetch('http://localhost:3000/contatos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      atualizarTabelaComContatos();
    })
    .catch((error) => {
      console.error('Erro ao adicionar contato:', error);
    });

  
}


function excluirContato(icon) {
  var confirmation = confirm("Tem certeza de que deseja excluir este contato?");
  if (confirmation) {
    var row = icon.parentNode.parentNode;

    fetch('http://localhost:3000/contatos/30' , {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro ao excluir contato');
        }
      })
      .then((data) => {
        console.log('Contato excluído com sucesso:', data);
        // Remova a linha da tabela após a exclusão bem-sucedida.
        row.parentNode.removeChild(row);
      })
      .catch((error) => {
        console.error('Erro ao excluir contato:', error);
      });
  }
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
  }
}

// Atualize a função editarContato para preencher o formulário de registro com os dados do contato selecionado
function editarContato(icon) {
  let row = icon.parentNode.parentNode;

  let nome = row.getElementsByTagName("td")[0].textContent;
  let email = row.getElementsByTagName("td")[1].textContent;
  let telefone = row.getElementsByTagName("td")[2].textContent;
  let categoria = row.getElementsByTagName("td")[3].textContent;
    
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

  // Construa o objeto de dados a ser enviado com a solicitação PUT
  const data = {
    name: nome,
    email: email,
    phone: telefone,
    category_id: categoria,
  };

  fetch('http://localhost:3000/contatos/28' , {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Erro ao atualizar contato');
      }
    })
    .then((data) => {
      console.log(data);

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
    })
    .catch((error) => {
      console.error('Erro ao atualizar contato:', error);
    });
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
    cell4.textContent = contato.category_id;

    let cell5 = newRow.insertCell(4);
    cell5.innerHTML = '<i class="fa fa-trash" onclick="excluirContato(this)"></i>' +
      ' <i class="fa fa-pencil" onclick="editarContato(this)"></i>';
  });
}


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

window.addEventListener('load', atualizarTabelaComContatos);

