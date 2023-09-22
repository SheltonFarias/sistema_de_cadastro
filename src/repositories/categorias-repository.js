const { query } = require('../database')

async function showCategorias(filters) {
	// Construa a consulta SQL com base no parâmetro 'name'
	const { name } = filters
    
	let sql = 'SELECT * FROM categorias'

	if (name) {
		sql += ' WHERE name LIKE $1'
	}

	// Execute a consulta SQL e passe o parâmetro seguro
	const categorias = await query(sql, name ? [`%${name}%`] : [])

	return categorias
}


async function createCategorias(name) {
	const obj = {
		text: 'INSERT INTO categorias(name) VALUES($1) RETURNING *',
		values: [name]
	}

	const [categoriaCriada] = await query(obj)

	return categoriaCriada
}


async function updateCategorias(id,name) { 

	const sql = {
		text: 'UPDATE categorias SET name = $1 WHERE id = $2 RETURNING *',
		values: [name, id]
	}
	const [atualizarCategorias] = await query(sql)

	return atualizarCategorias
}

//Delete
async function deleteCategorias(id) {
	const sql = {
		text: 'DELETE FROM categorias WHERE id = $1 RETURNING *',
		values: [id]
	}

	const [deletarCategoria] = await query(sql)

	return deletarCategoria
}

module.exports = {
	showCategorias,
	createCategorias,
	updateCategorias,
	deleteCategorias,

}