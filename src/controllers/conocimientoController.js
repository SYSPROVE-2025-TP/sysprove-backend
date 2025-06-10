const mongoose = require('mongoose');
const BaseConocimiento = require('../models/BasedeConocimiento');

exports.crearPropuesta = async (req, res) => {
  try {
    const { titulo, descripcion, etiquetas, archivoUrl, anonimo, creadoPor } = req.body;

    const propuesta = new BaseConocimiento({
      titulo,
      descripcion,
      etiquetas,
      archivoUrl,
      anonimo,
      creadoPor,
    });

    await propuesta.save();

    res.status(201).json({
      mensaje: 'Propuesta creada correctamente',
      propuesta,
    });
  } catch (error) {
    console.error('Error al crear la propuesta:', error);
    res.status(500).json({ mensaje: 'Error al crear la propuesta' });
  }
};

exports.obtenerPropuestas = async (req, res) => {
  try {
    const propuestas = await BaseConocimiento.find().populate('creadoPor', 'nombres apellidos');
    res.json(propuestas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las propuestas' });
  }
};

exports.obtenerPropuestaPorId = async (req, res) => {
  try {
    const propuesta = await BaseConocimiento.findById(req.params.id).populate('creadoPor', 'nombres apellidos');
    if (!propuesta) {
      return res.status(404).json({ mensaje: 'Propuesta no encontrada' });
    }
    res.json(propuesta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener la propuesta' });
  }
};

exports.actualizarPropuesta = async (req, res) => {
  try {
    const { id } = req.params;
    const propuestaActualizada = await BaseConocimiento.findByIdAndUpdate(id, req.body, { new: true });

    if (!propuestaActualizada) {
      return res.status(404).json({ mensaje: 'Propuesta no encontrada' });
    }

    res.json({
      mensaje: 'Propuesta actualizada correctamente',
      propuesta: propuestaActualizada,
    });
  } catch (error) {
    console.error('Error al actualizar la propuesta:', error);
    res.status(500).json({ mensaje: 'Error al actualizar la propuesta' });
  }
};

exports.eliminarPropuesta = async (req, res) => {
  try {
    const propuesta = await BaseConocimiento.findByIdAndDelete(req.params.id);
    if (!propuesta) {
      return res.status(404).json({ mensaje: 'Propuesta no encontrada' });
    }
    res.json({ mensaje: 'Propuesta eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la propuesta' });
  }
};

exports.buscarPropuestas = async (req, res) => {
  try {
    const { palabra, etiqueta } = req.query;

    let filtros = {};

    if (palabra) {
      filtros.$or = [
        { titulo: { $regex: palabra, $options: 'i' } },
        { descripcion: { $regex: palabra, $options: 'i' } },
      ];
    }

    if (etiqueta) {
      filtros.etiquetas = etiqueta;
    }

    const propuestas = await BaseConocimiento.find(filtros).populate('creadoPor', 'nombres apellidos');

    res.json(propuestas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al buscar propuestas' });
  }
};