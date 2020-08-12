const { Schema, model } = require('mongoose')

const Jornada = new Schema({
  torneo: String,
  numero: Number,
  inicio: Number,
  fin: Number,
  partidos: Array,
})

model('Jornada', Jornada)