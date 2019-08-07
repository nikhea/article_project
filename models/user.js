const mongoose = require('mongoose')



let UserSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    username:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
})

let User = mongoose.model("User", UserSchema)

module.exports = User