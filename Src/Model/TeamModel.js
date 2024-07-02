const sql = require('../../connection');


async function getTeams() {
    return await sql`SELECT * FROM teams`;
}

module.exports = {getTeams};