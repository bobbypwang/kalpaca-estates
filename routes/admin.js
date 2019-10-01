const express = require('express');
const router = express.Router();

const User = require('../models/User');

const nodemailer = require('nodemailer');



router.use((req, res, next) => {

  if (!req.user) {
    req.flash('error', 'please log in to use this feature')
    res.redirect('/login')
  }

  if (!req.user.isAdmin) {
    req.flash('error', 'you do not have access to this feature')
    res.redirect('/')
  }

  next();

})

router.post('/create-new-account', (req, res, next) => {
  const salt = bcrypt.genSaltSync(10)
  let password = bcrypt.hashSync(req.body.password, salt)

  console.log(`the passwordConfirm is [${req.body.passwordConfirm}] and password is [${req.body.password}]`)

  if (req.body.password != req.body.passwordConfirm) {
    req.flash('errorSignupMessage', 'Passwords do not match.')
    res.redirect("/profile")
  } else {
    User.create({
        username: req.body.username,
        isAdmin: req.body.setAdmin,
        role: "user",
        password: password
      })
      .then(user => {
        res.redirect('/profile')
      })
      .catch(error => {
        req.flash("errorSignupMessage", error)
      })
  }
})

router.post('/delete/:id', (req, res, next) => {

  User.findByIdAndRemove(req.params.id)

    .then((result) => {
      req.flash("errorFormMessage", "Account sucessfully deleted.")
      res.redirect('/profile');
    })

    .catch((err) => {
      next(err)
    })

})


module.exports = router;