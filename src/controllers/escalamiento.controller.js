//src\controllers\escalamiento.controller.js

const Escalamiento = require('../models/Escalamiento');

// Crear un nuevo escalamiento
const crearEscalamiento = async (req, res) => {
  try {
    const { titulo, descripcion, responsable, proyecto, comentarioEscalamiento } = req.body;

    const nuevoEscalamiento = new Escalamiento({
      titulo,
      descripcion,
      responsable,
      proyecto,
      comentarioEscalamiento,
    });

    await nuevoEscalamiento.save();

    res.status(201).json({ message: 'Escalamiento creado correctamente', data: nuevoEscalamiento });
  } catch (error) {
    console.error('Error al crear escalamiento:', error);
    res.status(500).json({ message: 'Error al crear escalamiento', error });
  }
};

// Obtener todos los escalamientos
const obtenerEscalamientos = async (req, res) => {
  try {
    const escalamientos = await Escalamiento.find()
      .populate('responsable', 'nombres')
      .populate('proyecto', 'nombre')
      .sort({ createdAt: -1 });

    res.status(200).json(escalamientos);
  } catch (error) {
    console.error('Error al obtener escalamientos:', error);
    res.status(500).json({ message: 'Error al obtener escalamientos', error });
  }
};

module.exports = {
  crearEscalamiento,
  obtenerEscalamientos,
};