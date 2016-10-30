"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// modelo anuncios
var anuncioSchema = mongoose.model('Anuncio');

// lista de anuncios sin filtros
/*router.get('/', function (req, res, next) {
    anuncioSchema.find({}, function (err, anuncios) {
        if (err) {
            next(err);
            return;
        }
        res.json({success: true, anuncios: anuncios});
    });
});*/

// habilitar jwt authentication
var jwtAut = require('../../lib/jwtAuth');
router.use(jwtAut());

// lista de anuncios paginada, con filtros, totales y sumatorias
router.get('/', function (req, res, next) {
    var tag = req.query.tag;
    var venta = req.query.venta;
    var nombre = req.query.nombre;
    var precio = req.query.precio;
    var start= parseInt(req.query.start) || 0;
    var limit = parseInt(req.query.limit) || 0;
    var sort = req.query.sort || null;
    var includeTotal = req.query.includeTotal;

    var filter = {};

    if (typeof tag !== 'undefined') {
        filter.tags = tag;
    }

    if (venta === 'true' || venta === 'false') {
        filter.venta = venta;
    }

    if (typeof nombre !== 'undefined') {
        filter.nombre = new RegExp('^' + nombre, "i");
    }

    if (typeof precio !== 'undefined' && precio !== '-') {
        if (req.query.precio.indexOf('-') !== -1) {
            filter.precio = {};
            var rango = precio.split('-');
            if (rango[0] !== '') {
                filter.precio.$gte = rango[0];
            }

            if (rango[1] !== '') {
                filter.precio.$lte = rango[1];
            }
        } else {
            filter.precio = precio;
        }
    }

    // llamada con promesas
    anuncioSchema.list(filter, start, limit, sort).then(function (anuncios) {
        if (includeTotal === 'true') {
            anuncioSchema.aggregate(
                {
                    $group: {_id: "Sum precios", total: {$sum: "$precio"}}
                }, function (err, results) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(results);
                        console.log('NumRegistros: ', anuncios.length);
                        res.json({
                            success: true,
                            anuncios: anuncios,
                            totales: results,
                            numdocs:  anuncios.length
                        });
                    }
                }
            );
        } else {
            res.json({success: true, anuncios: anuncios});
        }

    }).catch(next);
});

module.exports = router;
