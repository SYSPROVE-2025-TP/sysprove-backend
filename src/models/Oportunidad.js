const mongoose = require('mongoose');

const oportunidadSchema = new mongoose.Schema({
  cliente: String,
  proyecto: String,
  estado: String,
  fechaAsignacion: Date,
  responsable: String
});

module.exports = mongoose.model('Oportunidad', oportunidadSchema);
