const mongoose = require('mongoose')

const CounterSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0
  }
}, { versionKey: false })

module.exports = mongoose.model('Counter', CounterSchema)
