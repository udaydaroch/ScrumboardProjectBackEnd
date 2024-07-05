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

async function setTaskUser(taskId, userId, assignedUser) {
    console.log(taskId, userId, assignedUser);
    return await sql`INSERT INTO tasks_users (task_id, user_id, assigned_user_id ) VALUES (${taskId}, ${userId}, ${assignedUser})`;
}

async function removeTaskUser(taskId, userId) {
    return await sql`DELETE FROM tasks_users WHERE task_id = ${taskId} AND user_id = ${userId}`;
}

async function moveTask(taskId, from, to) {
    return await sql`UPDATE tasks SET column_name = ${to} WHERE id = ${taskId} AND column_name = ${from}`;
}

module.exports = {getTaskUser, setTaskUser, removeTaskUser, moveTask};