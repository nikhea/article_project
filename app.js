const express = require('express')
     ejs      = require('ejs')
     path     =  require('path')
     app     = express()
     PORT = process.env.PORT || 4000

//load view Engine 
app.set('views', path.join(__dirname, "views"))
app.set ("view engine", "ejs")

app.get('/', (req, res) => {
    let artices = [
        {
            id: 1,
            title: 'fortune',
            body: 'this is article one'
        }
    ]
     res.render('index', {
         title: "Articles"
     })
})

app.get('/articles/add', (req, res) => {
    res.render('add', {
        title: "add artices"
    })
})
app.listen(PORT, () => {
    console.log(`server has started on PORT ${PORT}`)
})