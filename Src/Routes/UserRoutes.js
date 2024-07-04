const express = require('express');
const router = express.Router();
const user = require('../Controller/UserController');


router.post('/login', user.login);
router.post('/logout', user.logout);
router.get('/getTeamByTeamId/:teamId', user.getTeamByTeamId);

module.exports = router;