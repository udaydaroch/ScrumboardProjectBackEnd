const express = require('express');
const router = express.Router();
const user = require('../Controller/UserController');


router.post('/login', user.login);
router.post('/logout', user.logout);
router.get('/getTeamByTeamId/:teamId', user.getTeamByTeamId);
router.get('/getReviewerByTaskId/:taskId/team/:teamId', user.getReviewerByTaskId);
module.exports = router;