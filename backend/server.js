const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

// Conexion con la base de datos
mongoose
    .connect('mongodb://127.0.0.1:27017/music')
    //.connect('mongodb+srv://pololt:1234@proyectosds02.lweq0.mongodb.net/empleadosds02?retryWrites=true&w=majority')
    .then((x) => {
        console.log(`Conectado exitosamente a Mongo a la Base de Datos: "${x.connections[0].name}" `)
    })
    .catch((err) => {
        console.error('Error al conectarse con Mongo', err.reason)
    })

// Configuracion del Servidor Web
const musicRuta = require('./routes/music.route')
const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
)
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist/music')))
app.use('/', express.static(path.join(__dirname, 'dist/music')))
app.use('/api', musicRuta)


//habilitar puerto 
const port = process.env.PORT || 4000
const server = app.listen(port, () => {
    console.log('Conectado al puerto ' + port)
})

//manejador de error 404 
app.use((req, res, next) => {
    next(createError(404))
})

//manejador de errores 
app.use(function(err, req, res, next) {
    console.error(err.message)
    if (!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.message)
})