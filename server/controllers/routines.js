const Routine = require('../models/Routine')
const { ensureSignedIn } = require('../utils/auth')
const { body, query } = require('express-validator')
const { validationResult } = require('express-validator')

async function getRoutines (req, res) {
  ensureSignedIn(req)

  const routines = await Routine.find({ userId: req.user._id })

  return res.json({
    success: true,
    routines
  })
}

async function getRoutine (req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next({ message: errors.array()[0].msg })
  }

  ensureSignedIn(req)

  const { routineId } = req.query

  return res.json({
    success: true,
    routine: await Routine.findByStringId(routineId)
  })
}

async function addRoutine (req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next({ message: errors.array()[0].msg })
  }

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
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next({ message: errors.array()[0].msg })
  }

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

  newRoutine.save(err => {
    if (err) {
      next({ message: err })
      return
    }

    return res.json({
      success: true
    })
  })
}

async function editName (req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next({ message: errors.array()[0].msg })
  }

  ensureSignedIn(req)

  const { routineId, name } = req.body

  const newRoutine = await Routine.findOneAndUpdate({ userId: req.user._id, _id: routineId }, { name }, { new: true })

  return res.json({
    success: true,
    routine: newRoutine
  })
}

function validate (method) {
  switch (method) {
    case 'getRoutine': {
      return [
        query('routineId', 'Invalid Routine ID').exists().isString().isLength({ max: 50 })
      ]
    }
    case 'addRoutine': {
      return [
        body('name', 'Name required').exists().isString().isLength({ max: 50 }),
        body('desc', 'Desc invalid').optional().isString().isLength({ max: 500 }),
        body('days', 'Days required').exists().isArray().isIn(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']).isLength({ max: 7 })
      ]
    }
    case 'addExercise': {
      return [
        body('routineId', 'Routine ID required').exists().isString().isLength({ max: 50 }),
        body('exercise', 'Exercise required').exists().isString().isLength({ max: 50 }),
        body('day', 'Day required').exists().isString().isIn(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']),
        body('sets', 'Sets invalid').optional().isInt(),
        body('reps', 'Reps invalid').optional().isInt()
      ]
    }
    case 'editName': {
      return [
        body('routineId', 'Routine ID required').exists().isString().isLength({ max: 50 }),
        body('name', 'Name required').exists().isString().isLength({ max: 50 })
      ]
    }
  }
}

module.exports = {
  validate,
  getRoutine,
  getRoutines,
  addRoutine,
  addExercise,
  editName
}
