const express = require('express')
     ejs      = require('ejs')
     path     =  require('path')
     app     = express()
     PORT = process.env.PORT || 4000

//load view Engine 
app.set('views', path.join(__dirname, "views"))
app.set ("view engine", "ejs")

let articles = [
    {
        id: 1,
        title: 'fortune',
        body: 'this is article one'
    },
    {
        id: 2,
        title: 'fortune',
        body: 'this is article one'
    },
    {
        id: 3,
        title: 'fortune',
        body: 'this is article one'
    }
]
app.get('/', (req, res) => {
   
     res.render('index', {
         title: "Articles",
         articles: articles
     })
})

app.get('/articles/add', (req, res) => {
    res.render('add', {
        title: "add artices",
        articles: articles
    }) 
})
app.listen(PORT, () => {
    console.log(`server has started on PORT ${PORT}`)
})