const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/partidos', require('./partidos'))
//router.use('/', require('./jornadas'))

module.exports = router