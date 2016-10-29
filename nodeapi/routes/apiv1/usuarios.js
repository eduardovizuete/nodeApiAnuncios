"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var createHash = require('sha.js');

// modelo usuarios
var usuarioSchema = mongoose.model('Usuario');

// middleware para crear usuario
router.post('/', function (req, res, next) {
    console.log('Body: ', req.body);

    // encriptar clave
    var sha256 = createHash('sha256');
    var encrip = sha256.update(req.body.clave, 'utf8').digest('hex');
    console.log('Clave encriptada: ', encrip);

    // datos usuario
    var usuario = new usuarioSchema({
        nombre: req.body.nombre,
        email: req.body.email,
        clave: encrip
    });

    // guardar usuario
    usuario.save(function (err, usuarioGuardado) {
       if (err) {
           next(err);
           return;
       }
       res.json({success: true, usuario: usuarioGuardado});
    });
});

module.exports = router;