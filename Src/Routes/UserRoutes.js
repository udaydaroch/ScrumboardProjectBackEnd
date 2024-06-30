const express = require('express');
const router = express.Router();
const user = require('../Controller/UserController');


router.post('/api/login', user.login);

module.exports = router;