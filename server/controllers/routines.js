const Routine = require('../models/Routine')
const { ensureSignedIn } = require('../utils/auth')

async function getRoutines (req, res) {
  ensureSignedIn(req)

  const routines = await Routine.find({ userId: req.user._id })

  return res.json({
    success: true,
    routines
  })
}

async function addRoutine (req, res) {
  // todo: validation

  ensureSignedIn(req)

  const days = {}
  req.body.days.forEach(d => {
    days[d] = []
  })

  await Routine.create({ userId: req.user._id, name: req.body.name, desc: req.body.desc, days })

  return res.json({
    success: true
  })
}

module.exports = {
  getRoutines,
  addRoutine
}
