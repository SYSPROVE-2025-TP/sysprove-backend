const mongoose = require('mongoose');

const defectoSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  estado: {
    type: String,
    enum: ['Abierto', 'En Progreso', 'Resuelto'],
    default: 'Abierto',
  },
  fechaReporte: { type: Date, default: Date.now },
  reportadoPor: { type: String, required: true },
  funcionalidad: { type: String },
  captura: { type: String }, // URL o base64
});

module.exports = mongoose.model('Defecto', defectoSchema);
