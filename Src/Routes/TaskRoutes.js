const express = require('express');
const router = express.Router();
const task = require('../Controller/TaskController');

router.get('/getTaskUser/:taskId', task.getTaskUser);
router.post('/setTaskUser/task/:taskId/user/:userId/assigning/:assignedUser', task.setTaskUser);
router.post('/removeTaskUser/:taskId', task.removeTaskUser);

module.exports = router;