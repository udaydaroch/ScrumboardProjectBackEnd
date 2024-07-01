const {randomBytes} = require("node:crypto");
const user = require("../Model/UserModel");

async function login (req, res) {
    const {email, password} = req.body;
    const userInfo = await user.findByEmail(email);
    if (!userInfo) {
        res.status(401).json({error: "Invalid email"});
        return;
    }
    if (userInfo.password !== password) {
        res.status(401).json({error: "Invalid password"});
        return;
    }

    const token = generateRandomToken();
    await user.updateToken(email, token);
    res.status(200).json({userId: userInfo.id, "token": token, isAdmin: userInfo.isAdmin});
}

async function getUsers(req, res) {
    const users = await user.getUsers();
    res.status(200).json(users);
}
function generateRandomToken() {
    const value = randomBytes(16);
    return value.toString('hex');
}


module.exports = {login,getUsers};