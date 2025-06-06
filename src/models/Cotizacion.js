// models/Cotizacion.js
const mongoose = require("mongoose");

const CotizacionSchema = new mongoose.Schema({
  propuesta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "propuestas",
    required: true
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "clientes",
    required: true
  },
  pdf: {
    nombreArchivo: String,
    contenido: Buffer,
    tipoContenido: String
  },
  estado: {
    type: String,
    enum: ["Borrador", "Enviada", "Aprobada"],
    default: "Borrador"
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaEnvio: Date,
  destinatarios: [{
    email: String,
    nombre: String
  }]
});

module.exports = mongoose.model("Cotizacion", CotizacionSchema);