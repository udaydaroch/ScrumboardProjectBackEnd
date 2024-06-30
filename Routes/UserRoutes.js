const express = require('express');
const router = express.Router();
const getUserList = require('../Controller/UserController');

router.get('/users', getUserList);

module.exports = router;