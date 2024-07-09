const express = require('express');
const router = express.Router();
const subTask = require('../Controller/SubTaskController');

router.post('/createSubTask/:taskId', subTask.createSubTask);
router.get('/getSubTasks/:taskId', subTask.getSubTasks);
router.post("/completeSubTask/:subTaskId/user/:userId", subTask.completeSubTask);
router.post('/updateSubTask/:subTaskId', subTask.updateSubTask);
router.post('/deleteSubTask/:subTaskId', subTask.deleteSubTask);

module.exports = router;

