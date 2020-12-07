const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require("body-parser")
const User = require('../model/user.js')
const bcrypt = require("bcryptjs")


const jsonParser = bodyParser.json()
//create a json parser
const urlencodeed = bodyParser.urlencoded({extended:false})
//create a url-encoded parser

router.get('/', function(req,res){
    res.render('home.pug')
})
//user page
router.get('/signup', function(req, res){
    res.render("signup.pug")
 })
 //user/signup page
router.post('/signup', urlencodeed, function(req, res){
    const {username, email, password, password2} = req.body
    let errorMsg = []
    if (!username || ! email || !password || !password2) {
        errorMsg.push({
            msg: "please fill in required fields"
        })
    }
    if (password.length<6){
        errorMsg.push({
            msg: "password must longer than 6 characters"
        })
    }
    if (password !== password2) {
        errorMsg.push({
            msg:"password doesn't match"
        })
    }
    if (errorMsg.length>0) {
        res.render('signup.pug', {
            errorMsg: JSON.stringify(errorMsg),
            username: username,
            email: email,
            password,
            password2
            //以上两种写法都可以传递数据
        })
    } else {
        //the first email here for findOne refers to schema Typel in user model
        User.findOne({email:email})
        .then(user=>{
            if (user) {
                errorMsg.push({
                    msg:"Email already registered"
                })
                res.render('signup.pug', {
                    errorMsg: JSON.stringify(errorMsg),
                    username: username,
                    email: email,
                    password,
                    password2
                })
            }
            else {
                const newUser = new User({
                    username: username,
                    email: email,
                    password: password
                })
                //这是User model的实例
                bcrypt.genSalt(10, function(err, salt){
                    //hashing password
                    bcrypt.hash(newUser.password, salt, function(error, hash){
                         newUser.password = hash
                         //set password to hashed
                         newUser.save().then(user=>{
                            req.flash('successMsg','you are now registered and please login')
                            res.redirect('/user/login')
                         }).catch(err=>console.log(err))
                         //save newUser data to mongodb atlas
                    })
                })
            }
        })
    }

})
//user/signup handler

router.get('/login', function(req, res){
    res.render('login.pug')
})

router.get('/:id', function(req, res){
    const id = req.params.id
    res.send(id)
})

module.exports = router