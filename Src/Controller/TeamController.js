const team = require("../Model/TeamModel");
const user = require("../Model/UserModel");
async function getTeams(req, res) {
    if (!req.headers['X-Authorization']) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const userInfo = await user.findByToken(req.headers['x-authorization']);
    if (!userInfo[0]) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const teams = await team.getTeams();
    res.status(200).json(teams);
}

module.exports = {getTeams};