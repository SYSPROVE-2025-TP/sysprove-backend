const mongoose = require('mongoose');

const BaseConocimientoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  etiquetas: [{
    type: String,
  }],
  archivoUrl: {
    type: String,
  },
  anonimo: {
    type: Boolean,
    default: false,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  creadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },
});
//API Base de conocimiento;
module.exports = mongoose.model('BaseConocimiento', BaseConocimientoSchema);