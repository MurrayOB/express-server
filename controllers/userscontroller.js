const {StatusCodes} = require('http-status-codes')
const Response = require('../middleware/response')
//User Model
const User = require("../models/user")
const jwt = require('jsonwebtoken')

const getAllUsers = async (req, res) => {
    const users = await User.find({})
    res.status(200).json({users})
}

const createUser = async (req, res) => {
    const user = new User(req.body); 

    user.save()
    .then((result) => {
        res.status(200).json(Response(true, "User successfully created!"))
    }).catch((error) => {
        res.status(200).json(Response(false, "Something went wrong!"))
    })
}

const login = async (req, res) => {
    const {username, password} = req.body; 

    if(!username || !password){
        res.status(StatusCodes.BAD_REQUEST).json({ msg: "No username or password provided" })
        return; 
    }

    const id = new Date().getDate()
    //Just for DEMO
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
    res.status(200).json({ success: true, msg: 'user created', token })
}

const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    //Just for DEMO
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

module.exports = {getAllUsers, createUser, login, register}