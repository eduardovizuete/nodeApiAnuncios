"use strict";

var usuarioSchema = require('../models/usuarioSchema');

// guardar anuncio
var usuario = new usuarioSchema({
        nombre: 'usertest',
        email: 'usertest@email.com',
        clave: '6d5074b4bf2b913866157d7674f1eda042c5c614876de876f7512702d2572a06'
        // hash sha256 del valor 'clave'
    });

usuario.save(function (err, usuarioGuardado) {
    if (err) {
        next(err);
        return;
    }
    console.log('Usuario guardado', usuarioGuardado);
});
