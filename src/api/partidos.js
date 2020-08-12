const router = require('express').Router()
const Partido = require('mongoose').model('Partido')
const { isAuth, isAdmin } = require('../lib/utils')

// ---GET---

router.get('/', isAuth, (req, res) => {
  Partido.find()
  .then(data => res.json(data))
  .catch(err => res.json({msg: err.message}))
  .finally(() => res.status(200))
})

router.get('/:jornada', (req, res) => {
  Partido.find({ jornada: req.params.jornada })
  .then(data => res.json(data))
  .catch(err => res.json({msg: err.message}))
  .finally(() => res.status(200))
})

router.get('/:jornada/:id', async (req, res) => {
  try {
    let partido = await Partido.find({ jornada: req.params.jornada, id: req.params.id })
    res.status(200).json(partido)
  } catch (error) {
    res.json({msg: error.message})
  }
})

// ---POST---

router.post('/agregar', isAdmin, async (req, res) => {
  const partido = req.body
  const newPartido = new Partido(partido)
  try {
    await newPartido.save()
  } catch (err) {
    res.json({message : err.message})
  }
  res.status(200).json(partido)
})

//---PUT---

router.put('/:jornada/:id', (req, res) => {
  Partido.update({jornada: req.params.jornada, id: req.params.id }, req.body, {new:true,useFindAndModify:false})
  .then(data => res.json(data))
  .catch(err => res.json({msg : err.message}))
})

module.exports = router