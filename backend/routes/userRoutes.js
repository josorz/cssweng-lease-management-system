const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const session = require('express-session');


// Define routes 
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;