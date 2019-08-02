const express = require('express')
     ejs      = require('ejs')
     mongoose = require('mongoose')
     path     =  require('path')
     Articles = require("./models/articles")
     bodyparser = require('body-parser')
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



app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.set(express.static(path.join(__dirname, 'public')))

//Home Route
app.get('/', (req, res) => {
    Articles.find({},function(err, articles){
        if (err) {
            console.log(err)
        }
        else{
           res.render('index', {
               title: "Articles",
               articles: articles
           }) 
        }
    })
    }) 
// Show more detail about a given articles
app.get("/article/:id", function(req, res){
      Articles.findById(req.params.id, function(err, articles){
          if (err) {
              console.log(err)
          } else {
              res.render("articles", {article:articles})
          }
      })
})
app.get('/articles/add', (req, res) => {
    res.render('add', {
            title: "Add Articles",
     })
})
// Articule Form  route
app.post('/articles/add', (req, res) => {
     let article = new Articles()
     article.title = req.body.title
     article.author = req.body.author
     article.body  = req.body.body
    article.save(function(err){
        if (err) {
            console.log(err)
        } else {
            res.redirect('/')
        }
    })
    
})

app.listen(PORT, () => {
    console.log(`server has started on PORT ${PORT}`)
})