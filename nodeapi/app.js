"use strict";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var jwt = require('jsonwebtoken');
var app = express();

// conexion mongoose
require('./lib/mongoConnection');

//modelos
require('./models/anuncioSchema');
require('./models/usuarioSchema');

// prueba modelo guardar anuncio
//require('./lib/anuncioSave');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// publicar contenido de documentacion API
app.use('/', express.static(path.join(__dirname, 'apidoc')));

//app.use('/', routes);
app.use('/users', users);

// middleware anuncios sin filtros
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
// middleware crear usuario
app.use('/apiv1/usuarios', require('./routes/apiv1/usuarios'));
// middleware autenticacion
app.use('/apiv1/usuarios/authenticate', require('./routes/apiv1/authenticate'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
