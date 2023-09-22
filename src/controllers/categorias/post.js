const { query } = require('../../database');
const { createCategorias } = require('../../repositories/categorias-repository.js');

async function post(req, res){
    //return query('SELECT * FROM categorias')
    const categorias = req.body;
    
    const { name } = categorias
    
    if (name.length < 2 || !name ) {
      return res.status(400).json({error: 'Nome deve ser obrigatorio, e deve ter no minimo 3 caracteres'})
    }
    try{
      const categoriaCriada = await createCategorias(name);
      console.log(categoriaCriada);
      return res.status(201).json(categoriaCriada)
    }catch(error){
    console.error('Erro ao consultar registro:', error);
      res.status(500).json({ error: 'Erro ao consultar registro' });
    }
  }

  module.exports = post