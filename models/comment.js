const mongoose = require('mongoose')


var commentSchema = new mongoose.Schema({
    content: String,
    author: String
    
})
var Comment = mongoose.model("Comment", commentSchema)


module.exports = Comment