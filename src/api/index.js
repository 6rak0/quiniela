const router = require('express').Router()
const auth = require('./auth')
const partidos = require('./partidos')

router.use('/auth', auth)
router.use('/partidos', partidos)

module.exports = router