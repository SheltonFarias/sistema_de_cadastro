const { query } = require('../../database');

const { showCategorias } = require('../../repositories/categorias-repository.js');

async function get(req, res) {
    try{
     const { name } = req.query;
     
      const categorias = await showCategorias({ name });
   
       return res.json(categorias);
     } catch (error) {
     console.error('Erro ao consultar registro:', error);
     res.status(500).json({ error: 'Erro ao consultar registro' });
    }
  
   };

   module.exports = get