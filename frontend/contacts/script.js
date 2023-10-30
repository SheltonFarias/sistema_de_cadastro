//Adiciona o Contato apos o preenchimento dos campo e clicar no BOTÃO
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
    ' <i class="fa fa-pencil" onclick="editarContato(this)"></i';

  // Limpar o formulário após adicionar o contato
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("categoria").value = "";

  // Objeto para envio ao solicitar POST
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

// Exclui a Função ao clicar no icone e Confirmar
function excluirContato(icon) {
  var confirmation = confirm("Tem certeza de que deseja excluir este contato?");
  if (confirmation) {
    var row = icon.parentNode.parentNode;
    
    // Obtenha o ID do contato a partir dos dados da linha da tabela
    var contatoId = row.getAttribute("data-contact-id");

    fetch(`http://localhost:3000/contatos/${contatoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
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

// Pesquisa os contatos com base nos Caracteres infotm
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

// Edita o contato salvo, retornando ele para o campo de registro de cadastro
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

  // Ao clicar no BOTÂO salvar executa a funçao para salvar a alteração
  function salvarEdicao(row) {
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;
    let categoria = document.getElementById("categoria").value;
  
    // Fornece o ID atraves da tabela
    var contatoId = row.getAttribute("data-contact-id");
  
    const data = {
      name: nome,
      email: email,
      phone: telefone,
      category_id: categoria,
    };
  
    fetch(`http://localhost:3000/contatos/${contatoId}`, {
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
  
        // Libera os campos para atualizar a tabela
        row.getElementsByTagName("td")[0].textContent = nome;
        row.getElementsByTagName("td")[1].textContent = email;
        row.getElementsByTagName("td")[2].textContent = telefone;
        row.getElementsByTagName("td")[3].textContent = categoria;
  
        // limpa os campos pos ediçao
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
    cell4.textContent = contato.categoria_nome;

    let cell5 = newRow.insertCell(4);
    cell5.innerHTML = '<i class="fa fa-trash" onclick="excluirContato(this)"></i>' +
      ' <i class="fa fa-pencil" onclick="editarContato(this)"></i>';

    // Adicione o atributo data-contact-id possibilitando a identificação do ID
    newRow.setAttribute("data-contact-id", contato.id);
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
      preencherTabelaComContatos(data); // repassa os valores recebidos para a tabela
    });
}

window.addEventListener('load', atualizarTabelaComContatos);


function preencherSelectComOpcoes(opcoes) {
  let select = document.getElementById("categoria");
  select.innerHTML = "";
  
  opcoes.forEach(categoria => {
    let option = document.createElement("option");
    option.value = categoria.id;
    option.innerText = categoria.name;

    select.appendChild(option);
  });
}

function atualizarSelectComOpcoes() {
  fetch('http://localhost:3000/categorias', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro na requisição da API');
      }
      return response.json();
    })
    .then((data) => {
      preencherSelectComOpcoes(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

// funçao que limpa os inputs para viculado ao cancelar
function botaoCancelar() {
  document.getElementById("nome").value = ""; 
  document.getElementById("email").value = ""; 
  document.getElementById("telefone").value = ""; 
  document.getElementById("categoria").value = ""; 
}

document.getElementById("cancelar-edicao").addEventListener("click", function() {
  botaoCancelar();
});

window.addEventListener('load', atualizarSelectComOpcoes);
