const User = require('../models/User')
const auth = require('../utils/auth')

const { ensureSignedIn, ensureSignedOut } = auth

function login (req, res, next) {
  ensureSignedOut()
  return res.json({ success: true, user: req.user })
}

async function signup (req, res, next) {
  ensureSignedOut()
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

function logout (req, res) {
  ensureSignedIn()
  req.session.destroy()
  res.clearCookie('connect.sid') // clean up!
  return res.json({ message: 'logging you out' })
}

module.exports = {
  login,
  signup,
  logout
}
