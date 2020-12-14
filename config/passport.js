//this is where we create strategy
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//load Mongoose User Model
const User = require('../model/user')

const Passport = function (passport) {
    passport.use(
        new LocalStrategy(
            { usernameField: 'email' },
            //change username in passport to email
            function (email, password, done) {
                //match user's email in mongoose
                User.findOne({email:email})
                .then(user=>{
                    if(!user) {
                        return done(null, false, {message:'this email is not registered'})
                    } 
                    //the first passport is plain passport input, user.passport is bcrypt passport in mongoose
                    bcrypt.compare(password, user.password, (err, isMatch)=>{
                        if (err) throw err
                        //isMatch is a boolean
                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, {message:'the password is not correct'})
                        }
                    })
                })
                .catch(err=>console.log(err))
            }
        )
    )
    passport.serializeUser(function(user, done){
        done(null, user.id)
    })
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user)
        })
    })
}
module.exports = Passport