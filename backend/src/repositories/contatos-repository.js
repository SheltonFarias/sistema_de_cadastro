const { query } = require("../database");

async function showContatos(filters) {
  // Construa a consulta SQL com base no parâmetro 'name'
  const { name } = filters;
  let sql = `SELECT contatos.*, categorias.name AS categoria_nome
	FROM contatos
	INNER JOIN categorias ON contatos.category_id = categorias.id;`;
  // Execute a consulta SQL e passe o parâmetro seguro
  const contatos = await query(sql, name ? [`%${name}%`] : []);
  console.log(contatos);
  return contatos;
}
async function createContatos(name, email, formattedPhone, category_id) {
  const obj = {
    text: "INSERT INTO contatos(name, email, phone, category_id) VALUES($1, $2, $3, $4) RETURNING *",
    values: [name, email, formattedPhone, category_id],
  };
  const [contatoCriado] = await query(obj);
  console.log(contatoCriado);
  return contatoCriado;
}
async function updatecontatos(contato) {
  const { name, email, phone, category_id, id } = contato;
  const sql = {
    text: "UPDATE contatos SET name = $1, email = $2, phone = $3, category_id = $4 WHERE id = $5 RETURNING *",
    values: [name, email, phone, category_id, id],
  };
  const [atualizarcontatos] = await query(sql);

  return atualizarcontatos;
}
// delete contatos
async function deletecontatos(id) {
  const sql = {
    text: "DELETE FROM contatos WHERE id = $1 RETURNING *",
    values: [id],
  };
  const [deletarcontatos] = await query(sql);
  return deletarcontatos;
}
module.exports = {
  showContatos,
  createContatos,
  deletecontatos,
  updatecontatos,
};
