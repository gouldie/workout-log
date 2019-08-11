const mongoose = require('mongoose')

const RoutineSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  days: {
    MON: Array,
    TUE: Array,
    WED: Array,
    THU: Array,
    FRI: Array,
    SAT: Array,
    SUN: Array
  }
}, { versionKey: false })

module.exports = mongoose.model('Routine', RoutineSchema)
