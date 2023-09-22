const { query } = require('../../database')

async function remove(req, res)  {
	const { id } = req.params
  
	if (!id) {
		return res.status(400).json({ error: 'Nome, email e telefone são obrigatórios.' })
	}
  
	const sql = 'DELETE FROM contatos WHERE id = $1 RETURNING *'
	const values = [id]
	try {
		const result = await query(sql, values)
		res.status(200).json(result[0])
	} catch (error) {
		console.error('Erro ao excluir registro:', error)
		res.status(500).json({ error: 'Erro ao excluir registro' })
	}
}

module.exports = remove