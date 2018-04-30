'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../controller/auth');

//LOGIN REQUEST [PUBLIC ROUTES]
router.post('/', auth.login);

module.exports = router;
