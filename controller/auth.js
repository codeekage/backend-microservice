'use strict';

//REQUIRE DEPENDENCIES
const jwt = require('jsonwebtoken');

//EXPORTS FUNCTIONS
module.exports = {
    /**
     * Login Authentication Service [PUBLIC ROUTES]
     */
    login: (req, res, next) => {
        //REQUEST BODY
        const authUser = {
            username: req.body.username,
            password: req.body.password
        }
        //CHECK IF USERNAME IS PROVIDED IN REQUEST BODY [JSON]
        if (!authUser.username || !authUser.password) return res.send('Missing body [username & password]')
        //JSONWEBTOKEN SIGN IN 
        jwt.sign({ authUser }, 'SECRET_KEY', (err, token) => {
            //CHECK IF AN ERROR OCCURED
            if (err) throw err;
            //JSON RESPONSES
            res.json({
                token: token
            });
        });
    }
}