{/* <script>
// Função para adicionar um novo contato à tabela
function adicionarContato() {
var nome = document.getElementById("nome").value;
var email = document.getElementById("email").value;
var telefone = document.getElementById("telefone").value;
var categoria = document.getElementById("categoria").value;

var table = document.getElementById("contatos-table").getElementsByTagName('tbody')[0];
var newRow = table.insertRow(table.rows.length);
var cell1 = newRow.insertCell(0);
var cell2 = newRow.insertCell(1);
var cell3 = newRow.insertCell(2);
var cell4 = newRow.insertCell(3);
cell1.innerHTML = nome;
cell2.innerHTML = email;
cell3.innerHTML = telefone;
cell4.innerHTML = categoria;

// Limpar o formulário após adicionar o contato
document.getElementById("nome").value = "";
document.getElementById("email").value = "";
document.getElementById("telefone").value = "";
document.getElementById("categoria").value = "";
}

// Função para pesquisar contatos pelo nome
function pesquisarContato() {
var pesquisa = document.getElementById("pesquisa").value.toLowerCase();
var table = document.getElementById("contatos-table").getElementsByTagName('tbody')[0];
var rows = table.getElementsByTagName("tr");

for (var i = 0; i < rows.length; i++) {
  var cell = rows[i].getElementsByTagName("td")[0];
  if (cell) {
      var nome = cell.textContent.toLowerCase();
      if (nome.indexOf(pesquisa) > -1) {
          rows[i].style.display = "";
      } else {
          rows[i].style.display = "none";
      }
  }
}
}

</script> */}