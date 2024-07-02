const sql = require('../../connection');

async function getUsers() {
    return await sql`SELECT * FROM users`;
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
module.exports = {getUsers, findByEmail,findByToken, updateToken, resetToken};

