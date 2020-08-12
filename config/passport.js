const passport = require('passport')
const User = require('mongoose').model('User')

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

module.exports = (passport) => {
  passport.use(User.createStrategy())
}