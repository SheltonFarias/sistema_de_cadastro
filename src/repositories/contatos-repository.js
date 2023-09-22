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



module.exports = {
    showContatos,
    createContatos,

}