'use strict';

const jwt = require('jsonwebtoken');

module.exports = {
    /**
     * Login Authentication Service [PUBLIC ROUTES]
     */
    login: (req, res, next) => {
        const authUser = {
            username: req.body.username,
            password: req.body.password
        }
        //CHECK IF USERNAME IS PROVIDED IN REQUEST BODY [JSON]
        if (!authUser.username || !authUser.password) return res.send('Missing body [username & password]')
        jwt.sign({ authUser }, 'SECRET_KEY', (err, token) => {
            if (err) throw err;
            res.json({
                token: token
            });
        });
    }
}