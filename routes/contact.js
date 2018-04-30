'use strict';
const express = require('express');
const router = express.Router();
const ensureAuth = require("../middleware/auth.middleware");
const contact = require('../controller/contacts');

//CONTACT REQUEST [GET, POST] WITHOUT REQUEST PARAMS
router.route('/')
  .get(ensureAuth, contact.getContacts)
  .post(ensureAuth, contact.postContacts);


//CONTACT REQUEST [GET, PUT, DELETE] WITH REQUEST PARAMS [INDEX] OF THE OBJECT
router.route('/:index')
  .get(ensureAuth, contact.getContacts)
  .put(ensureAuth, contact.updateContact)
  .delete(ensureAuth, contact.deleteContact)

module.exports = router;
