"use strict";

var mongoose = require('mongoose');

// definir esquema para usuarios
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});

// the schema is useless so far
// we need to create a model using it
var Usuario = mongoose.model('Usuario', usuarioSchema);

// make this available in our Node applications
module.exports = Usuario;