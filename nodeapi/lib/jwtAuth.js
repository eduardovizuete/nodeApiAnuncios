"use strict";

var jwt = require('jsonwebtoken');
//var configJWT =  require('../local_config').jwt;

/**
 *  JWT auth middleware for use with Express 4.x.
 *
 * @example
 * app.use('/api-requiring-auth', jwtAuth());
 *
 * @return (function) Express 4 middleware
 */

module.exports = function () {

    return function (req, res, next) {

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secre and checks exp
            //jwt.verify(token, configJWT.secret, function (err, decoded) {
            jwt.verify(token, '1234abcd', function (err, decoded) {
                if (err) {
                    return res.json({ ok: false, error: {code: 401, message: 'Failed to autenticated token.'}});
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decode = decoded;
                    console.log('decoded', decoded);
                    next();
                }
            });
        } else {

            // if there is no token return error
            return res.status(403).json({
                ok: false,
                error: { code: 403, message: 'No token provided.'}
            });
        }
    };
};
