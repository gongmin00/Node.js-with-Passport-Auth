const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    date: {
        type:String,
        default: Date.now
    },
})
const User = mongoose.model("user", userSchema)
//mongoose.model(modelName,Schema)
module.exports = User