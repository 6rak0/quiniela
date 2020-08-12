const router = require('express').Router()
const Partido = require('mongoose').model('Partido')
const { validateJWT, determinaResultado, puntos, isAdmin } = require('../lib/uitls')

// --- GET ---

router.get('/', (req, res) => {
  Partido.find()
    .then(data => {
      res.status(200).json(data)
    }).catch(err => res.json(err))
})

router.get('/:jornada', (req, res) => {
  const filter = { jornada: req.params.jornada }
  Partido.find(filter)
    .then(data => {
      res.status(200).json(data)
    }).catch(err => res.json(err))
})

router.get('/:jornada/:id', (req, res) => {
  const filter = { jornada: req.params.jornada, id: req.params.id }
  Partido.find(filter)
    .then(data => {
      res.status(200).json(data)
    }).catch(err => res.json(err))
})

// --- POST --- 

router.post('/add-jornada', validateJWT, (req, res) => {
  const jornada = req.body.jornada
  jornada.forEach(partido => {
    const newPartido = new Partido(partido)
    newPartido.save()
      .then()
      .catch(err => console.log(err))
  })
  res.status(201).json({ success: true, message: 'jornada creada exitosamente' })
})

// --- PUT ---

router.put('/update/:jornada/:id', validateJWT, isAdmin, (req, res) => {
  const { gl, gv } = req.body
  const resultado = determinaResultado(gl, gv)
  const filter = { jornada: req.params.jornada, id: req.params.id }
  const update = { 'local.goles': gl, 'visita.goles': gv, resultado: determinaResultado(gl, gv) }
  const options = { new: true, useFindAndModify: false }
  Partido.findOneAndUpdate(filter, update, options)
    .then(data => {
      puntos(req.params.jornada, req.params.id, resultado)
      res.status(200).json({ success: true, message: 'partido actualizado', data })
    })
    .catch(err => res.status(204).json({ success: false, message: 'no actualizado', err }))
})

module.exports = router