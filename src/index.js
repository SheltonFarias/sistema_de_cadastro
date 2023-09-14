
var express = require('express');
const { query } = require('./database');
const app = express();

app.use(express.json());

//ROTAS CONTATO

//Rota GET
app.get('/contatos', async function(req, res) {
  // const contacts = await listContacts();

  // return res.json(contacts);


  const contatos = await query('SELECT * FROM contatos');

  return res.json(contatos);
});


// Rota POST
app.post('/contatos', async function(req, res) {

  const contato = req.body;

   const { name, email, phone, category_id } = contato

   const obj = {
     text: 'INSERT INTO contatos(name, email, phone, category_id) VALUES($1, $2, $3, $4) RETURNING *',
     values: [name, email, phone, category_id]
   }

   const [contatoCriado] = await query(obj);
   console.log(contatoCriado);
  //  if (!name || !email || !phone) { 'return res.status(400).json({ error: 'Nome , email, telefone são obrigatórios.' }
   return res.status(201).json(contatoCriado)
  });



//Rota PUT


app.put('/contatos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, category_id } = req.body;
    const sql = 'UPDATE contatos SET name = $1, email = $2, phone = $3, category_id = $4 WHERE id = $5 RETURNING *';
    const values = [name, email, phone, category_id, id];
    const result = await query(sql, values);
    res.status(200).json(result[0]);
  } catch (error) {
    console.error('Erro ao atualizar registro:', error);
    res.status(500).json({ error: 'Erro ao atualizar registro' });
  }
});



//Rota DELETE

app.delete('/contatos/:id', async (req, res) => {
   try {
   const { id } = req.params;
   const sql = 'DELETE FROM contatos WHERE id = $1 RETURNING *';
   const values = [id];
  const result = await query(sql, values);
   res.status(200).json(result[0]);
   } catch (error) {
   console.error('Erro ao excluir registro:', error);
  res.status(500).json({ error: 'Erro ao excluir registro' });
   }
  });


//ROTAS CATEGORIAS

//Rota Get
app.get('/categorias', async function(req, res) {
  // const contacts = await listContacts();

  
  // return res.json(contacts);
  
  const categorias = await query('SELECT * FROM categorias');
  
  return res.json(categorias);
});

// Rota POST

app.post('/categorias', async function(req, res){
  //return query('SELECT * FROM contatos')
  const categorias = req.body;
  
  const {name} = categorias
  
  const obj = {
    text: 'INSERT INTO categorias(name) VALUES($1) RETURNING *',
    values: [name]
  }
  
  const [categoriaCriada] = await query(obj);
  console.log(categoriaCriada);
  
  return res.status(201).json(categoriaCriada)
})


// Rota PUT

app.put('/contatos/:id', async (req, res) => {
  try {
    const { put } = req.params;
    const {id, name } = req.body;
    const sql = 'UPDATE contatos SET id = $1, name = $2 WHERE id = $3 RETURNING *';
    const values = [id, name];
    const result = await query(sql, values);
    res.status(200).json(result[0]);
  } catch (error) {
    console.error('Erro ao atualizar registro:', error);
    res.status(500).json({ error: 'Erro ao atualizar registro' });
  }
});

 
//Rota Delete
app.delete('/categorias/:id', async (req, res) => {
  try {
  const { id } = req.params;
  const sql = 'DELETE FROM categorias WHERE id = $1 RETURNING *';
  const values = [id];
 const result = await query(sql, values);
  res.status(200).json(result[0]);
  } catch (error) {
  console.error('Erro ao excluir registro:', error);
 res.status(500).json({ error: 'Erro ao excluir registro' });
  }
 });


app.listen(3000, () => console.log('Server started at http://localhost:3000/'));
