const mongoose = require('mongoose');

const ContactoSchema = new mongoose.Schema({
  nombres: String,
  apellidos: String,
  correo: String,
  telefono: String,
  empresa: String,
  servicioInteres: String,
  subcategoria: String,
  mensaje: String,
  fechaEnvio: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contacto', ContactoSchema);
