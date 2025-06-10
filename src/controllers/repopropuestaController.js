const RepoPropuesta = require('../models/Repopropuesta');

// Crear nueva propuesta
exports.crearPropuesta = async (req, res) => {
  try {
    const propuesta = new RepoPropuesta(req.body);
    await propuesta.save();
    res.status(201).json(propuesta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las propuestas (con filtros)
exports.obtenerPropuestas = async (req, res) => {
  try {
    const { nombre, estado, fechaInicio, fechaFin } = req.query;
    const filtro = {};

    if (nombre) filtro.nombre = new RegExp(nombre, 'i');
    if (estado) filtro.estado = estado;
    if (fechaInicio || fechaFin) {
      filtro.fechaInicio = {};
      if (fechaInicio) filtro.fechaInicio.$gte = new Date(fechaInicio);
      if (fechaFin) filtro.fechaInicio.$lte = new Date(fechaFin);
    }

    const propuestas = await RepoPropuesta.find(filtro);
    res.json(propuestas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar propuesta por ID
exports.eliminarPropuesta = async (req, res) => {
  try {
    const { id } = req.params;
    await RepoPropuesta.findByIdAndDelete(id);
    res.json({ mensaje: 'Propuesta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
