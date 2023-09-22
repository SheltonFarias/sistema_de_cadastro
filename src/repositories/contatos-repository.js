const { query } = require('../database');

async function showContatos(filters) {
    // Construa a consulta SQL com base no parâmetro 'name'
    const { name } = filters
    
    let sql = 'SELECT * FROM contatos';

    if (name) {
        sql += ' WHERE name LIKE $1';
    }

    // Execute a consulta SQL e passe o parâmetro seguro
    const contatos = await query(sql, name ? [`%${name}%`] : []);

    return contatos;
}

async function createContatos(name) {
    const obj = {
        text: 'INSERT INTO contatos(name) VALUES($1) RETURNING *',
        values: [name]
    }
 // Execute a consulta SQL e passe o parâmetro seguro
    const [contatoCriado] = await query(obj);

    return contatoCriado;
}


async function updatecontatos(name, email, phone, category_id) {

const sql = {
    text: 'UPDATE contatos SET name = $1, email = $2, phone = $3, category_id = $4 WHERE id = $5 RETURNING *',
    values : [name, email, phone, category_id]
}
const [atualizarcontatos] = await query(sql)

return atualizarcontatos;
}


// delete contatos
async function deletecontatos(id)  {

  
const sql = {
    text:'DELETE FROM contatos WHERE id = $1 RETURNING *',
    values : [id]
};
const [deletarcontatos] = await query(sql);
    
 return deletarcontatos;
}
     


module.exports = {
showContatos,
createContatos,
deletecontatos,
updatecontatos,
}
     

