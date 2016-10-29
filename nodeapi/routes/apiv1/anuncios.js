"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// modelo anuncios
var anuncioSchema = mongoose.model('Anuncio');

// lista de anuncios sin filtros
router.get('/', function (req, res, next) {
    anuncioSchema.find({}, function (err, anuncios) {
        if (err) {
            next(err);
            return;
        }
        res.json({success: true, anuncios: anuncios});
    });
});

module.exports = router;
