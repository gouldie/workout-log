const RoutineController = require('../../controllers/routines')

require('express-async-errors')

module.exports = (app) => {
  app.get('/api/routines', RoutineController.getRoutines)
  app.get('/api/routine', RoutineController.getRoutine)
  app.post('/api/routine', RoutineController.validate('addRoutine'), RoutineController.addRoutine)
  app.post('/api/routine/exercise', RoutineController.validate('addExercise'), RoutineController.addExercise)
  app.post('/api/routine/name', RoutineController.validate('setName'), RoutineController.setName)
  app.post('/api/routine/description', RoutineController.validate('setDescription'), RoutineController.setDescription)
  app.post('/api/routine/day', RoutineController.validate('setDay'), RoutineController.setDay)
}
