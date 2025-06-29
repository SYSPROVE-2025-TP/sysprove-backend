// controllers/casosPrueba.controller.js
const CasoPrueba = require('../models/CasoPrueba');

exports.crearCasoPrueba = async (req, res) => {
  try {
    const nuevoCaso = new CasoPrueba({ ...req.body, creadoPor: req.usuario._id });
    const guardado = await nuevoCaso.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el caso de prueba', error });
  }
};

exports.obtenerCasosPorProyecto = async (req, res) => {
  try {
    const casos = await CasoPrueba.find({ proyectoId: req.params.proyectoId });
    res.json(casos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener casos', error });
  }
};

exports.obtenerCasoPorId = async (req, res) => {
  try {
    const caso = await CasoPrueba.findById(req.params.id);
    res.json(caso);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el caso', error });
  }
};

exports.actualizarCasoPrueba = async (req, res) => {
  try {
    const actualizado = await CasoPrueba.findByIdAndUpdate(
      req.params.id,
      { ...req.body, fechaActualizacion: new Date() },
      { new: true }
    );
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el caso', error });
  }
};

exports.eliminarCasoPrueba = async (req, res) => {
  try {
    await CasoPrueba.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Caso eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el caso', error });
  }
};
