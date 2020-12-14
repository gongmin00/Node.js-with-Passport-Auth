const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')
const bodyParser = require("body-parser")


const urlencodeed = bodyParser.urlencoded({extended:false})
//create a url-encoded parser

router.get('/', (req, res)=>{
    res.render('welcome')
})

router.get('/dashboard', ensureAuthenticated,(req, res)=>{
    res.render('dashboard.pug', {
        name: req.user.username
    })
})
//make sure login before enter dashboard by using ensureAuthenicated
module.exports = router