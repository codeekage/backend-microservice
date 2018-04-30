'use strict';

//REQUIRE DEPENDENCIES 
const express = require('express'),
    jwt = require('jsonwebtoken'),
    patch = require('../model/patch'),
    jsonPatch = require('jsonpatch')

//DECLARE STARTER VARIABLES
let getPatch, postPatch, putPatch, deletePatch;

/**
 * ERROR MIDDLEWARE FOR AUTHENTICATION
 * @param {REQUES} req 
 * @param {RESPONSES} res 
 */
const errorHandler = (req, res) => {
    //CHECK IF THE REQUEST BODY CONTAINS A NAME, TEL AND EMAIL
    if (!req.body.name || !req.body.tel || !req.body.email) return res.send({
        ERROR: "EXCEPTION at" + req.body + "Expected (name, tel, email)"
    });
    //CHECK IF THE REQUEST BODY TYPES [NAME = STRING, TEL = NUMBER, && EMAIL = STRING]
    if (typeof req.body.name != 'string' || typeof req.body.tel != 'string' || typeof req.body.email != 'string')
        //RETURNS ERRROR 422 (UNPROCESSABLE ENTITY) WITH A JSON RESPONSE.
        return res.status(422).json({
            ERROR: "EXCEPTION at" + req.body + "Expected (name : STRING, tel : NUMBER, email : STRING)"
        });
}

/**
 * contact functions
 */
module.exports = {

	/**
	 * retrives contacts from the jsonpatch as an object.
	 * @param {request} req 
	 * @param {responses} res 
	 * @param {process} next 
	 */
    getContacts: (req, res, next) => {
        //VERIFY IF ROUTES HAS TOKEN IN HEADER BEFORE PROCEEDING WITH THE ROUTE REQUEST
        jwt.verify(req.token, 'SECRET_KEY', (err, user) => {
            //IF ERROR OCCURS RESPOND WITH ERROR MESSAGE
            if (err)
                //ERROR RESPONSES 
                res.send(err);
            else
                //RESPONSE WITH DATA REQUEST 
                res.send({ patch: patch });

            //CHECK IF REQUEST HAS AN INDEX
            if (req.params.index)
                //JSON PATCH APPLY FUNCTION WITH GET OPERATION
                getPatch = jsonPatch.apply_patch(patch, [{
                    'op': "get",
                    'path': `/contact_card/${req.params.index}`
                }]);
            //PATCH RESPONSE
            res.send(getPatch);
        });
    },


	/**
	 * add new contact to the jsonpatch as an object.
	 * @param {request} req 
	 * @param {responses} res 
	 * @param {process} next 
	 */
    postContacts: (req, res, next) => {
        //VERIFY IF ROUTES HAS TOKEN IN HEADER BEFORE PROCEEDING WITH THE ROUTE REQUEST

        jwt.verify(req.token, 'SECRET_KEY', (err, user) => {
            //IF ERROR OCCURS RESPOND WITH ERROR MESSAGE
            if (err)
                //RESPONSE WITH DATA REQUEST 
                res.send(err);
            else
                //JSON PATCH APPLY FUNCTION WITH ADD OPERATION
                postPatch = jsonPatch.apply_patch(patch, [{
                    'op': "add",
                    'path': "/contact_card/",
                    'value': req.body
                }]);
            //CALL TO ERROR MIDDLE WARE 
            errorHandler(req, res);
            res.json(postPatch)
        });
    },

	/**
	 * updates an existing contact with req.body the jsonpatch as an object.
	 * @param {request} req 
	 * @param {responses} res 
	 * @param {process} next 
	 */
    updateContact: (req, res, next) => {
        //VERIFY IF ROUTES HAS TOKEN IN HEADER BEFORE PROCEEDING WITH THE ROUTE REQUEST

        jwt.verify(req.token, 'SECRET_KEY', (err, authUser) => {
            //IF ERROR OCCURS RESPOND WITH ERROR MESSAGE

            if (err)
                //RESPONSE WITH DATA REQUEST 
                res.send(err);
            else
                //JSON PATCH APPLY FUNCTION WITH REPLACE OPERATION
                updatePatch = jsonPatch.apply_patch(patch, [{ "op": "replace", "path": `/contact_card/${req.params.index}`, "value": req.body }]);
            //CALL TO ERROR MIDDLE WARE 
            errorHandler(req, res);
            res.send(updatePatch);
        });
    },

	/**
	 * delete contact from the jsonpatch.
	 * @param {request} req 
	 * @param {responses} res 
	 * @param {process} next 
	 */
    deleteContact: (req, res, next) => {
        //VERIFY IF ROUTES HAS TOKEN IN HEADER BEFORE PROCEEDING WITH THE ROUTE REQUEST
        jwt.verify(req.token, 'SECRET_KEY', (err, authUser) => {
            //IF ERROR OCCURS RESPOND WITH ERROR MESSAGE
            if (err)
                //RESPONSE WITH DATA REQUEST 
                res.send(err);
            else
                //JSON PATCH APPLY FUNCTION WITH REMOVE OPERATION
                deletePatch = jsonPatch.apply_patch(patch, [{ "op": "remove", "path": `/contact_card/${req.params.index}`, "value": req.body }]);
            res.send(deletePatch)
        })
    }
}

