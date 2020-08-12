const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/partidos', require('./partidos'))
router.use('/entradas', require('./entradas'))

module.exports = router