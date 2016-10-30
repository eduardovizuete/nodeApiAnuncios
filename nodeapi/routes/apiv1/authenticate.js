"use strict";

var express = require('express');
var router = express.Router();
// modelo anuncios
var mongoose = require('mongoose');
var usuarioSchema = mongoose.model('Usuario');
var createHash = require('sha.js');
// jwt json web token
var jwt = require('jsonwebtoken');

// middleware para autenticar usuario y devolver token
/**
 * @api {post} /apiv1/usuarios/authenticate Autenticacion de usuarios
 * @apiName /apiv1/usuarios/authenticate
 * @apiGroup nodeAPI
 *
 * @apiParam {String} nombre Nombre del usuario.
 * @apiParam {String} clave Clave del usuario.
 *
 * @apiSuccess {String} success true.
 * @apiSuccess {String} token   Token generado para el usuario.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": "true",
 *       "token": "eyJhbGc..."
 *     }
 *
 * @apiError {String}   success         false.
 * @apiError {String}   message         USER_NOT_FOUND.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "success": "false",
 *       "message": "USER_NOT_FOUND"
 *     }
 */
router.post('/', function (req, res, err) {
    console.log('Body: ', req.body);

    let nombre = req.body.nombre;
    let clave = req.body.clave;

    // encriptar clave
    var sha256 = createHash('sha256');
    var encrip = sha256.update(clave, 'utf8').digest('hex');
    console.log('Clave encriptada: ', encrip);

    // busco el usuario en la BD y verifico la clave
    // en caso de no encontrar el usuario o no coincidir la clave
    // llamariamos a:
    // next(err);
    usuarioSchema.findOne({nombre: nombre, clave: encrip}, function (err, usuario) {
        if (err) {
            next(err);
            return;
        }
        if (usuario) {
            //res.json({success: true, usuario: usuario});
            // generar token jwt
            let token = jwt = jwt.sign({id: usuario.nombre}, '1234abcd', {
                expiresIn: '2 days'
            });

            res.json({success: true, token: token});
        } else {
            res.json({success: false, message: 'USER_NOT_FOUND'});
        }
    });

});

module.exports = router;
