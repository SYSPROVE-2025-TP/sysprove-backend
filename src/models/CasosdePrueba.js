const mongoose = require('mongoose');

const casoDePruebaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  tipo: { type: String, enum: ['Funcional', 'Integración'], required: true },
  estado: { type: String, enum: ['Pendiente', 'En progreso', 'Completado'], default: 'Pendiente' },
  prioridad: { type: String, enum: ['Alta', 'Media', 'Baja'], default: 'Media' },
  fechaEjecucion: { type: Date, required: true },
  responsable: { type: String, required: true },
});

module.exports = mongoose.model('CasoDePrueba', casoDePruebaSchema);
