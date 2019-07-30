const User = require('../models/User')

function login (req, res, next) {
  return res.json({ success: true, user: req.user })
}

function signup (req, res, next) {
  const { email, password } = req.body

  User.findOne({ 'email.address': email })
    .exec()
    .then(user => {
      if (user) return res.json({ error: `Sorry, already a user with the email: ${email}` })

      const newUser = new User({
        email: {
          address: email,
          verified: false
        },
        password
      })

      newUser.save()
        .then(() => {
          req.login(newUser, err => {
            if (err) next(err)
            return res.json(newUser)
          })
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
}

module.exports = {
  login,
  signup
}
