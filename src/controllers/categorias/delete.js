//const { query } = require('../../database')
const {  deleteCategorias } = require('../../repositories/categorias-repository.js')

async function remove(req, res) {
	const { id } = req.params
  
	if (!id) {
		return res.status(400).json({ error: 'Nome, email e telefone são obrigatórios.' })
	}
	try {
		const result = await deleteCategorias(id)
		res.status(200).json(result)
		console.log(result)
	} catch (error) {
		console.error('Erro ao excluir registro:', error)
		res.status(500).json({ error: 'Erro ao excluir registro' })
	}
}

module.exports = remove