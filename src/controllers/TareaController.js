// controllers/tareaController.js
const Tarea = require('../models/Tarea'); // Modelo de la tarea

// Crear una nueva tarea
exports.crearTarea = async (req, res) => {
  try {
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.status(201).json(tarea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las tareas de un proyecto
exports.obtenerTareas = async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.status(200).json(tareas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener una tarea por ID
exports.obtenerTareaPorId = async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id);
    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json(tarea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar una tarea
exports.actualizarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json(tarea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una tarea
exports.eliminarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndDelete(req.params.id);
    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
