// src/controllers/sprintController.js

const Sprint = require('../models/Sprint');
const ProyectoDesarrollo = require('../models/ProyectoDesarrollo');
const BacklogItem = require('../models/BacklogItem');

// @desc    Crear un nuevo Sprint para un proyecto de desarrollo
// @route   POST /api/proyectos-desarrollo/:proyectoId/sprints
// @access  Private
exports.crearSprint = async (req, res) => {
  const { proyectoId } = req.params;
  const { nombre, objetivo, fechaInicio, fechaFin } = req.body;

  try {
    // 1. Validar que el proyecto de desarrollo exista
    const proyecto = await ProyectoDesarrollo.findById(proyectoId);
    if (!proyecto) {
      return res.status(404).json({ mensaje: 'Proyecto de desarrollo no encontrado.' });
    }

    // 2. Crear el nuevo Sprint
    const nuevoSprint = new Sprint({
      proyectoDesarrollo: proyectoId,
      nombre,
      objetivo,
      fechaInicio,
      fechaFin,
    });

    const sprintGuardado = await nuevoSprint.save();

    // 3. Añadir la referencia del nuevo sprint al proyecto
    proyecto.sprints.push(sprintGuardado._id);
    await proyecto.save();

    res.status(201).json({
      mensaje: 'Sprint creado y añadido al proyecto correctamente.',
      sprint: sprintGuardado,
    });

  } catch (error) {
    console.error('Error al crear el sprint:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ mensaje: error.message });
    }
    res.status(500).json({ mensaje: 'Error del servidor.' });
  }
};

// @desc    Obtener todos los Sprints de un proyecto
// @route   GET /api/proyectos-desarrollo/:proyectoId/sprints
// @access  Private
exports.obtenerSprintsPorProyecto = async (req, res) => {
  try {
    const sprints = await Sprint.find({ proyectoDesarrollo: req.params.proyectoId })
      .sort({ fechaInicio: -1 }); // Ordenar por más reciente

    res.json(sprints);
  } catch (error) {
    console.error('Error al obtener los sprints:', error);
    res.status(500).json({ mensaje: 'Error del servidor.' });
  }
};

// @desc    Obtener un Sprint por su ID
// @route   GET /api/sprints/:sprintId
// @access  Private
exports.obtenerSprintPorId = async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.sprintId)
      .populate({
        path: 'itemsComprometidos',
        populate: {
          path: 'asignadoA',
          select: 'nombres apellidos'
        }
      });

    if (!sprint) {
      return res.status(404).json({ mensaje: 'Sprint no encontrado.' });
    }
    res.json(sprint);
  } catch (error) {
    console.error('Error al obtener el sprint por ID:', error);
    res.status(500).json({ mensaje: 'Error del servidor.' });
  }
};

// @desc    Actualizar un Sprint
// @route   PUT /api/sprints/:sprintId
// @access  Private
exports.actualizarSprint = async (req, res) => {
  try {
    const sprint = await Sprint.findByIdAndUpdate(
      req.params.sprintId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!sprint) {
      return res.status(404).json({ mensaje: 'Sprint no encontrado.' });
    }

    res.json({
      mensaje: 'Sprint actualizado correctamente.',
      sprint,
    });
  } catch (error) {
    console.error('Error al actualizar el sprint:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ mensaje: error.message });
    }
    res.status(500).json({ mensaje: 'Error del servidor.' });
  }
};

// @desc    Eliminar un Sprint
// @route   DELETE /api/sprints/:sprintId
// @access  Private
exports.eliminarSprint = async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.sprintId);

    if (!sprint) {
      return res.status(404).json({ mensaje: 'Sprint no encontrado.' });
    }
    
    // Antes de eliminar, desasociar los items del backlog que pertenecen a este sprint
    await BacklogItem.updateMany(
        { _id: { $in: sprint.itemsComprometidos } },
        { $set: { sprint: null, estadoGeneral: 'Listo para Sprint' } } // O devolver a 'Refinado'
    );
    
    // Quitar la referencia del sprint del proyecto de desarrollo
    await ProyectoDesarrollo.findByIdAndUpdate(
      sprint.proyectoDesarrollo,
      { $pull: { sprints: sprint._id } }
    );

    // Eliminar el sprint
    await sprint.deleteOne();

    res.json({ mensaje: 'Sprint eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar el sprint:', error);
    res.status(500).json({ mensaje: 'Error del servidor.' });
  }
};