'use strict';

//AUTHENTICATION MIDDLEWARE FOR JWT
/**
 * ENFORCE AUTHENTICATION ON ROUTES
 * @param {client request} req 
 * @param {sever response} res 
 * @param {next function} next 
 */
const ensureAuth = (req, res, next) => {
    //GET AUTHRORICATION FROM HEADER ARRAY
    const bearerHeader = req.headers['authorization'];
    //CHECK IF HEADER IS UNDEFIEND
    if (typeof bearerHeader != 'undefined') {
        //GET TOKEN FROM FROM BEARER VALUE [AUTHORIZATION : BEARER <TOKEN>]
        const bearerToken = bearerHeader.split(' ')[1];
        //DEFINE NEW GLOBAL VARIBABLE [req.token];
        req.token = bearerToken;
        //PROCEED WITH THREAD
        next();
    } else {
        //FAILED
        res.sendStatus(403);
    }
}

//MODULE EXPORT
module.exports = ensureAuth;