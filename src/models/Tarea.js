// models/Tarea.js
const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  prioridad: { type: String, enum: ['Alta', 'Media', 'Baja'], default: 'Media' },
  estado: { type: String, enum: ['Pendiente', 'En progreso', 'Completada'], default: 'Pendiente' },
  responsable: { type: String, required: true }, // Responsable de la tarea
  fechaVencimiento: { type: Date, required: true }
});

module.exports = mongoose.model('Tarea', tareaSchema);
