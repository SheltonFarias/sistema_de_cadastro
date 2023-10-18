function adicionarCategoria() {
  let nome = document.getElementById("nome").value;
  let table = document.getElementById("result-category").getElementsByTagName('tbody')[0];
  let newRow = table.insertRow(table.rows.length);
 
  let cell1 = newRow.insertCell(0);
  cell1.textContent = nome;
 
  // let cell2 = newRow.insertCell(1);
  // cell2.textContent = categoria;
 
  let cell3 = newRow.insertCell(1);
  cell3.innerHTML = '<i class="fa fa-trash" onclick="excluirCategoria(this)"></i>' +
      ' <i class="fa fa-pencil" onclick="editarCategoria(this)"></i>';
 
  // Limpar o formulário após adicionar o contato
  document.getElementById("nome").value = "";
  // document.getElementById("categoria").value = "";
}


function excluirCategoria(icon) {
  var confirmation = confirm("Tem certeza de que deseja excluir esta categoria?");
  if (confirmation) {
      var row = icon.parentNode.parentNode;
      row.parentNode.removeChild(row);
  }
}


function pesquisarCategoria() {
  var pesquisa = document.getElementById("pesquisa").value.toLowerCase();
  var table = document.getElementById("result-category").getElementsByTagName('tbody')[0];
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

function editarCategoria(icon) {
  var row = icon.parentNode.parentNode;
  
  let nome = row.getElementsByTagName("td")[0].textContent;


  // Passa a edição para o formulario register-category
  document.getElementById("nome").value = nome;


  // muda a funçao do botao de adicionar categorias
  var adicionarBotao = document.querySelector("button[onclick='adicionarCategoria()']");
  adicionarBotao.innerText = "Salvar Edição";
  adicionarBotao.onclick = function () {
    salvarEdicao(row);
  };
}

function salvarEdicao(row) {
  let nome = document.getElementById("nome").value;

  // Atualização dos valores
  row.getElementsByTagName("td")[0].textContent = nome;


  // Limpeza do campo edição
  document.getElementById("nome").value = "";


 //retorna a função do botão para adicionar categorias
  let adicionarBotao = document.querySelector("button[onclick='adicionarCategoria()']");
  adicionarBotao.innerText = "Adicionar Categoria";
  adicionarBotao.onclick = adicionarCategoria();
}

 
function preencherTabelaComContatos(categorias) {
  let table = document.getElementById("result-category").getElementsByTagName('tbody')[0];
  // Limpe a tabela antes de preencher com os novos dados
  table.innerHTML = "";

  categorias.forEach(categoria => {
    let newRow = table.insertRow(table.rows.length);

    let cell1 = newRow.insertCell(0);
    cell1.textContent = categoria.name;

    // let cell2 = newRow.insertCell(1);
    // cell2.textContent = categoria.email;

    // let cell3 = newRow.insertCell(2);
    // cell3.textContent = categoria.phone;

    // let cell4 = newRow.insertCell(3);
    // cell4.textContent = categoria.categoria_nome;

    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = '<i class="fa fa-trash" onclick="excluirContato(this)"></i>' +
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
