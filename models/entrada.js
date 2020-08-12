const { Schema, model } = require('mongoose')

const Entrada = new Schema({
  username: String,
  jornada: Number,
  pred: Array,
  puntos: Number
})

model('Entrada', Entrada)