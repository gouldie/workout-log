const User = require('../models/User')
const { ensureSignedIn, ensureSignedOut, signOut } = require('../utils/auth')
const { validationResult } = require('express-validator')
const { body } = require('express-validator')

function login (req, res) {
  return res.json({ success: true, user: req.user })
}

async function signup (req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next({ message: errors.array()[0].msg })
  }

  ensureSignedOut(req)

  const { email, password } = req.body

  const user = await User.findOne({ 'email.address': email })

  if (user) return next({ message: `Sorry, already a user with the email: ${email}` })

  const newUser = new User({
    email: {
      address: email,
      verified: false
    },
    password
  })

  await newUser.save()

  req.login(newUser, err => {
    if (err) return next(err)
    return res.json(newUser)
  })
}

function logout (req, res) {
  ensureSignedIn(req)
  signOut(req, res)
}

function validate (method) {
  switch (method) {
    case 'login': {
      return [
        body('email', 'Email required').exists().isString().isEmail().isLength({ max: 50 }),
        body('password', 'Password required').exists().isString().isLength({ max: 50 })
      ]
    }
    case 'signup': {
      return [
        body('email', 'Email required').exists().isString().isEmail().isLength({ max: 50 }),
        body('password', 'Password required').exists().isString().isLength({ max: 50 })
      ]
    }
  }
}

module.exports = {
  login,
  signup,
  logout,
  validate
}
