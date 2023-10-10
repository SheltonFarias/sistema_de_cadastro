
var express = require('express')
const routes = require('./routes')
var cors = require('cors')
const app = express()

app.use(express.json())

app.use(cors({
	origin: '*'
}))

app.use(routes)

app.listen(3000, () => console.log('Server started at http://localhost:3000/'))
