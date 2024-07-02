const express = require('express');
const router = express.Router();
const ScrumBoard = require('../Controller/ScrumboardController');

router.get('/setUpBoard', ScrumBoard.createBoard);

module.exports = router;