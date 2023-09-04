var express = require('express');
const { query } = require('./database');
var app = express();

app.use(express.json());

app.get('/contacts', async function(req, res) {
  const contacts = await listContacts();

  return res.json(contacts);
});

app.put('/contatos/:id', async function(req, res) {
  const contacts = await updatecontacts();

  return res.json(contacts);
});


app.drop('/contatos/:id', async function(req, res) {
  const contacts = await deletecontacts();

  return res.json(contacts);
});


function listContacts() {
 return query('SELECT * FROM contatos;');
}

function updatecontacts () {
  return query('UPDATE contatos where id = 2')
}

function deletecontacts() {
  return query('DELETE FROM contatos;')
}

function insertcontacts() {
  return query('INSERT INTO contatos')
}

app.listen(3000, () => console.log('Server started at http://localhost:3000/'));
