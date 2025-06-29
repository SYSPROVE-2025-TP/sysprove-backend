// models/CasoPrueba.js
const mongoose = require('mongoose');

const CasoPruebaSchema = new mongoose.Schema({
  proyectoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProyectoDesarrollo',
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  descripcion: String,
  pasos: [String],
  resultadoEsperado: String,
  resultadoObtenido: String,
  estado: {
    type: String,
    enum: ['Pendiente', 'En Ejecución', 'Aprobado', 'Fallido'],
    default: 'Pendiente'
  },
  creadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CasoPrueba', CasoPruebaSchema);
