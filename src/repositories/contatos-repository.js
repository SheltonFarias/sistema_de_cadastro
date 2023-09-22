const { query } = require('../database');

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
deletecontatos,
updatecontatos,
}
     