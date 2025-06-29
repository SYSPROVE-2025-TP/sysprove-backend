const mongoose = require('mongoose');
const { Schema } = mongoose;

const FeedbackVentaSchema = new Schema({
  proyectoId: {
    type: Schema.Types.ObjectId,
    ref: 'ProyectoDesarrollo',
    required: true
  },
  tipoCambio: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  justificacion: {
    type: String,
    required: true
  },
  impacto: {
    type: String,
    required: true
  },
  fechaEstimacion: {
    type: Date
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

// **IMPORTANTE**: exporta el modelo directamente
module.exports = mongoose.model('FeedbackVenta', FeedbackVentaSchema);