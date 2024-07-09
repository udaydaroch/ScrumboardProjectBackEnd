const {randomBytes} = require("node:crypto");
const subTask = require("../Model/SubTaskModel");
const user = require("../Model/UserModel");
async function createSubTask(req, res) {
    const {taskId} = req.params;
    const {title, description} = req.body;
    if (!taskId || !description) {
        res.status(400).json({message: 'taskId and description are required'});
        return;
    }
    if (!req.headers['x-authorization']) {
        res.status(401).json({message: 'Unauthorized'});
        return;
    }
    const authToken = req.headers['x-authorization'];
    const scrumUser = await user.findByToken(authToken);
    if (scrumUser.length === 0) {
        res.status(401).json({message: 'Unauthorized'});
        return;
    }

    const newSubTask = await subTask.createSubTask(taskId,title, description);
    res.status(200).json(newSubTask);
}


async function getSubTasks(req, res) {
    const {taskId} = req.params;
    if (!taskId) {
        res.status(400).json({message: 'taskId is required'});
        return;
    }
    if (!req.headers['x-authorization']) {
        res.status(401).json({message: 'Unauthorized'});
        return;
    }
    const authToken = req.headers['x-authorization'];
    const scrumUser = await user.findByToken(authToken);
    if (scrumUser.length === 0) {
        res.status(401).json({message: 'Unauthorized'});
        return;
    }
    const subTasks = await subTask.getSubTasks(taskId);
    res.status(200).json(subTasks);
}

async function completeSubTask(req, res) {
    const {subTaskId, userId} = req.params;
    if (!subTaskId || !userId) {
        res.status(400).json({message: 'subTaskId and userId are required'});
        return;
    }
    if (!req.headers['x-authorization']) {
        res.status(401).json({message: 'Unauthorized'});
        return;
    }
    const authToken = req.headers['x-authorization'];
    const scrumUser = await user.findByToken(authToken);
    if (scrumUser.length === 0) {
        res.status(401).json({message: 'Unauthorized'});
        return;
    }
    const completedSubTask = await subTask.completeSubTask(subTaskId, userId);
    res.status(200).json(completedSubTask);
}

async function updateSubTask(req, res) {
    const {subTaskId} = req.params;
    const {title, description} = req.body;
    if (!subTaskId || !description) {
        res.status(400).json({message: 'subTaskId and description are required'});
        return;
    }
    if (!req.headers['x-authorization']) {
        res.status(401).json({message: 'Unauthorized'});
        return;
    }
    const authToken = req.headers['x-authorization'];
    const scrumUser = await user.findByToken(authToken);
    if (scrumUser.length === 0) {
        res.status(401).json({message: 'Unauthorized'});
        return;
    }
    const updatedSubTask = await subTask.updateSubTask(subTaskId,title, description);
    res.status(200).json(updatedSubTask);
}

async function deleteSubTask(req, res) {
    const {subTaskId} = req.params;
    if (!subTaskId) {
        res.status(400).json({message: 'subTaskId is required'});
        return;
    }
    if (!req.headers['x-authorization']) {
        res.status(401).json({message: 'Unauthorized'});
        return;
    }
    const authToken = req.headers['x-authorization'];
    const scrumUser = await user.findByToken(authToken);
    if (scrumUser.length === 0) {
        res.status(401).json({message: 'Unauthorized'});
        return;
    }
    const deletedSubTask = await subTask.deleteSubTask(subTaskId);
    res.status(200).json(deletedSubTask);
}

module.exports = {createSubTask, getSubTasks, completeSubTask, updateSubTask, deleteSubTask};