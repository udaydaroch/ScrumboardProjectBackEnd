const express = require('express');
const router = express.Router();
const team = require('../Controller/TeamController');

router.get('/teams', team.getTeams);

module.exports = router;