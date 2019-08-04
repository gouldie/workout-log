const User = require('../models/User')
const LocalStrategy = require('passport-local').Strategy
const { ensureSignedOut } = require('../utils/auth')
const { validationResult } = require('express-validator')

const strategy = new LocalStrategy(
  {
    usernameField: 'email',
    passReqToCallback: true // so we can access the errors object
  },
  function (req, email, password, done) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return done({ message: errors.array()[0].msg })
    }

    ensureSignedOut(req)

    User.findOne({ 'email.address': email }, (err, user) => {
      if (err) {
        return done(err)
      }

      if (!user) {
        return done({ message: 'Incorrect email' }, false)
      }
      if (!user.matchesPassword(password)) {
        return done({ message: 'Incorrect password' }, false)
      }
      return done(null, user)
    })
  }
)

module.exports = strategy
