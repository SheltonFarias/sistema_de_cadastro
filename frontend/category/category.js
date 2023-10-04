<script>
    function adicionarContato() {
    let nome = document.getElementById("nome").value;
    let categoria = document.getElementById("categoria").value;

    let table = document.getElementById("contatos-table").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.rows.length);
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);

    cell1.innerHTML = nome;
    cell2.innerHTML = categoria;

    // Limpar o formulário após adicionar o contato
    document.getElementById("nome").value = "";
    document.getElementById("categoria").value = "";
}
</script>