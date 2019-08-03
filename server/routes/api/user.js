const UserController = require('../../controllers/user')
const passport = require('../../passport')

require('express-async-errors')

module.exports = (app) => {
  app.get('/api/user', UserController.getUser)
  app.post('/api/login', UserController.validate('login'), passport.authenticate('local'), UserController.login)
  app.post('/api/signup', UserController.validate('signup'), UserController.signup)
  app.post('/api/logout', UserController.logout)
}
