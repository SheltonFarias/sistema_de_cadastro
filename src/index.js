
var express = require('express');
const { query } = require('./database');
const routes = require('./routes');
const app = express();

app.use(express.json());

app.use(routes);


 
//Rota Delete
app.delete('/categorias/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Nome, email e telefone são obrigatórios.' });
  }

  const sql = 'DELETE FROM categorias WHERE id = $1 RETURNING *';
  const values = [id];
  try {
 const result = await query(sql, values);
  res.status(200).json(result[0]);
  } catch (error) {
  console.error('Erro ao excluir registro:', error);
 res.status(500).json({ error: 'Erro ao excluir registro' });
  }
 });


app.listen(3000, () => console.log('Server started at http://localhost:3000/'));
