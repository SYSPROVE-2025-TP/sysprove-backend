const mongoose = require('mongoose');

const repoPropuestaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cliente: { type: String, required: true },
  descripcion: { type: String },
  fechaInicio: { type: Date },
  fechaFin: { type: Date },
  tipo: { type: String, enum: ['PDF', 'DOCX', 'XLSX'], required: true },
  estado: { type: String, enum: ['Activo', 'Inactivo', 'Pendiente'], default: 'Pendiente' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Repopropuesta', repoPropuestaSchema);
