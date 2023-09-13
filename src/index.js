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

//Rota POST
app.post('/contatos', async function(req, res){
  //return query('SELECT * FROM contatos')
  const contato = req.body;

  const { name, email, phone, category_id } = contato

  const obj = {
    text: 'INSERT INTO contatos(name, email, phone, category_id) VALUES($1, $2, $3, $4) RETURNING *',
    values: [name, email, phone, category_id]
  }

  const [contatoCriado] = await query(obj);
  console.log(contatoCriado);
 //  if (!name || !email || !phone) {    return res.status(400).json({ error: 'Nome , email, telefone são obrigatórios.' }
  return res.status(201).json(contatoCriado)
})

//Rota PUT


<<<<<<< HEAD
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
=======
  values: [name, email, phone, category_id, id]
}

return res.status(200).send('contato atualizado')


return res.status(201)


})


// app.put('/contatos/:id', async function(req,res){
//  const Atualizarcontato = req.body;
//  const id = parseInt(req.params.id)
//  query = (
//  'UPDATE contatos SET name = $1, email = $2, phone = $3, category_id = $4 WHERE id = $5', [name, email, phone, category_id, id], (error, results) => {
//  if (error) {
//    throw error
//  }
//  return res.status(200).json(contatos)
//  })
// })
//  const ContatoAtualizado = await query(sql)

>>>>>>> 3e3eb2e39260b4639e03ed280eb0a882ee239ec2


//Rota DELETE

app.delete('/registros/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM categorias WHERE id = $1 RETURNING *';
    const values = [id, name, id];
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
  
  const {id, name } = categorias
  
  const obj = {
    text: 'INSERT INTO categorias(id, name) VALUES($1, $2) RETURNING *',
    values: [id, name]
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
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}


app.listen(3000, () => console.log('Server started at http://localhost:3000/'));


// app.get('/contatos/:id', function(req, res){
  //   const id = req.params.id
  //   let consult = `SELECT id FROM contatos WHERE id = ${id}`
  //   |
  //   query.query(consult, (err, result) => {
    //     console.log(result);
    //     return null; 
    //     if (err) throw err;
    //     res.render('index', result)
    //   })
    

    // app.get('/contatos', function(req, res){
    //   return query('DELETE FROM contatos WHERE id = *')
    // })
    // ,