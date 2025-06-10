// src/controllers/backlogItemController.js

const BacklogItem = require('../models/BacklogItem');
const ProyectoDesarrollo = require('../models/ProyectoDesarrollo');

// @desc    Crear un nuevo Backlog Item para un proyecto de desarrollo
// @route   POST /api/proyectos-desarrollo/:proyectoId/backlog-items
// @access  Private
exports.crearBacklogItem = async (req, res) => {
  const { proyectoId } = req.params;
  const {
    nombre,
    descripcion,
    tipo,
    prioridad,
    estimacionPuntos,
    criteriosAceptacion,
  } = req.body;

  try {
    // 1. Verificar que el proyecto de desarrollo exista
    const proyecto = await ProyectoDesarrollo.findById(proyectoId);
    if (!proyecto) {
      return res.status(404).json({ mensaje: 'Proyecto de desarrollo no encontrado.' });
    }

    // 2. Crear el nuevo Backlog Item
    const nuevoBacklogItem = new BacklogItem({
      proyectoDesarrollo: proyectoId,
      nombre,
      descripcion,
      tipo,
      prioridad,
      estimacionPuntos,
      criteriosAceptacion,
      reportadoPor: req.usuario.id, // Asumimos que authMiddleware añade el usuario a req
    });

    const backlogItemGuardado = await nuevoBacklogItem.save();

    // 3. Añadir la referencia del nuevo item al array productBacklog del proyecto
    proyecto.productBacklog.push(backlogItemGuardado._id);
    await proyecto.save();

    res.status(201).json({
      mensaje: 'Ítem del backlog creado y añadido al proyecto correctamente.',
      backlogItem: backlogItemGuardado,
    });

  } catch (error) {
    console.error('Error al crear el ítem del backlog:', error);
    if (error.name === 'ValidationError') {
      const mensajes = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ mensaje: 'Error de validación', errores: mensajes });
    }
    res.status(500).json({ mensaje: 'Error del servidor.' });
  }
};

// @desc    Obtener todos los Backlog Items de un proyecto
// @route   GET /api/proyectos-desarrollo/:proyectoId/backlog-items
// @access  Private
exports.obtenerBacklogItemsPorProyecto = async (req, res) => {
  try {
    // Verificar que el proyecto exista (opcional, pero buena práctica)
    const proyecto = await ProyectoDesarrollo.findById(req.params.proyectoId);
    if (!proyecto) {
      return res.status(404).json({ mensaje: 'Proyecto de desarrollo no encontrado.' });
    }

    const backlogItems = await BacklogItem.find({ proyectoDesarrollo: req.params.proyectoId })
      .populate('reportadoPor', 'nombres apellidos')
      .populate('asignadoA', 'nombres apellidos')
      .sort({ prioridad: 1, createdAt: 1 }); // Ordenar por prioridad y luego por fecha

    res.json(backlogItems);
  } catch (error) {
    console.error('Error al obtener los ítems del backlog:', error);
    res.status(500).json({ mensaje: 'Error del servidor.' });
  }
};

// @desc    Obtener un Backlog Item por su ID
// @route   GET /api/backlog-items/:itemId
// @access  Private
exports.obtenerBacklogItemPorId = async (req, res) => {
  try {
    const backlogItem = await BacklogItem.findById(req.params.itemId)
      .populate('proyectoDesarrollo', 'nombre')
      .populate('reportadoPor', 'nombres apellidos')
      .populate('asignadoA', 'nombres apellidos')
      .populate('sprint', 'nombre estado')
      .populate('comentarios.usuario', 'nombres apellidos'); // Poblar usuario de los comentarios

    if (!backlogItem) {
      return res.status(404).json({ mensaje: 'Ítem del backlog no encontrado.' });
    }
    res.json(backlogItem);
  } catch (error) {
    console.error('Error al obtener el ítem del backlog por ID:', error);
    res.status(500).json({ mensaje: 'Error del servidor.' });
  }
};

// @desc    Actualizar un Backlog Item
// @route   PUT /api/backlog-items/:itemId
// @access  Private
exports.actualizarBacklogItem = async (req, res) => {
  try {
    const backlogItem = await BacklogItem.findByIdAndUpdate(
      req.params.itemId,
      req.body, // El body puede contener cualquier campo del schema que se quiera actualizar
      { new: true, runValidators: true } // new:true devuelve el doc actualizado
    );

    if (!backlogItem) {
      return res.status(404).json({ mensaje: 'Ítem del backlog no encontrado.' });
    }

    res.json({
      mensaje: 'Ítem del backlog actualizado correctamente.',
      backlogItem,
    });
  } catch (error) {
    console.error('Error al actualizar el ítem del backlog:', error);
    if (error.name === 'ValidationError') {
      const mensajes = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ mensaje: 'Error de validación', errores: mensajes });
    }
    res.status(500).json({ mensaje: 'Error del servidor.' });
  }
};

// @desc    Eliminar un Backlog Item
// @route   DELETE /api/backlog-items/:itemId
// @access  Private
exports.eliminarBacklogItem = async (req, res) => {
  try {
    const backlogItem = await BacklogItem.findById(req.params.itemId);

    if (!backlogItem) {
      return res.status(404).json({ mensaje: 'Ítem del backlog no encontrado.' });
    }

    const proyectoId = backlogItem.proyectoDesarrollo;

    // Eliminar el ítem
    await backlogItem.deleteOne();

    // Quitar la referencia del ítem del array productBacklog del proyecto
    await ProyectoDesarrollo.findByIdAndUpdate(
      proyectoId,
      { $pull: { productBacklog: req.params.itemId } }
    );

    res.json({ mensaje: 'Ítem del backlog eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar el ítem del backlog:', error);
    res.status(500).json({ mensaje: 'Error del servidor.' });
  }
};