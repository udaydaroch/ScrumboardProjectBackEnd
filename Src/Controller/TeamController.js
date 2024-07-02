const team = require("../Model/TeamModel");

async function getTeams(req, res) {
    const teams = await team.getTeams();
    res.status(200).json(teams);
}

module.exports = {getTeams};