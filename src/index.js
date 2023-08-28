var express = require('express');
var app = express();

app.use(express.json());

app.get('/', function(req, res) {
  return res.send({ message: 'Hello world! '});
});

app.listen(3000, () => console.log('Server started at http://localhost:3000'));
