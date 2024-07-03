const sql = require('../../connection');

async function getUser(id) {
    return await sql`SELECT * FROM users where id = ${id}`;
}

async function getUserTeamByUserId(UserId) {
    const userTeam = await sql`SELECT * FROM users where id = ${UserId}`;
    const teamid = userTeam[0].team_id;
    return await sql`SELECT * FROM teams where team_id = ${teamid}`;
}
async function findByEmail(email) {
    return await sql`SELECT * FROM users WHERE email = ${email}`;
}

async function findByToken(token) {
    console.log(token);
    return await sql`SELECT * FROM users WHERE auth_token = ${token}`;
}
async function updateToken(email, token) {
    return await sql`UPDATE users SET auth_token = ${token} WHERE email = ${email}`;
}

async function resetToken(id) {
    return await sql`UPDATE users SET auth_token = null WHERE id = ${id}`;
}
module.exports = {getUser, findByEmail,findByToken,getUserTeamByUserId, updateToken, resetToken};

