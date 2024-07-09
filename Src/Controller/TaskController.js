const {randomBytes} = require("node:crypto");
const Task = require("../Model/TaskModel");
const user = require("../Model/UserModel");
async function getTaskUser(req, res) {
    console.log(req.params.taskId, "taskId")
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

    const taskAssignedUser = await Task.getTaskUser(req.params.taskId);
    res.status(200).json(taskAssignedUser);
}

async function completeTask(req, res) {
    if (!req.params.taskId) {
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
    }
    const task = await Task.completeTask(req.params.taskId);
    res.status(200).json(task);
}

async function getTaskReviewer(req, res) {
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
    }
    const taskReviewer = await Task.getTaskReviewer(req.params.taskId);
    res.status(200).json(taskReviewer);

}

async function setTaskReviewer(req, res) {
    console.log(req.params);
    if (!req.params.taskId || !req.params.userId || !req.params.reviewingUser) {
        res.status(400).json({message: 'taskId. reviewingUser, and userId are required'});
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

    const task = await Task.setTaskReviewer(req.params.taskId, req.params.userId, req.params.reviewingUser);
    res.status(200).json(task);
}

async function removeTaskReviewer(req, res) {
    if (!req.params.taskId || !req.params.userId || !req.params.reviewId) {
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
    const task = await Task.removeTaskReviewer(req.params.taskId, req.params.userId, req.params.reviewId);
    res.status(200).json(task);
}

async function setTaskUser(req, res) {

    if (!req.params.taskId || !req.params.userId || !req.params.assignedUser) {
        res.status(400).json({message: 'taskId. assignedUser, and userId are required'});
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

    const task = await Task.setTaskUser(req.params.taskId, req.params.userId, req.params.assignedUser);
    res.status(200).json(task);
}

async function removeTaskUser(req, res) {
    if (!req.params.taskId || !req.params.userId || !req.params.assignedId) {
        res.status(400).json({message: 'taskId, userId,and assignedId are required'});
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
    console.log("in herer");
    const task = await Task.removeTaskUser(req.params.taskId, req.params.userId, req.params.assignedId);
    res.status(200).json(task);
}

async function moveTask(req, res) {
    if (!req.params.taskId || !req.params.from || !req.params.to) {
        res.status(400).json({message: 'taskId, from and to are required'});
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
    const task = await Task.moveTask(req.params.taskId, req.params.from, req.params.to);
    res.status(200).json(task);
}

module.exports = {getTaskUser, setTaskUser, removeTaskUser, moveTask,completeTask,
    getTaskReviewer, removeTaskReviewer, setTaskReviewer};
