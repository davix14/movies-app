const express = require('express');
/*const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');*/
const UserController = require('../controllers/user');
const router = express.Router();

router.post('/login', UserController.login);

router.post('/newUser', UserController.register);

module.exports = router;
