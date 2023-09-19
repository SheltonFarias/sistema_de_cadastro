
var express = require('express');
const { query } = require('./database');
const app = express();

app.use(express.json());

//ROTAS CONTATO

//Rota GET
app.get('/contatos', async function(req, res) {
try {
    const { name } = req.query;

    // Construa a consulta SQL com base no parâmetro 'name'
    let sql = 'SELECT * FROM contatos';

    if (name) {
      sql += ' WHERE nome LIKE $1';
    }

    // Execute a consulta SQL e passe o parâmetro seguro
    const contatos = await query(sql, name ? [`%${name}%`] : []);

    return res.json(contatos);
  } catch (error) {
  console.error('Erro ao consultar registro:', error);
  res.status(500).json({ error: 'Erro ao consultar registro' });
 }
 
});

//Rota POST
app.post('/contatos', async function(req, res) {
  const contato = req.body;

  const { name, email, category_id } = contato;
  let { phone } = contato;
// Validação de todos os campos da lista"
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email e telefone são obrigatórios.' });
  }
  // Validação do campo "email"
  if (email.length < 5 || email.length > 100) {
    
    return res.status(400).json({ error: 'O campo "email" deve ter entre 5 e 100 caracteres.' });
  }
    
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Verifica o formato do email

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'O campo "email" não está em um formato válido.' });
  }

  if (typeof phone === 'number') { phone = phone.toString() }

  const formattedPhone = phone
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
    .replace(/(-\d{4})\d+?$/, '$1');

  const obj = {
    text: 'INSERT INTO contatos(name, email, phone, category_id) VALUES($1, $2, $3, $4) RETURNING *',
    values: [name, email, formattedPhone, category_id]
  };
  try {
    const [contatoCriado] = await query(obj);
    console.log(contatoCriado);
    return res.status(201).json(contatoCriado);
  } catch (error) {
    return res.status(500).json({ error: 'Ocorreu um erro ao criar o contato.' });
  }
});

//Rota PUT
app.put('/contatos/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, category_id} = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Nome, email e telefone são obrigatórios.' });
  }
  const sql = 'UPDATE contatos SET name = $1, email = $2, phone = $3, category_id = $4 WHERE id = $5 RETURNING *';
  const values = [name, email, phone, category_id, id];
  try {
    const result = await query(sql, values);
    res.status(200).json(result[0]);
  } catch (error) {
    console.error('Erro ao atualizar registro:', error);
    res.status(500).json({ error: 'Erro ao atualizar registro' });
  }
});


//Rota DELETE
app.delete('/contatos/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Nome, email e telefone são obrigatórios.' });
  }

  const sql = 'DELETE FROM contatos WHERE id = $1 RETURNING *';
  const values = [id];
  try {
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
 
});


// Rota POST

app.post('/categorias', async function(req, res){
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
})


// Rota PUT

app.put('/categorias/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {name} = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Nome, email e telefone são obrigatórios.' });
    }
    const sql = 'UPDATE categorias SET name = $1 WHERE id = $2 RETURNING *';
    const values = [name, id];
    const result = await query(sql, values);
    res.status(200).json(result[0]);
  } catch (error) {
    console.error('Erro ao atualizar registro:', error);
    res.status(500).json({ error: 'Erro ao atualizar registro' });
  }
});

 
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
