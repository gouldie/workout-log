const RoutineController = require('../../controllers/routines')

require('express-async-errors')

module.exports = (app) => {
  app.get('/api/routines', RoutineController.getRoutines)
}
