var express = require('express');
const { query } = require('./database');
var app = express();

app.use(express.json());

app.get('/contacts', async function(req, res) {
  const contacts = await listContacts();

  return res.json(contacts);
});

app.update('/contatos/:id')
app.delete('/contatos/:id')

function listContacts() {
 return query('SELECT * FROM contatos;');
}

function updatecontacts () {
  return query('UPDATE contatos where id = 2')
}

app.listen(3000, () => console.log('Server started at http://localhost:3000/'));
