const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  emisor_id: {
    type: String,
    required: true,
  },
  receptor_id: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ['Positivo', 'Mejora','Negativo'], // puedes ajustar los valores según lo que necesites
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  comentario: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
