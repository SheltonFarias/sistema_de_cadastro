function adicionarCategoria() {
  let nome = document.getElementById("nome").value;

  let table = document.getElementById("resultado-categoria").getElementsByTagName('tbody')[0];
  let newRow = table.insertRow(table.rows.length);

  let cell1 = newRow.insertCell(0);
  cell1.textContent = nome;

  let cell2 = newRow.insertCell(1);
  cell2.innerHTML = '<i class="fa fa-trash" onclick="excluircategoria(this)"></i>' +
    ' <i class="fa fa-pencil" onclick="editarcategoria(this)"></i';

  limparCampos()  
  // Objeto para envio ao solicitar POST
  const data = {
    name: nome,
  };
  fetch('http://localhost:3000/categorias', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      atualizarTabelaComcategorias();
    })
    .catch((error) => {
      console.error('Erro ao adicionar categoria:', error);
      alert('aaaaaaa')
    });
}
// Exclui a Função ao clicar no icone e Confirmar
function excluircategoria(icon) {
  const confirmation = confirm("Tem certeza de que deseja excluir este categoria?");
  if (confirmation) 
  {
    var row = icon.parentNode.parentNode;
    
    // Obtenha o ID do categoria a partir dos dados da linha da tabela
    const categoriaId = row.getAttribute("data-category-id");

    fetch(`http://localhost:3000/categorias/${categoriaId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro ao excluir categoria');
        }
      })
      .then((data) => {
        console.log('categoria excluído com sucesso:', data);
        alert('categoria excluida com sucesso')
        // Remova a linha da tabela após a exclusão bem-sucedida.
        row.parentNode.removeChild(row);
      })
      .catch((error) => {
        console.error('Erro ao excluir categoria:', error);
      });
  }
}

// Pesquisa os categorias com base nos Caracteres infotm
function pesquisarCategoria() {
  const pesquisa = document.getElementById("pesquisa").value.toLowerCase();
  const table = document.getElementById("resultado-categoria").getElementsByTagName('tbody')[0];
  const rows = table.getElementsByTagName("tr");
  
  for (const i = 0; i < rows.length; i++) {
      let nome = rows[i].getElementsByTagName("td")[0].textContent.toLowerCase();
      if (nome.includes(pesquisa)) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
  }
}
// Edita o categoria salvo, retornando ele para o campo de registro de cadastro
function editarcategoria(icon) {
  let row = icon.parentNode.parentNode;

  let nome = row.getElementsByTagName("td")[0].textContent;
    
  // Passa a edição para o formulario register-category
  document.getElementById("nome").value = nome;
  
  // Defina a ação do botão "Adicionar categoria" para atualizar o categoria em vez de adicionar um novo
  const adicionarBotao = document.querySelector("button[onclick='adicionarCategoria()']");
  adicionarBotao.innerText = "Salvar Edição";
  adicionarBotao.onclick = function () {
      salvarEdicao(row);
    };
  }

  // Ao clicar no BOTÂO salvar executa a funçao para salvar a alteração
  function salvarEdicao(row) {
    let nome = document.getElementById("nome").value;
  
    // Fornece o ID atraves da tabela
    const categoriaId = row.getAttribute("data-category-id");
  
    const data = {
      name: nome,
    };
  
    fetch(`http://localhost:3000/categorias/${categoriaId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        console.log(data);
  
        // Libera os campos para atualizar a tabela
        row.getElementsByTagName("td")[0].textContent = nome;
  
        limparCampos()
  
        // Retorna a função do botão para adicionar categorias
        let adicionarBotao = document.querySelector("button[onclick='adicionarCategoria()']");
        adicionarBotao.innerText = "Adicionar categoria";
        adicionarBotao.onclick = adicionarCategoria;
      })
      .catch((error) => {
        console.error('Erro ao atualizar categoria:', error);
      });
  }
  
function preencherTabelaComcategorias(categorias) {
  let table = document.getElementById("resultado-categoria").getElementsByTagName('tbody')[0];
  // Limpe a tabela antes de preencher com os novos dados
  table.innerHTML = "";

  categorias.forEach(categoria => {
    let newRow = table.insertRow(table.rows.length);

    let cell1 = newRow.insertCell(0);
    cell1.textContent = categoria.name;

    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = '<i class="fa fa-trash" onclick="excluircategoria(this)"></i>' +
      ' <i class="fa fa-pencil" onclick="editarcategoria(this)"></i>';
    // Adicione o atributo data-category-id possibilitando a identificação do ID
    newRow.setAttribute("data-category-id", categoria.id);
  });
}
//atualizar
function atualizarTabelaComcategorias() {
  fetch('http://localhost:3000/categorias', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      preencherTabelaComcategorias(data); 
    });
}
// Função de limpar os campos para botão cancelar
function limparCampos() {
  document.getElementById("nome").value = ""; 
}
document.getElementById("cancelar-edicao").addEventListener("click", function() {
  limparCampos();
});
window.addEventListener('load', atualizarTabelaComcategorias);