"use strict";

var mongoose = require('mongoose');

// definir esquema para anuncios
var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

// the schema is useless so far
// we need to create a model using it
var Anuncio = mongoose.model('Anuncio', anuncioSchema);

// make this available in our Node applications
module.exports = Anuncio;