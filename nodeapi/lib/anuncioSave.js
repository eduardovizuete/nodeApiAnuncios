"use strict";

var anuncioSchema = require('../models/anuncioSchema');

// guardar anuncio
var anuncio = new anuncioSchema({
        nombre: 'nuevoAnuncio',
        venta: true,
        precio: 9.99,
        foto: 'img_nuevoAnuncio',
        tags: [
            'work',
            'lifestyle',
            'motor',
            'mobile'
        ]
    });

anuncio.save(function (err, anuncioGuardado) {
    if (err) {
        next(err);
        return;
    }
    console.log('Anuncio guardado', anuncioGuardado);
});
