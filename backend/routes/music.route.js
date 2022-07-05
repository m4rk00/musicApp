const express = require('express')
const app = express();
const musicRuta = express.Router();
const { findByIdAndUpdate } = require('../models/Music')

let Song = require('../models/Music');

//agregar una nueva cancion
musicRuta.route('/new').post((req, res, next) => {
    Song.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//obtenemos la lista de canciones
musicRuta.route('/playlist').get((req, res, next) => {
    Song.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//obtenemos una sola cancion por su ID
musicRuta.route('/song/:id').get((req, res, next) => {
    Song.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//actualizar una cancion
musicRuta.route('/update/:id').put((req, res, next) => {
    Song.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
            console.log('Se actualizó exitosamente')
        }
    })
});

//eliminar una cancion
musicRuta.route('/delete/:id').delete((req, res, next) => {
    Song.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = musicRuta;