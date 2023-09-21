const { query } = require('../../database');
//chamando a função
const { updateCategorias } = require('../../repositories/categorias-repository.js');

async function put(req, res)  {
    try {
      const { id } = req.params;
      const {name} = req.body;
  
      if (!name) {
        return res.status(400).json({ error: 'Nome, email e telefone são obrigatórios.' });
      }

      const result = updateCategorias(id, name)
      res.status(200).json(result[0]);
    } catch (error) {
      console.error('Erro ao atualizar registro:', error);
      res.status(500).json({ error: 'Erro ao atualizar registro' });
    }
  };

  module.exports = put