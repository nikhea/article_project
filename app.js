const express = require('express')
     ejs      = require('ejs')
     mongoose = require('mongoose')
     path     =  require('path')
     Articles = require("./models/articles")
     app     = express()
   

     PORT = process.env.PORT || 4000
     mongoose.connect('mongodb://localhost/nodeartics')
     let db = mongoose.connection;
//check for DB error
db.on("error", function(error){
   console.log(error)
}) 
//check for DB error
db.once("open", function(){
    console.log("Connected to local MONGODataBase" )
 }) 
//load view Engine 
app.set('views', path.join(__dirname, "views"))
app.set ("view engine", "ejs")


app.get('/', (req, res) => {
   
     res.render('index', {
         title: "Articles",
         articles: articles
     })
})

app.get('/articles/add', (req, res) => {
 Articles.find({},function(err, articles){
     if (err) {
         console.log(err)
     }
     else{
        res.render('add', {
            title: "add artices",
            articles: articles
        }) 
     }
   
 })
 
})
app.listen(PORT, () => {
    console.log(`server has started on PORT ${PORT}`)
})