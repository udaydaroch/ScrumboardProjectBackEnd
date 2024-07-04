const {randomBytes} = require("node:crypto");
const Task = require("../Model/TaskModel");
const user = require("../Model/UserModel");
async function getTaskUser(req, res) {
    if(!req.params.taskId ) {
        res.status(400).json({message: 'taskId are required'})
        return;
    }
    if(!req.headers['x-authorization']) {
        res.status(401).json({message: 'Unauthorized'});
        return;
    }
    const authToken = req.headers['x-authorization'];
    const scrumUser = await user.findByToken(authToken);
    if (scrumUser.length === 0) {
        res.status(401).json({message: 'Unauthorized'});
        return;
    }

    const task = await Task.getTaskUser(req.params.taskId);
    res.status(200).json(task);
}

async function setTaskUser(req, res) {
    if (!req.params.taskId || !req.params.userId) {
        res.status(400).json({message: 'taskId and userId are required'});
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

    const task = await Task.setTaskUser(req.body.taskId, req.params.userId);
    res.status(200).json(task);
}

async function removeTaskUser(req, res) {
    if (!req.params.taskId || !req.params.userId) {
        res.status(400).json({message: 'taskId and userId are required'});
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
    const task = await Task.removeTaskUser(req.params.taskId, req.params.userId);
    res.status(200).json(task);
}

module.exports = {getTaskUser, setTaskUser, removeTaskUser};
