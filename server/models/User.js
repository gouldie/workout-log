const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  email: {
    address: String,
    verified: Boolean
  },
  password: String
})

UserSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcryptjs.hash(this.password, 10)
  }
})

UserSchema.methods.matchesPassword = function (password) {
  return bcryptjs.compare(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
