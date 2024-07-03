const express = require('express');
const router = express.Router();
const ScrumBoard = require('../Controller/ScrumboardController');

router.post('/setUpBoard', ScrumBoard.createBoard);
router.get('/getBoard/:id', ScrumBoard.getBoard);
router.get('/team/:teamId/getBoardByDate/:date', ScrumBoard.getBoardByDate);
router.get('getBoardByDate/:date', ScrumBoard.getBoardByDateOnly);
module.exports = router;