const mongoose = require('mongoose')

const RoutineSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  name: String,
  desc: String,
  days: Object
}, { versionKey: false })

module.exports = mongoose.model('Routine', RoutineSchema)
