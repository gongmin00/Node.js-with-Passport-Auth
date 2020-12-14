 module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }else {
            req.flash('errorMsg', "please login to view this content")
            res.redirect('/user/login')
        }

    }
}