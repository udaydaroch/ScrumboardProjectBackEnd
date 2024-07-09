const sql = require('../../connection');

async function getUser(id) {
    return await sql`SELECT * FROM users where id = ${id}`;
}

async function getTeamByTeamId(teamId) {
    return await sql`SELECT * FROM users where team_id = ${teamId}`;
}

async function getReviewerByTaskId(taskId, teamId) {
    console.log(taskId, teamId);
    return await sql`
        SELECT u.*
        FROM users u
                 LEFT JOIN tasks_users tu ON u.id = COALESCE(tu.assigned_user_id, tu.reviewing_user_id)
        WHERE u.team_id = ${teamId}
          AND tu.task_id = ${taskId}
        
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

