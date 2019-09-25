const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('../models/User.js')

router.get("/profile", (req, res, next) => {

    if (req.user) {
        res.render("users/profile")
    } else {
        req.flash("errorGlobalMessage", "Please login below to access your profile page.")
        res.redirect("/login")
    }

})

router.get("/signup", (req, res, next) => {

    if (!req.user || req.user.isAdmin == false) {
        req.flash('errorFormMessage', 'You do not have permission to access this page.')
    }
    res.render("users/signup");

});

router.post('/signup', (req, res, next) => {

    const salt = bcrypt.genSaltSync(10)
    let password = bcrypt.hashSync(req.body.password, salt)

    console.log(`the passwordConfirm is [${req.body.passwordConfirm}] and password is [${req.body.password}]`)

    if (req.body.password != req.body.passwordConfirm) {
        req.flash('errorSignupMessage', 'Passwords do not match.')
        res.redirect("/#signup")
    } else {
        User.create({
            username: req.body.username,
            isAdmin: false,
            role: "user",
            password: password
        })
        .then(user => {
            req.login(user, function (err) {
                if (!err) {
                    res.redirect('/profile')
                } else {
                    next(err);
                }

            })
        })
        .catch(e => {
            res.status(500).send(e)
        })
    }

});

router.get("/login", (req, res, next) => {
    res.render('users/login', {})
    req.flash("errorFormMessage", "Please login below to access your profile page.")
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: 'Invalid username or password.',
    passReqToCallback: true
}));


router.get("/logout", (req, res, next) => { 
    req.logout()
    res.render("users/logout")
})

// router.post("/user/change-password", (req, res, next) => {
//     User.findByIdAndUpdate(req.user._id, )
// })


router.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email"
        ]
    })
);
router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: "/",
        failureRedirect: "/login" // here you would redirect to the login page using traditional login approach
    })
);

module.exports = router