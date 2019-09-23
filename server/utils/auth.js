const User = require('../models/User')

const signedIn = req => req.user

const ensureSignedIn = req => {
  if (!signedIn(req)) {
    throw new Error('You must be signed in.')
  }
}

const ensureSignedOut = req => {
  if (signedIn(req)) {
    throw new Error('You are already signed in.')
  }
}

const attemptSignIn = async (username, password) => {
  const message = 'Incorrect username or password. Please try again.'

  const user = await User.findOne({ username })

  if (!user || !await user.matchesPassword(password)) {
    throw new Error(message)
  }

  return user
}

const signOut = (req, res) => new Promise((resolve, reject) => {
  req.session.destroy(err => {
    if (err) reject(err)

    res.clearCookie('connect.sid')
    return res.json({ success: true })
    resolve(true)
  })
})

module.exports = {
  ensureSignedIn,
  ensureSignedOut,
  attemptSignIn,
  signOut
}
