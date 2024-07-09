const express = require('express');
const router = express.Router();
const task = require('../Controller/TaskController');

router.post("/moveTask/:taskId/from/:from/to/:to", task.moveTask)

router.get('/getTaskUser/:taskId', task.getTaskUser);
router.post('/setTaskUser/task/:taskId/user/:userId/assigning/:assignedUser', task.setTaskUser);
router.post('/removeTaskUser/:taskId/removedBy/:userId/assigned/:assignedId', task.removeTaskUser);

route.post("/completeTask/:taskId", task.completeTask);
router.get('/getTaskReviewer/:taskId', task.getTaskReviewer);
router.post('/setTaskReviewer/task/:taskId/user/:userId/reviewing/:reviewingUser', task.setTaskReviewer);
router.post('/removeTaskReviewer/:taskId/removedBy/:userId/reviewing/:reviewId', task.removeTaskReviewer);
module.exports = router;