'use strict';

const express = require('express');
const router = express.Router();
const syncController = require('../controllers/sync');

router.get('/', syncController.syncData);

module.exports = router;
