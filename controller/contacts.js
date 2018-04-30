'use strict';

const express = require('express'),
    jwt = require('jsonwebtoken'),
    patch = require('../model/patch'),
    jsonPatch = require('jsonpatch')

let getPatch, postPatch, putPatch, deletePatch;
const ERROR = null;


const errorHandler = (req, res) => {
    if (!req.body.name || !req.body.tel || !req.body.email) return res.send({
        ERROR: "EXCEPTION at" + req.body + "Expected (name, tel, email)"
    });
    if (typeof req.body.name != 'string' || typeof req.body.tel != 'number' || typeof req.body.email != 'string')

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
        jwt.verify(req.token, 'SECRET_KEY', (err, user) => {
            if (err)
                res.send(err);
            else
                res.send({ patch: patch });

            if (req.params.index)
                getPatch = jsonPatch.apply_patch(patch, [{
                    'op': "get",
                    'path': `/contact_card/${req.params.index}`
                }]);
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
        jwt.verify(req.token, 'SECRET_KEY', (err, user) => {
            if (err)
                res.send(err);
            else
                postPatch = jsonPatch.apply_patch(patch, [{
                    'op': "add",
                    'path': "/contact_card/",
                    'value': req.body
                }]);

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
        jwt.verify(req.token, 'SECRET_KEY', (err, authUser) => {
            if (err)
                res.send(err);
            else
                updatePatch = jsonPatch.apply_patch(patch, [{ "op": "replace", "path": `/contact_card/${req.params.index}`, "value": req.body }]);
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
        jwt.verify(req.token, 'SECRET_KEY', (err, authUser) => {
            if (err)
                res.send(err);
            else
                deletePatch = jsonPatch.apply_patch(patch, [{ "op": "remove", "path": `/contact_card/${req.params.index}`, "value": req.body }]);
            res.send(deletePatch)
        })
    }
}

