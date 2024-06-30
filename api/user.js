// api/login.js
const { findByEmail, updateToken } = require('../Src/Model/UserModel');
const { randomBytes } = require('crypto');
const cors = require('../Src/CorsManagement/Cors');

async function login (req, res) {
    const { email, password } = req.body;
    const userInfo = await findByEmail(email);
    if (!userInfo) {
        res.status(401).json({error: "Invalid email or password"});
        return;
    }
    if (userInfo.password !== password) {
        res.status(401).json({error: "Invalid email or password"});
        return;
    }

    const token = generateRandomToken();
    await updateToken(email, token);
    res.status(200).json({userId: userInfo.id, "token": token, isAdmin: userInfo.isAdmin});
}

function generateRandomToken() {
    const value = randomBytes(16);
    return value.toString('hex');
}

module.exports = (req, res) => {
    cors(req, res, () => {
        if (req.method === 'POST') {
            login(req, res);
        } else {
            res.status(405).send('Method Not Allowed');
        }
    });
};