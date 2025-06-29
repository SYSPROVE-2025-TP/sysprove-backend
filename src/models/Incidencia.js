const mongoose = require('mongoose');

const SeguimientoSchema = new mongoose.Schema({
  autor: {
    type: String,
    required: true
  },
  comentario: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

const IncidenciaSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  categoria: {
    type: String,
    required: true,
    enum: ['Hardware', 'Software', 'Red', 'Servicio', 'Otro']
  },
  descripcion: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    enum: ['Abierto', 'En Proceso', 'Resuelto', 'Cerrado'],
    default: 'Abierto'
  },
  fechaReporte: {
    type: Date,
    required: true
  },
  documentos: [{
    type: String // Rutas a los archivos subidos
  }],
  seguimiento: [SeguimientoSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Incidencia', IncidenciaSchema);
