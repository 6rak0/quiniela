const { Schema, model } = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
 
const User = new Schema({
  isAdmin: Boolean
})

User.plugin(passportLocalMongoose)

model('User', User)