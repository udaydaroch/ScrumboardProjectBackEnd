const sql = require('../../connection');
const user = require('./UserModel');

async function getTaskUser(taskId) {
    const user =  await sql`SELECT * FROM tasks_users WHERE task_id = ${taskId}`;
    if (user.length === 0) {
        return {};
    }
    console.log(user);
    const assignedUser = user[0].assigned_user_id;
    return await sql `SELECT * FROM users WHERE id = ${assignedUser}`;
}

async function getTaskReviewer(taskId) {
    const user =  await sql`SELECT * FROM tasks_users WHERE task_id = ${taskId}`;
    if (user.length === 0) {
        return {};
    }
    console.log(user);
    const assignedUser = user[0].reviewing_user_id;
    return await sql `SELECT * FROM users WHERE id = ${assignedUser}`;
}


async function setTaskReviewer(taskId, userId, reviewingUser) {
    console.log(taskId, userId, reviewingUser);
    console.log("user who setTask");
    const taskExists = await checkTaskExists(taskId);
    if (taskExists) {
        return await sql`UPDATE tasks_users SET reviewing_user_id = ${reviewingUser}, user_who_set_reviewer = ${userId} WHERE task_id = ${taskId}`;
    }
    return await sql`INSERT INTO tasks_users (task_id, user_who_set_reviewer, reviewing_user_id ) VALUES (${taskId}, ${userId}, ${reviewingUser})`;
}

async function setTaskUser(taskId, userId, assignedUser) {
    console.log(taskId, userId, assignedUser);
    const taskExists = await checkTaskExists(taskId);
    if (taskExists) {
        return await sql`UPDATE tasks_users SET assigned_user_id = ${assignedUser}, user_who_set_assigned = ${userId}  WHERE task_id = ${taskId}`;
    }
    return await sql`INSERT INTO tasks_users (task_id, user_who_set_assigned, assigned_user_id ) VALUES (${taskId}, ${userId}, ${assignedUser})`;
}

async function checkTaskExists(taskId) {
    const existingTask = await sql`SELECT * FROM tasks_users WHERE task_id = ${taskId}`;
    return existingTask.length > 0;
}

async function removeTaskUser(taskId, userId, assignId) {
    console.log(taskId, userId, assignId);
    return await sql`UPDATE tasks_users SET assigned_user_id = NULL , user_who_set_assigned = ${userId} WHERE task_id = ${taskId} AND assigned_user_id = ${assignId}`;
}
async function removeTaskReviewer(taskId, userId, reviewId) {
    return await sql`UPDATE tasks_users SET reviewing_user_id = NULL , user_who_set_reviewer = ${userId} WHERE task_id = ${taskId} AND reviewing_user_id = ${reviewId}`;
}

async function moveTask(taskId, from, to) {
    return await sql`UPDATE tasks SET column_name = ${to} WHERE id = ${taskId} AND column_name = ${from}`;
}

async function completeTask(taskId) {
    const currentStatus = await sql`SELECT is_completed FROM tasks WHERE id = ${taskId}`;
    const newStatus = !currentStatus[0].is_completed;

    return await sql`UPDATE tasks SET is_completed = ${newStatus} WHERE id = ${taskId}`;
}


module.exports = {completeTask, getTaskUser, setTaskUser, removeTaskUser, moveTask, getTaskReviewer, setTaskReviewer,removeTaskReviewer};