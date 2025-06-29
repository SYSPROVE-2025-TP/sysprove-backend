const Defecto = require('../models/Defecto');

// Crear un defecto
exports.crearDefecto = async (req, res) => {
  try {
    const defecto = new Defecto(req.body);
    await defecto.save();
    res.status(201).json(defecto);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear defecto', error });
  }
};

// Obtener todos los defectos
exports.obtenerDefectos = async (req, res) => {
  try {
    const defectos = await Defecto.find();
    res.json(defectos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener defectos', error });
  }
};

// Obtener un defecto por ID
exports.obtenerDefectoPorId = async (req, res) => {
  try {
    const defecto = await Defecto.findById(req.params.id);
    if (!defecto) {
      return res.status(404).json({ mensaje: 'Defecto no encontrado' });
    }
    res.json(defecto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el defecto', error });
  }
};

// Actualizar un defecto
exports.actualizarDefecto = async (req, res) => {
  try {
    const defecto = await Defecto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!defecto) {
      return res.status(404).json({ mensaje: 'Defecto no encontrado' });
    }
    res.json(defecto);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar defecto', error });
  }
};

// Eliminar un defecto
exports.eliminarDefecto = async (req, res) => {
  try {
    const defecto = await Defecto.findByIdAndDelete(req.params.id);
    if (!defecto) {
      return res.status(404).json({ mensaje: 'Defecto no encontrado' });
    }
    res.json({ mensaje: 'Defecto eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el defecto', error });
  }
};
