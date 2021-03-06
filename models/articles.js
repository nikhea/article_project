const mongoose = require('mongoose')



let articlesSchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    author:{
        type: String,
        require: true
    },
    body:{
        type: String,
        require: true
    },
    comments: [
           {
               type:mongoose.Schema.Types.ObjectId,
               ref: "Comment"
           }
    ]
})

let Articles = mongoose.model("Articles", articlesSchema)

module.exports = Articles