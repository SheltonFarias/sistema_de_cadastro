var express = require('express');
const { query } = require('./database');
var app = express();

app.use(express.json());

app.get('/', async function(req, res) {
  const contacts = await listContacts();

  return res.json(contacts);
});

function listContacts() {
 return query('SELECT * FROM contatos;');
}

function createcontacts () {
  return query('CREATE')
}

function updatecontacts () {
  return query('UPDATE contatos')
}

app.listen(3000, () => console.log('Server started at http://localhost:3000/'));
