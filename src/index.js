var express = require('express');
const { query } = require('./database');
const app = express();

app.use(express.json());

//ROTAS CONTATO

//Rota Get
app.get('/contatos', async function(req, res) {
  // const contacts = await listContacts();

  // return res.json(contacts);

  const contatos = await query('SELECT * FROM contatos');

  return res.json(contatos);
});

//Rota Post
app.post('/contatos', async function(req, res){
  //return query('SELECT * FROM contatos')
  const contato = req.body;

  const { name, email, phone, category_id } = contato

  const obj = {
    text: 'INSERT INTO contatos(name, email, phone, category_id) VALUES($1, $2, $3, $4)',
    values: [name, email, phone, category_id]
  }

  const contatoCriado = await query(obj);
  console.log(contatoCriado);

  return res.status(201).json(contatoCriado)
})

app.get('/contatos', function(req, res){
  return query('DELETE FROM contatos WHERE id = *')
})




//ROTAS CONTATOS


// Rota Post

app.post('/categorias', async function(req, res){
  //return query('SELECT * FROM contatos')
  const Categorias = req.body;
  
  const {id, name } = categorias
  
  const obj = {
    text: 'INSERT INTO contatos(id, name) VALUES($1, $2)',
    values: [id, name]
  }
  
  const categoriaCriada = await query(obj);
  console.log(categoriaCriada);

  return res.status(201).json(categoriaCriada)
})

//Rota Get

app.get('/categorias', async function(req, res) {
  // const contacts = await listContacts();
  
  // return res.json(contacts);
  
  const categorias = await query('SELECT * FROM categorias');
  
  return res.json(contatos);
});








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
