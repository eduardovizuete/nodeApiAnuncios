"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var createHash = require('sha.js');

// modelo usuarios
var usuarioSchema = mongoose.model('Usuario');

// middleware para crear usuario
/**
 * @api {post} /apiv1/usuarios Creacion de usuarios
 * @apiName /apiv1/usuarios
 * @apiGroup nodeAPI
 *
 * @apiParam {String} nombre Nombre del usuario.
 * @apiParam {String} clave Clave del usuario.
 * @apiParam {String} email Correo electronico del usuario.
 *
 * @apiSuccess {String} success true.
 * @apiSuccess {String} usuario Usuario generado.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": "true",
 *       "usuario": "datos usuario generado"
 *     }
 *
 * @apiError {String}   success         false.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "success": "false"
 *     }
 */
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