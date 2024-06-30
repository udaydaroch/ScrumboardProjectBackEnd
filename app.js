// app.js
const sql = require('./connection');

async function getUsers() {
    const users = await sql`SELECT * FROM users`;
    return users;
}

module.exports = getUsers;