const { Schema, model } = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
 
const User = new Schema({
  isAdmin: false
})

User.plugin(passportLocalMongoose)

module.exports = model('User', User)