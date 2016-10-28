"use strict";

var usuarioSchema = require('../models/usuarioSchema');

// guardar anuncio
var usuario = new usuarioSchema({
        nombre: 'nuevoUsuario',
        email: 'nuevoUsuario@email.com',
        clave: 'clave'
    });

usuario.save(function (err, usuarioGuardado) {
    if (err) {
        next(err);
        return;
    }
    console.log('Usuario guardado', usuarioGuardado);
});
