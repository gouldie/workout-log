const Routine = require('../models/Routine')
const { ensureSignedIn } = require('../utils/auth')

function getRoutines (req, res) {
  ensureSignedIn(req)

  return Routine.find({ userId: req.user._id }).toArray()
}

module.exports = {
  getRoutines
}
