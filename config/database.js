const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

mongoose.connect(process.env.DB_DEV, options)
mongoose.connection.on('connected', (err) => {
  if (err) return console.log(err);
  console.log('base de datos lista y conectada')
})