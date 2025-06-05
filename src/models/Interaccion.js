const mongoose = require('mongoose');

const interaccionSchema = new mongoose.Schema({
  nombre: String,
  empresa: String,
  email: String,
  tipo: {
    type: String,
    enum: ['Llamada', 'Reunión', 'Correo', 'Otro']
  },
  fecha: Date,
  resumen: String
});

module.exports = mongoose.model('Interaccion', interaccionSchema);
