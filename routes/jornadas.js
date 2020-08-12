const router = require('express').Router()
const Jornada = require('mongoose').model('Jornada')
const { extractUser, isAuth, isAdmin } = require('../lib/utils')

// ---GET---

router.get('/:torneo', (req, res) => {
  Jornada.find({ torneo: req.params.torneo })
  .then(data => res.json(data))
  .catch(err => {
    res.json({ message : err.message })
  })
  .finally(() => res.status(200))
})

router.get('/:torneo/:jornada', (req, res) => {
  Jornada.find({ torneo: req.params.torneo, numero: req.params.jornada })
  .then(data => res.json(data))
  .catch(err => {
    res.json({ message : err.message })
  })
  .finally(() => res.status(200))
})

router.get('/:torneo/:jornada/:partido', async (req, res) => {
  const numero = req.params.partido-1
  try {
    let partido = await Jornada.find({ torneo: req.params.torneo, numero: req.params.jornada })
    partido = partido[0].partidos[numero]
    res.status(200).json(partido)
  } catch (error) {
    res.json({msg: error.message})
  }
})

// ---POST---

router.post('/update', (req, res) => {
  const newJornada = new Jornada({
    torneo: req.body.torneo,
    numero: req.body.numero,
    inicio: req.body.inicio,
    fin: req.body.fin,
    partidos : req.body.partidos
  })
  newJornada.save()
  .then((data) => res.json(data))
  .catch(err => {
    res.json({message : err.message})
  })
  .finally(() => res.status(200).json({ success: true, msg: 'jornada creada correctamente' }))
})

router.post('/update/:jornada/:partido', async (req, res) => {
  const numero = req.params.partido-1
  
})

module.exports = router