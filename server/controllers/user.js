const User = require('../models/User')
const auth = require('../utils/auth')

const { ensureSignedIn, ensureSignedOut } = auth

function login (req, res, next) {
  ensureSignedOut(req)
  return res.json({ success: true, user: req.user })
}

async function signup (req, res, next) {
  ensureSignedOut(req)
  const { email, password } = req.body

  const user = await User.findOne({ 'email.address': email })

  if (user) throw new Error(`Sorry, already a user with the email: ${email}`)

  const newUser = new User({
    email: {
      address: email,
      verified: false
    },
    password
  })

  await newUser.save()

  req.login(newUser, err => {
    if (err) next(err)
    return res.json(newUser)
  })
}

function logout (req, res) {
  ensureSignedIn(req)
  req.session.destroy()
  res.clearCookie('connect.sid') // clean up!
  return res.json({ message: 'logging you out' })
}

module.exports = {
  login,
  signup,
  logout
}
