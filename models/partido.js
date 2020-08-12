const { Schema, model } = require('mongoose')

const Partido = new Schema({
  torneo: String,
  jornada: Number,
  id: Number,
  fecha: Number,
  local: Object,
  visita: Object,
  resultado: String
})

model('Partido', Partido)