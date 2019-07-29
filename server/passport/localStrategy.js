const User = require('../models/User')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
  {
    usernameField: 'email'
  },
  function (email, password, done) {
    User.findOne({ 'email.address': email }, (err, user) => {
      if (err) {
        return done(err)
      }

      if (!user) {
        return done(null, false, { message: 'Incorrect username' })
      }
      if (!user.matchesPassword(password)) {
        return done(null, false, { message: 'Incorrect password' })
      }
      return done(null, user)
    })
  }
)

module.exports = strategy
