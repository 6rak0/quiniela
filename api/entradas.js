const router = require('express').Router();
const Entrada = require('mongoose').model('Entrada');
const { validateJWT } = require('../lib/uitls');

// --- POST ---

router.post('/add', validateJWT, (req, res) => {
  const { pred, jornada } = req.body;
  const { username } = req.user;
  const newEntrada = new Entrada({ username, jornada, pred, puntos: null });
  Entrada.findOne({ username: username, jornada: jornada })
    .then(data => {
      if (data) res.status(200).json({ success: false, message: 'entrada existente' })
      else {
        newEntrada
          .save()
          .then((data) =>
            res
              .status(201)
              .json({ success: true, message: 'entrada creada correctamente', data })
          )
          .catch((err) => res.json({ message: err.message }));
      }
    })
    .catch(err => console.log(err))
});

// --- GET ---

router.get('/jornada/:jornada', validateJWT, (req, res) => {
  Entrada.find({ jornada: req.params.jornada })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.json({ success: true, message: err.message }));
});

router.get('/jornada/:jornada/:username', validateJWT, (req, res) => {
  Entrada.find({ jornada: req.params.jornada, username: req.params.username })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.json({ success: true, message: err.message }));
});

module.exports = router;
