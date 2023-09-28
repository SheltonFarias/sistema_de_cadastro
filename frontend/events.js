
function adicionarContato() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const categoria = document.getElementById("categoria").value;

    const table = document.getElementById("contatos-table").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.rows.length);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const acell4 = newRow.insertCell(3);
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
    const pesquisa = document.getElementById("pesquisa").value.toLowerCase();
    const table = document.getElementById("contatos-table").getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName("tr");
    
    for (var i = 0; i < rows.length; i++) {
        let cell = rows[i].getElementsByTagName("td")[0];
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