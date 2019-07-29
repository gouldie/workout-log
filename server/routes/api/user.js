const User = require('../../models/User')
const passport = require('../../passport')

module.exports = (app) => {
  app.post(
    '/login',
    (req, res, next) => { next() },
    passport.authenticate('local'),
    (req, res) => {
      res.json({ success: true, user: req.user })
    }
  )

  app.post('/signup', (req, res) => {
    const { email, password } = req.body
    // ADD VALIDATION
    User.findOne({ 'email.address': email }, (err, user) => {
      if (err) console.log('err', err)
      if (user) {
        return res.json({
          error: `Sorry, already a user with the email: ${email}`
        })
      }

      const newUser = new User({
        email: {
          address: email,
          verified: false
        },
        password
      })

      newUser.save((err, savedUser) => {
        if (err) return res.json(err)

        req.login(newUser, (err) => {
          if (err) console.log('err', err)
          return res.json(savedUser)
        })
      })
    })
  })

  app.post('/logout', (req, res) => {
    if (req.user) {
      req.session.destroy()
      res.clearCookie('connect.sid') // clean up!
      return res.json({ message: 'logging you out' })
    } else {
      return res.json({ message: 'no user to log out!' })
    }
  })
}
