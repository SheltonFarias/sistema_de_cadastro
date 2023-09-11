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
app.put('/contatos/:id', async function(req,res){
 const Atualizarcontato = req.body;
 const id = req.params.id
 const {name, email, phone, category_id} = Atualizarcontato

const sql = {

  text: 'UPDATE contatos SET name = $1, email = $2, phone =$3, category_id = $4 WHERE ($5)',
  values: [name, email, phone, category_id, id]
}

return res.status(200).json(contatos)
 return res.status(201).send('Contato Atualizado')
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



//Rota DELETE
app.delete('/contatos/:id', async function(req,res) {

} )

app.delete('/contatos/:id', async function(req,res){

})




//ROTAS CATEGORIAS

//Rota Get
app.get('/categorias', async function(req, res) {
  // const contacts = await listContacts();
  
  // return res.json(contacts);
  
  const categorias = await query('SELECT * FROM categorias');
  
  return res.json(contatos);
});



//ROTAS CATEGORIAS

// Rota POST


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


//Rota GET

app.get('/categorias', async function(req, res) {
  // const contacts = await listContacts();
  
  // return res.json(contacts);
  
  const categorias = await query('SELECT * FROM categorias');
  
  return res.json(contatos);
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