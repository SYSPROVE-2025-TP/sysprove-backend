//\src\models\Escalamiento.js

const mongoose = require('mongoose');

const escalamientoSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    responsable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    proyecto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProyectoDesarrollo',
      required: true,
    },
    comentarioEscalamiento: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Crea createdAt y updatedAt automáticamente
  }
);

module.exports = mongoose.model('Escalamiento', escalamientoSchema);