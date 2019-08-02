const UserController = require('../../controllers/user')
const passport = require('../../passport')

require('express-async-errors')

module.exports = (app) => {
  app.post('/login', UserController.validate('login'), passport.authenticate('local'), UserController.login)
  app.post('/signup', UserController.validate('signup'), UserController.signup)
  app.post('/logout', UserController.logout)
}
