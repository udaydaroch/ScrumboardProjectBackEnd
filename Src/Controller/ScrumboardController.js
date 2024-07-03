const Scrumboard = require("../Model/ScrumBoardModel");
const user = require("../Model/UserModel");
async function createBoard(req, res) {
    const board = await Scrumboard.addScrumboard(req.body);
    res.status(200).json(board);
}

 async function getBoardByDateOnly(req, res) {
    if (!req.params.date) {
        return res.status(400).json({message: 'date is required'});
    }
    if (!req.params.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return res.status(400).json({message: 'date is not in the correct format'});
    }
    if (!req.headers['x-authorization']) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    const ScrumUser = await user.findByToken(req.headers['x-authorization']);
    if (!ScrumUser) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    const {date} = req.params;
    const board = await Scrumboard.getScrumboardByDateOnly(date);
    res.status(200).json(board);

}
async function getBoard(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'id is required' });
    }
    if(!id.match(/^\d+$/)){
        return res.status(400).json({ message: 'id is not in the correct format' });
    }
    if(!req.headers['x-authorization']) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const ScrumUser = await user.findByToken(req.headers['x-authorization']);
    if(!ScrumUser) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const board = await Scrumboard.getScrumboard(id);
    console.log(board);
    res.status(200).json(board);
}

async function getBoardByDate(req, res) {
    console.log(req.headers['x-authorization'])

    if (!req.params.teamId || !req.params.date) {
        return res.status(400).json({ message: 'teamId and date are required' });
    }
    if(!req.params.date.match(/^\d{4}-\d{2}-\d{2}$/)){
        return res.status(400).json({ message: 'date is not in the correct format' });
    }
    if(!req.params.teamId.match(/^\d+$/)){
        return res.status(400).json({ message: 'teamId is not in the correct format' });
    }
    if(!req.headers['x-authorization']) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const ScrumUser = await user.findByToken(req.headers['x-authorization']);
    if(!ScrumUser) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const { teamId,date } = req.params;
    const board = await Scrumboard.getScrumboardByDate(teamId, date);
    res.status(200).json(board);
}

module.exports = {createBoard,getBoard,getBoardByDate,getBoardByDateOnly};