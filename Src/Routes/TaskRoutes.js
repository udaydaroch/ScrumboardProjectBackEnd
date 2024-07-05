const express = require('express');
const router = express.Router();
const task = require('../Controller/TaskController');

router.get('/getTaskUser/:taskId', task.getTaskUser);
router.post('/setTaskUser/task/:taskId/user/:userId/assigning/:assignedUser', task.setTaskUser);
router.post('/removeTaskUser/:taskId/removedBy/:userId', task.removeTaskUser);
router.post("/moveTask/:taskId/from/:from/to/:to", task.moveTask)
module.exports = router;