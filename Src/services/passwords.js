const bcrypt = require("bcrypt");

const hash = async (password) => {
    return await bcrypt.hash(password, 10);
}

const compare = async (password, comp) => {
    return await bcrypt.compare(comp, password);
}

module.exports = { hash, compare };