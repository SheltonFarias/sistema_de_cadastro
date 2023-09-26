const { deletecontatos } = require('../../repositories/contatos-repository')

async function remove(req, res) {
	const { id } = req.params

	if (!id) {
		return res
			.status(400)
			.json({ error: 'Nome, email e telefone são obrigatórios.' })
	}

	try {
		const result = await deletecontatos(id)
		if (!result) {
			res.status(404).json({ error: 'Contato não existente' })
		}
		res.status(200).json(result)
		console.log(result)
	} catch (error) {
		console.error('Erro ao excluir registro:', error)
		res.status(500).json({ error: 'Erro ao excluir registro' })
	}
}

module.exports = remove
