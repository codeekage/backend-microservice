'use strict';

const express = require('express');
const router = express.Router();
const thumbNail = require('../controller/thumbnail');

router.post('/thumbnail', thumbNail.thumbNail);

module.exports = router;
