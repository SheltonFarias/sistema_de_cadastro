const { query } = require('../../database');
const { updatecontatos } = require('../../repositories/contatos-repository.js');


async function put(req, res) {
  try {
    const { id } = req.params;
    const { name, email, phone, category_id} = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Nome, email e telefone são obrigatórios.' });
    }
      const result = await updatecontatos({ id, name, email, phone, category_id });
      res.status(200).json(result);
    } catch (error) {
      console.error('Erro ao atualizar registro:', error);
      res.status(500).json({ error: 'Erro ao atualizar registro' });
    }
}

  module.exports = put; 