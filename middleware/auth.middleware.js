'use strict';

//AUTHENTICATION MIDDLEWARE
/**
 * ENFORCE AUTHENTICATION ON ROUTES
 * @param {client request} req 
 * @param {sever response} res 
 * @param {next function} next 
 */
const ensureAuth = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader != 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}


module.exports = ensureAuth;