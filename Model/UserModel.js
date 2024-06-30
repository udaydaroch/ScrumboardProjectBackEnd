const sql = require('../connection');

async function getUsers() {
    return await sql`SELECT * FROM users`;
}
module.exports = getUsers;