const {randomBytes} = require("node:crypto");
const user = require("../Model/UserModel");

async function login (req, res) {
    const {email, password} = req.body;
    const userInfo = await user.findByEmail(email);
    if (!userInfo[0]) {
        res.status(401).json({error: "Invalid email"});
        return;
    }
    if (userInfo[0].password !== password) {
        res.status(401).json({error: `Invalid password : ${userInfo.password} vs ${password}`});
        return;
    }
    const token = generateRandomToken();
    await user.updateToken(email, token);

    const newUser = await user.getUsers(userInfo[0].id)
    console.log(newUser);
    res.status(200).json({userId: userInfo[0].id, token: token, isAdmin: newUser[0].is_admin, teamId: newUser[0].team_id});
}


async function logout(req, res) {
    const authToken =  req.headers["x-authorization"] ;
    const existingUser = await user.findByToken(authToken);
    if(!authToken || !existingUser) {
        res.status(401).json({error: "Invalid token"});
        return;
    }
    await user.resetToken(authToken);
    res.status(200).json({message: "Logged out"});
}

async function getUsers(req, res) {
    const users = await user.getUsers();
    res.status(200).json(users);
}
function generateRandomToken() {
    const value = randomBytes(16);
    return value.toString('hex');
}


module.exports = {login,getUsers,logout};