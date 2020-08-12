const { Schema, model } = require('mongoose')

const User = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hash: String,
  salt: String,
  isAdmin: {
    type: Boolean,
    default: false
  }
})

model('User', User)