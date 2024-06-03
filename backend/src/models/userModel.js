const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        minlength: 6,
        required: true
    }
})

const User = mongoose.model('User', usuarioSchema)
module.exports = User