const sql = require('../../connection');

async function getUser(id) {
    return await sql`SELECT * FROM users where id = ${id}`;
}

async function getTeamByTeamId(teamId) {
    return await sql`SELECT * FROM users where team_id = ${teamId}`;
}

async function getReviewerByTaskId(taskId, teamId) {

    return await sql` SELECT *
                      FROM users
                      WHERE team_id = ${teamId} AND
                          users.id NOT IN (
                              SELECT COALESCE(reviewing_user_id, assigned_user_id) as userId
                              FROM tasks_users
                              WHERE task_id = ${taskId}
                          )
    `;
}


async function findByEmail(email) {
    return await sql`SELECT * FROM users WHERE email = ${email}`;
}

async function findByToken(token) {
    return await sql`SELECT * FROM users WHERE auth_token = ${token}`;
}
async function updateToken(email, token) {
    return await sql`UPDATE users SET auth_token = ${token} WHERE email = ${email}`;
}

async function resetToken(id) {
    return await sql`UPDATE users SET auth_token = null WHERE id = ${id}`;
}
module.exports = {getUser, findByEmail,findByToken,getTeamByTeamId, updateToken, resetToken,getReviewerByTaskId};

