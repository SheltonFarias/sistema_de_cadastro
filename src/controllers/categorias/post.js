const { query } = require('../../database');

async function postcat(req, res){
    //return query('SELECT * FROM contatos')
    const categorias = req.body;
    
    const { name } = categorias
    
  
    if (name.length < 2 || !name ) {
      return res.status(400).json({error: 'Nome deve ser obrigatorio, e deve ter no minimo 3 caracteres'})
    }
  
    const obj = {
      text: 'INSERT INTO categorias(name) VALUES($1) RETURNING *',
      values: [name]
    }
  try{
    const [categoriaCriada] = await query(obj);
    console.log(categoriaCriada);
    return res.status(201).json(categoriaCriada)
  }catch(error){
   console.error('Erro ao consultar registro:', error);
    res.status(500).json({ error: 'Erro ao consultar registro' });
  }
  }

  module.exports = postcat