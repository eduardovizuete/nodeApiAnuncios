"use strict";

// conexion mongoose
require('./mongoConnection');

var mongoose = require('mongoose');

// eliminar coleccion anuncios
var anuncioSchema = require('../models/anuncioSchema');
var colAnuncios = mongoose.connection.collections[anuncioSchema.collection.collectionName];
colAnuncios.drop(function (err) {
    if (err) {
        console.log('Error', err);
        return;
    }
    console.log('Colleccion Anuncios eliminada');
});

// guardar anuncio
require('./anuncioSave');

// eliminar coleccion usuarios
var usuarioSchema = require('../models/usuarioSchema');
var colUsuarios = mongoose.connection.collections[usuarioSchema.collection.collectionName];
colUsuarios.drop(function (err) {
    if (err) {
        console.log('Error', err);
        return;
    }
    console.log('Colleccion Usuarios eliminada');
});

// guardar usuario
require('./usuarioSave');
