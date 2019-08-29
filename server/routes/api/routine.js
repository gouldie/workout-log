const RoutineController = require('../../controllers/routines')

require('express-async-errors')

module.exports = (app) => {
  app.get('/api/routines', RoutineController.getRoutines)
  app.get('/api/routine', RoutineController.getRoutine)
  app.post('/api/routine', RoutineController.validate('addRoutine'), RoutineController.addRoutine)
  app.post('/api/routine/exercise', RoutineController.validate('addExercise'), RoutineController.addExercise)
}
