const sql = require('../../connection');


async function getTaskUser(taskId) {
    return await sql`SELECT * FROM tasks_users WHERE task_id = ${taskId}`;
}

async function setTaskUser(taskId, userId, assignedUser) {
    console.log(taskId, userId, assignedUser);
    return await sql`INSERT INTO tasks_users (task_id, user_id, assigned_user_id ) VALUES (${taskId}, ${userId}, ${assignedUser})`;
}

async function removeTaskUser(taskId, userId) {
    return await sql`DELETE FROM tasks_users WHERE task_id = ${taskId} AND user_id = ${userId}`;
}

module.exports = {getTaskUser, setTaskUser, removeTaskUser};