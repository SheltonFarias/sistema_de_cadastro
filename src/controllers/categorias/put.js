const { query } = require('../../database');

async function  putcat(req, res)  {
    try {
      const { id } = req.params;
      const {name} = req.body;
  
      if (!name) {
        return res.status(400).json({ error: 'Nome, email e telefone são obrigatórios.' });
      }
      const sql = 'UPDATE categorias SET name = $1 WHERE id = $2 RETURNING *';
      const values = [name, id];
      const result = await query(sql, values);
      res.status(200).json(result[0]);
    } catch (error) {
      console.error('Erro ao atualizar registro:', error);
      res.status(500).json({ error: 'Erro ao atualizar registro' });
    }
  };

  module.exports = putcat