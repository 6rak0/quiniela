const { Schema, model } = require('mongoose')

const Partido = new Schema({
  torneo: String,
  jornada: Number,
  id: Number,
  fecha: Number,
  local: {
    equipo: String,
    corto: String,
    goles: Number
  },
  visita: {
    equipo: String,
    corto: String,
    goles: Number
  },
  resultado: String
})

model('Partido', Partido)