var express = require('express');
const { query } = require('./database');
const app = express();

app.use(express.json());

app.get('/', async function(req, res) {
  const contacts = await listContacts();

  return res.json(contacts);
});
app.get('/contatos', function(req, res){
  return query('SELECT * FROM contatos')
})

app.get('/contatos/:id', function(req, res){
  const id = req.params.id
  let consult = `SELECT id FROM contatos WHERE id = ${id}`
  |
  query.query(consult, (err, result) => {
    console.log(result);
    return null;
    if (err) throw err;
    res.render('index', result)
  })

})




// function listContacts() {
//  return query('SELECT * FROM contatos;');
// } 


// function createcontacts () {
//   return query('CREATE')
// }

// function updatecontacts () {
//   return query('UPDATE contatos')
// }

app.listen(3000, () => console.log('Server started at http://localhost:3000/'));


