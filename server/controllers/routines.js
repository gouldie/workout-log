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

async function addExercise (req, res, next) {
  // todo: validation

  ensureSignedIn(req)

  const { exercise, routineId, day, sets = 3, reps = 10 } = req.body

  const routine = await Routine.findOne({ _id: routineId })

  if (!routine) {
    return next({ message: 'Routine not found' })
  }

  routine.days[day] = [
    ...routine.days[day],
    {
      exercise,
      sets,
      reps
    }
  ]

  const newRoutine = new Routine(routine)

  console.log('inserting', newRoutine)

  newRoutine.save(err => {
    if (err) {
      console.log('err', err)
      next({ message: err })
      return
    }

    console.log('saved')

    return res.json({
      success: true
    })
  })
}

module.exports = {
  getRoutines,
  addRoutine,
  addExercise
}
