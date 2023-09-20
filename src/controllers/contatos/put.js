const { query } = require('../../database');


async function put(req, res) {
    const { id } = req.params;
    const { name, email, phone, category_id} = req.body;
  
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Nome, email e telefone são obrigatórios.' });
    }
    const sql = 'UPDATE contatos SET name = $1, email = $2, phone = $3, category_id = $4 WHERE id = $5 RETURNING *';
    const values = [name, email, phone, category_id, id];
    try {
      const result = await query(sql, values);
      res.status(200).json(result[0]);
    } catch (error) {
      console.error('Erro ao atualizar registro:', error);
      res.status(500).json({ error: 'Erro ao atualizar registro' });
    }
}

  module.exports = put; 