//this is where we create strategy
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//load Mongoose User Model
const User = require('../model/user')

const Passport = function (passport) {
    passport.use(
        new.LocalStrategy(
            { usernameField: 'email' },
            //change username in passport to email
            function (username, password, done) {
                //match user in mongoose
                User.findOne({email:email})
                .then(user=>{
                    if(!user) {
                        return done(null, false, {message:'this email is not registered'})
                    }
                })
                .catch(err=>console.log(err))
            }
        )
    )
}
module.exports = Passport