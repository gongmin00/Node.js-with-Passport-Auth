const express = require ('express')
const app = express()
// create express application
const userRouter = require("./routers/user")
//router level middleware
const mongoose = require ('mongoose')

const db = require('./config/keys').mongoURI
//mongo db config

mongoose.connect(db,{ useNewUrlParser: true })
    .then(()=>console.log('mongoDB connect'))
    .catch(()=>console.log('err'))


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


app.get('/', function(req, res){
    res.render('home.pug', {message: "this is home page"})
})
app.use('/user', userRouter)



app.listen(3000)
//listen to port 3000
