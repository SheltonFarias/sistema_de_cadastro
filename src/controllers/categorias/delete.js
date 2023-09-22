const { query } = require('../../database')
const {  deleteCategorias } = require('../../repositories/categorias-repository.js')

async function remove(req, res) {
	const { id } = req.params
  
	if (!id) {
		return res.status(400).json({ error: 'Nome, email e telefone são obrigatórios.' })
	}
  
	const sql = 'DELETE FROM categorias WHERE id = $1 RETURNING *'
	const values = [id]
	try {
		const remove = deleteCategorias(id)
		const result = await query(sql, values)
		res.status(200).json(result[0])
	} catch (error) {
		console.error('Erro ao excluir registro:', error)
		res.status(500).json({ error: 'Erro ao excluir registro' })
	}
}

module.exports = remove