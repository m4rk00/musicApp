const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Song = new Schema({
    nombre: {
        type: String
    },
    genero: {
        type: String
    },
    banda: {
        type: String
    },
    link: {
        type: String
    }
}, {
    collection: 'song'
})

module.exports = mongoose.model('Music', Song)