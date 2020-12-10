const express = require ('express')
const app = express()
// create express application
const userRouter = require("./routers/user")
//router level middleware
const mongoose = require ('mongoose')
const db = require('./config/keys').mongoURI
//mongo db config
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
require('./config/passport')(passport)
//bring in passport to config

// mongoose.connect('mongodb://localhost/database1', { useNewUrlParser: true })
// //connect to database and database name is database1

// mongoose.connection.once('open', function(){
//     console.log('we connect to database1')
// })
// //moniter database1

// mongoose.connection.once('close', function(){
//     console.log("we are disconnected")
// })

app.set('views', "./views")
app.set('view engin', "pug")

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
}))
//express-session middleware

app.use(passport.initialize())
app.use(passport.session())
//passport middleware, put them after session

app.use(flash())
//connect-flash middleware

app.use(function(req, res, next){
    res.locals.successMsg =req.flash('successMsg')
    res.locals.errorMsg =req.flash('errorMsg')
    res.locals.error =req.flash('error')
    next()
})
//Global variables

app.use('/user', userRouter)
//router middleware
app.get('/', function(req, res){
    res.render('home.pug', {message: "this is home page"})
})


mongoose.connect(db,{ useNewUrlParser: true })
    .then(()=>console.log('mongoDB connect'))
    .catch(()=>console.log('err'))

app.listen(3000)
//listen to port 3000
