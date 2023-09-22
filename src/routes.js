const { Router } = require('express')

const contatosController = require('./controllers/contatos')
const categoriasController = require('./controllers/categorias')

const routes = Router()

// contatos
routes.get('/contatos', contatosController.get)
routes.post('/contatos', contatosController.post)
routes.put('/contatos/:id', contatosController.put)
routes.delete('/contatos/:id', contatosController.delete)

//categorias
routes.get('/categorias', categoriasController.get)
routes.post('/categorias', categoriasController.post)
routes.put('/categorias/:id', categoriasController.put)
routes.delete('/categorias/:id', categoriasController.delete)

module.exports = routes
