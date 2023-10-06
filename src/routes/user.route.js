const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')

router.post('/signup',userController.usersignUp);
router.post('/login',userController.userLogin);

module.exports = router;
