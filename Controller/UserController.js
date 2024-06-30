const getUsers = require('../Model/UserModel');
async function getUserList(req, res) {
    try {
        const users = await getUsers();
        res.json(users);
        res.status(200);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

module.exports = getUserList;