const sql = require('../../connection');


async function getTaskUser(taskId) {
    return await sql`SELECT * FROM task_user WHERE task_id = ${taskId}`;
}

async function setTaskUser(taskId, userId) {
    return await sql`INSERT INTO task_user (task_id, user_id) VALUES (${taskId}, ${userId})`;
}

async function removeTaskUser(taskId, userId) {
    return await sql`DELETE FROM task_user WHERE task_id = ${taskId} AND user_id = ${userId}`;
}

module.exports = {getTaskUser, setTaskUser, removeTaskUser};