const sql = require('../../connection');

async function createSubTask(taskId, title, description) {
    return await sql`INSERT INTO sub_tasks (task_id, title, descripton) VALUES (${taskId}, ${title}, ${description})`;
}

async function getSubTasks(taskId) {
    return await sql`SELECT * FROM sub_tasks WHERE task_id = ${taskId}`;
}


async function completeSubTask(subTaskId, userId) {
    return await sql`UPDATE sub_tasks SET completed = true, userId = ${userId} WHERE id = ${subTaskId}`;
}

async function updateSubTask(subTaskId, title, description) {
    let updates = [];
    if (title) {
        updates.push(`title = ${title}`);
    }
    if (description) {
        updates.push(`description = ${description}`);
    }
    if (updates.length === 0) {
        throw new Error('No updates provided');
    }
    return await sql`UPDATE sub_tasks SET ${updates.join(', ')} WHERE id = ${subTaskId}`;
}

async function deleteSubTask(subTaskId) {
    return await sql`DELETE FROM sub_tasks WHERE id = ${subTaskId}`;
}

module.exports = {createSubTask, getSubTasks, completeSubTask, updateSubTask, deleteSubTask};