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

// lista de anuncios paginada, con filtros
anuncioSchema.statics.list = function (filter, start, limit, sort) {
    return new Promise(function (resolve, reject) {
        console.log('Filtros: ', filter);
        console.log('start: ', start);
        console.log('limit: ', limit);
        console.log('sort: ', sort);

        var query = Anuncio.find(filter);
        query.skip(start);
        query.limit(limit);
        query.sort(sort);
        query.exec(function (err, result) {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};

// the schema is useless so far
// we need to create a model using it
var Anuncio = mongoose.model('Anuncio', anuncioSchema);

// make this available in our Node applications
module.exports = Anuncio;