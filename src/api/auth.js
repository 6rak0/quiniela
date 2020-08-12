const router = require('express').Router()
const User = require('mongoose').model('User')
const passport = require('passport')
const { extractUser, isAuth } = require('../lib/utils')

// ---POST---

router.post('/signup', async (req, res, next) => {
  const { username, password, isAdmin } = req.body 
  try {
    await User.register({ username, isAdmin }, password)
  } catch (err) {
    if(err.name === 'UserExistsError'){
      return res.status(400).json({ msg: 'Usuario existente' })
    } 
    return res.status(500).json({ msg: 'Ocurrió un error al registrar al usuario' })
  }
  next()  
}, passport.authenticate('local'), (req, res) => res.status(200).json(extractUser(req)))

router.post('/login', passport.authenticate('local'), (req, res) => res.status(200).json(extractUser(req))
);

router.post('/logout', isAuth, (req, res) => {
  req.logout()
  res.status(200).json({ success: true, msg: 'usuario desconectado' })
})

// ---GET---

router.get('/user', (req, res) => {
  if (req.user) {
      res.json(extractUser(req))
  } else {
      res.json({ user: null })
  }
})

//---PUT---

router.put('/update-password', isAuth, (req, res) => {
  const { oldPass , newPass } = req.body
  if(!oldPass || !newPass){
    return res.status(400).json({msg: 'Petición inválida'})
  }
  User.findById(req.user._id)
  .then(user => {
    user.changePassword(oldPass, newPass)
  })
  .then()
  .catch(err => {
    if(err.name === 'IncorrectPasswordError'){
      return res.status(400).json({ msg: `Password incorrecto` })
    }
    return res.status(500).json({ msg: `Ocurrió un error desconocido` })
  })
  .finally(() => res.status(200).json({ msg: `cambio exitoso` }))
})

module.exports = router