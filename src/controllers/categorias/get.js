const { query } = require('../../database');

async function getcat(req, res) {
    try{
     const { name } = req.query;
     
       // Construa a consulta SQL com base no parâmetro 'name'
       let sql = 'SELECT * FROM categorias';
   
       if (name) {
         sql += ' WHERE name LIKE $1';
       }
   
       // Execute a consulta SQL e passe o parâmetro seguro
       const categorias = await query(sql, name ? [`%${name}%`] : []);
   
       return res.json(categorias);
     } catch (error) {
     console.error('Erro ao consultar registro:', error);
     res.status(500).json({ error: 'Erro ao consultar registro' });
    }
    
   };

   module.exports = getcat