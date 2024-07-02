const Scrumboard = require("../Model/ScrumBoardModel");

async function createBoard(req, res) {
    const board = await Scrumboard.addScrumboard(req.body);
    res.status(200).json(board);
}

module.exports = {createBoard};