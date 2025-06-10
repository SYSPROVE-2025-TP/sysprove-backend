// EN: models/Cotizacion.js
const mongoose = require("mongoose");

const CotizacionSchema = new mongoose.Schema({
  propuesta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Propuesta", // CORREGIDO de "propuestas" a "Propuesta"
    required: true
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",   // CORREGIDO de "clientes" a "Cliente"
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