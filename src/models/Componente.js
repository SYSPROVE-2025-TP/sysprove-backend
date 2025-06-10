const mongoose = require('mongoose');

const componenteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    enum: ['Solicitado', 'No solicitado'],
    default: 'No solicitado',
  },
  estimacionSolicitada: {
    type: Boolean,
    default: false,
  },
  descripcion: {
    type: String,
    default: '',
  }
}, { timestamps: true });

module.exports = mongoose.model('Componente', componenteSchema);
