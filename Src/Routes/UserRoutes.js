const express = require('express');
const router = express.Router();
const user = require('../Controller/UserController');


router.post('/login', user.login);
router.get('/users', user.getUsers);
router.post('/logout', user.logout);


module.exports = router;