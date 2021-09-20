const express = require('express')
const router = express.Router(); 

const { getAllUsers, createUser, login, register } = require('../controllers/userscontroller')

const authMiddleware = require("../middleware/auth")

router.route('/').get(authMiddleware, getAllUsers)
router.route('/createUser').post(createUser)
router.route('/login').post(login)
router.route('/register').post(register)

module.exports = router; 