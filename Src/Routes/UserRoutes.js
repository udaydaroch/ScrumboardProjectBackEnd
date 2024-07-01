const express = require('express');
const router = express.Router();
const user = require('../Controller/UserController');


router.post('/login', user.login);
router.get('/users', user.getUsers);
module.exports = router;