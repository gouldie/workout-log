const Routine = require('../models/Routine')
const { ensureSignedIn } = require('../utils/auth')
const { body, query } = require('express-validator')
const { validationResult } = require('express-validator')

async function getRoutines (req, res) {
  // ensureSignedIn(req)

  const query = [
    { private: { $in: [null, false] } }
  ]

  if (req.isAuthenticated()) {
    query.push({ userId: req.user._id })
  }

  // Find routines that are either owned by the user, or not private
  const routines = await Routine.find({ $or: query })

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

  // ensureSignedIn(req)

  const { routineId } = req.query

  const routine = await Routine.findByStringId(routineId)

  if (!routine) {
    return res.json({
      success: false,
      message: 'Routine not found'
    })
  }

  const unauthorized = routine.private && (!req.user || !routine.userId.equals(req.user._id))

  if (unauthorized) {
    return res.json({
      success: false,
      message: 'Routine is private'
    })
  }

  return res.json({
    success: true,
    routine: routine
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

  const routine = await Routine.create({ userId: req.user._id, name: req.body.name, desc: req.body.desc, days })

  return res.json({
    success: true,
    routine
  })
}

async function addExercise (req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next({ message: errors.array()[0].msg })
  }

  ensureSignedIn(req)

  const { exercise, routineId, day, sets = 3, reps = 10 } = req.body

  const routine = await Routine.findOne({ _id: routineId, userId: req.user._id })

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

async function setName (req, res, next) {
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

async function setDescription (req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next({ message: errors.array()[0].msg })
  }

  ensureSignedIn(req)

  const { routineId, description } = req.body

  const newRoutine = await Routine.findOneAndUpdate({ userId: req.user._id, _id: routineId }, { description }, { new: true })

  return res.json({
    success: true,
    routine: newRoutine
  })
}

async function setDay (req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next({ message: errors.array()[0].msg })
  }

  ensureSignedIn(req)

  const { routineId, day, value, adding } = req.body

  const newRoutine = await Routine.findOneAndUpdate({ userId: req.user._id, _id: routineId }, { [`days.${day}`]: value.length > 0 || adding ? value : undefined }, { new: true })

  return res.json({
    success: true,
    routine: newRoutine
  })
}

async function setPrivate (req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next({ message: errors.array()[0].msg })
  }

  const { routineId, isPrivate } = req.body

  const newRoutine = await Routine.findOneAndUpdate({ userId: req.user._id, _id: routineId }, { private: isPrivate }, { new: true })

  return res.json({
    success: true,
    routine: newRoutine
  })
}

async function deleteRoutine (req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next({ message: errors.array()[0].msg })
  }

  ensureSignedIn(req)

  const { id } = req.body

  await Routine.deleteOne({ userId: req.user._id, _id: id })

  return res.json({
    success: true
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
    case 'setName': {
      return [
        body('routineId', 'Routine ID required').exists().isString().isLength({ max: 50 }),
        body('name', 'Name required').exists().isString().isLength({ max: 50 })
      ]
    }
    case 'setDescription': {
      return [
        body('routineId', 'Routine ID required').exists().isString().isLength({ max: 50 }),
        body('description', 'Description required').exists().isString().isLength({ max: 500 })
      ]
    }
    case 'setDay': {
      return [
        body('routineId', 'Routine ID required').exists().isString().isLength({ max: 50 }),
        body('day', 'Day required').exists().isIn(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']),
        body('value', 'Value required').exists().isArray(),
        body('adding', 'Adding invalid').optional().isBoolean()
      ]
    }
    case 'setPrivate': {
      return [
        body('routineId', 'Routine ID required').exists().isString().isLength({ max: 50 }),
        body('isPrivate', 'Private required').exists().isBoolean()
      ]
    }
    case 'deleteRoutine': {
      return [
        body('id', 'Routine ID required').exists().isString().isLength({ max: 50 })
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
  setName,
  setDescription,
  setDay,
  setPrivate,
  deleteRoutine
}
