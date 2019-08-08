const express = require('express')
     ejs      = require('ejs')
     mongoose = require('mongoose')
     path     =  require('path')
     Articles = require("./models/articles")
     Comments = require("./models/comment")
     bodyparser = require('body-parser')
     methodOverride = require('method-override')
     SeedDB         = require('./seed')
     app     = express()
   
SeedDB()
     PORT = process.env.PORT || 5000
     mongoose.connect('mongodb+srv://testuser:testuserpassword@cluster0-yxil4.mongodb.net/test?retryWrites=true&w=majority')
    //  mongoose.connect('mongodb://localhost/nodeartics_commits')
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
app.use(methodOverride("_method"))
// app.set(express.static(path.join(__dirname, 'public')))
// app.use(express.static('public'))
app.use('/static', express.static('public'))

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
      Articles.findById(req.params.id).populate('comments').exec(function(err, articles){
          if (err) {
              console.log(err)
          } else {
              console.log(articles)
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

//load edit form
app.get('/articles/:id/edit', (req, res) => {
    Articles.findById(req.params.id, function(err, editArticles){
  res.render('edit', {article:editArticles}) 
    })
    
})
//update
app.post('/articles/:id/edit', function(req, res){
  let article = {};
  article.title = req.body.title
  article.author = req.body.author
  article.body  = req.body.body

  let query = { _id: req.params.id}
 Articles.update(query, article, function(err){
     if (err) {
         console.log(err)
     } else {
         res.redirect('/')
     }
 })
 });

 app.delete('/articles/:id', function(req, res){
   Articles.findByIdAndRemove(req.params.id, function(err){
       if (err) {
           res.send('not deledtion')
       } else {
           res.redirect('/')
       }
   })
 })



 app.get('/article/:id/comments/new', function(req, res){
    Articles.findById(req.params.id, function(err, articles){
           if (err) {
               console.log(err)
           } else {
            res.render("postnew", {article:articles})
           }
    })
  
           
 })


 app.post('/article/:id/comments', function(req, res){
     Articles.findById(req.params.id, function(err, articles){
         if (err) {
             console.log(err)
         } else {
            let article = {};
            article.author = req.body.author
            article.content  = req.body.content
             Comments.create(article,function(err, comment){
                 if (err) {
                     console.log(err)
                 } else {
                    
                     console.log(req.body.comment)
                     articles.comments.push(comment)
                   articles.save()
                     res.redirect('/article/' + articles._id)
                 }
             })
         }
     })
      
})

 

app.listen(PORT, () => {
    console.log(`server has started on PORT ${PORT}`)
})