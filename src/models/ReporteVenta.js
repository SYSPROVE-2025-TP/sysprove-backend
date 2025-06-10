const mongoose = require('mongoose');

const VendedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  creadas: { type: Number, default: 0 },
  ganadas: { type: Number, default: 0 },
  perdidas: { type: Number, default: 0 },
  valorGanado: { type: Number, default: 0 },
  tasaCierre: { type: Number, default: 0 },
  avatar: { type: String },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Vendedor', VendedorSchema);
