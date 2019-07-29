import { hash, compare } from 'bcryptjs'
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    address: String,
    verified: Boolean
  },
  password: String
})

UserSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10)
  }
})

UserSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
