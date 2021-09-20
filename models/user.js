const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, ''],
        trim: true, 
    },
    email: {
        type: String, 
        required: [true, ''],
        trim: true, 
    }, 
    username: {
        type: String, 
        required: [true, ''],
        trim: true, 
        maxlength: [30, 'No more than 30 char']
    }, 
})

module.exports = mongoose.model('User', UserSchema)