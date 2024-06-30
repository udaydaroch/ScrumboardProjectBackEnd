const sql = require('../../connection');

async function getUsers() {
    return await sql`SELECT * FROM users`;
}

async function findByEmail(email) {
    return await sql`SELECT * FROM users WHERE email = ${email}`;
}

async function updateToken(email, token) {
    return await sql`UPDATE users SET token = ${token} WHERE email = ${email}`;
}

module.exports = {getUsers, findByEmail, updateToken};

