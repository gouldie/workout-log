const mongoose = require('mongoose')

const RoutineSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  name: String,
  desc: String,
  days: Object
}, { versionKey: false })

RoutineSchema.statics.findByStringId = function (id) {
  return this.findById({ _id: mongoose.Types.ObjectId(id) })
}

module.exports = mongoose.model('Routine', RoutineSchema)
