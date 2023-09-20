const express = require('express');
const { query } = require('./database');

const get = require('./controllers/contatos/get');
const post = require('./controllers/contatos/post');
const put = require('./controllers/contatos/put');
const delet = require('./controllers/contatos/delete');

const getcat = require('./controllers/categorias/get');
const postcat = require('./controllers/categorias/post');
const putcat = require('./controllers/categorias/put');
const deletcat = require('./controllers/categorias/delete')

const routes = express.Router()

routes.get('/contatos', get);
routes.post('/contatos', post);
routes.put('/contatos/:id', put);
routes.delete('/contatos/:id', delet)
//categorias
routes.get('/categorias', getcat);
routes.post('/categorias', postcat);
routes.put('/categorias/:id', putcat);
routes.delete('/categorias/:id', deletcat);

module.exports = routes
