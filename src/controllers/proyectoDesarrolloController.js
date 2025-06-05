// src/controllers/proyectoDesarrolloController.js

const ProyectoDesarrollo = require('../models/ProyectoDesarrollo');
const Contrato = require('../models/Contrato'); // Necesario para validar y obtener datos del contrato
// const Cliente = require('../models/Cliente');   // Para validar/popular cliente
const Usuario = require('../models/Usuario');   // Para validar/popular usuarios del equipo
// const ProyectoVentas = require('../models/Proyecto'); // Si necesitas referenciar el proyecto de ventas

// @desc    Crear un nuevo Proyecto de Desarrollo
// @route   POST /api/proyectos-desarrollo
// @access  Private (requiere autenticación y rol adecuado, ej. Líder de Proyecto, Administrador)
exports.crearProyectoDesarrollo = async (req, res) => {
  // Aquí iría la validación de entradas con express-validator si lo implementas
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errores: errors.array() });
  // }

  const {
    nombre,
    descripcion,
    contratoId, // ID del contrato que origina este proyecto de desarrollo
    // proyectoVentasId, // Opcional, si también se vincula al proyecto de ventas
    fechaInicioEstimada,
    fechaFinEstimada,
    liderTecnicoId,
    arquitectoSolucionesId,
    equipoDesarrolloIds, // Array de IDs de usuarios
    repositorioCodigo,
    entornoDesarrollo,
    entornoPruebasQA,
    entornoProduccion,
  } = req.body;

  try {
    // 1. Validar que el contrato exista y obtener el cliente
    const contratoExistente = await Contrato.findById(contratoId);
    if (!contratoExistente) {
      return res.status(404).json({ mensaje: 'Contrato no encontrado. No se puede crear el proyecto de desarrollo.' });
    }
    const clienteId = contratoExistente.cliente; // Asumimos que el modelo Contrato tiene un campo cliente

    // (Opcional) Validar proyectoVentasId si se proporciona
    // if (proyectoVentasId) {
    //   const proyectoVentasExistente = await ProyectoVentas.findById(proyectoVentasId);
    //   if (!proyectoVentasExistente) {
    //     return res.status(404).json({ mensaje: 'Proyecto de ventas no encontrado.' });
    //   }
    // }

    // 2. Validar que los usuarios (liderTecnico, arquitecto, equipo) existan (opcional pero recomendado)
    if (liderTecnicoId) {
      const lider = await Usuario.findById(liderTecnicoId);
      if (!lider) return res.status(404).json({ mensaje: `Líder técnico con ID ${liderTecnicoId} no encontrado.` });
    }
    if (arquitectoSolucionesId) {
      const arquitecto = await Usuario.findById(arquitectoSolucionesId);
      if (!arquitecto) return res.status(404).json({ mensaje: `Arquitecto de soluciones con ID ${arquitectoSolucionesId} no encontrado.` });
    }
    if (equipoDesarrolloIds && equipoDesarrolloIds.length > 0) {
      const equipoPromises = equipoDesarrolloIds.map(id => Usuario.findById(id));
      const equipo = await Promise.all(equipoPromises);
      if (equipo.some(member => !member)) {
        return res.status(404).json({ mensaje: 'Uno o más miembros del equipo de desarrollo no fueron encontrados.' });
      }
    }

    // 3. Crear la nueva instancia de ProyectoDesarrollo
    const nuevoProyectoDesarrollo = new ProyectoDesarrollo({
      nombre,
      descripcion,
      contrato: contratoId,
      cliente: clienteId, // Asignamos el cliente del contrato
      // proyectoVentas: proyectoVentasId, // Si se usa
      fechaInicioEstimada,
      fechaFinEstimada,
      liderTecnico: liderTecnicoId,
      arquitectoSoluciones: arquitectoSolucionesId,
      equipoDesarrollo: equipoDesarrolloIds || [],
      repositorioCodigo,
      entornoDesarrollo,
      entornoPruebasQA,
      entornoProduccion,
      // estadoDesarrollo se establecerá a 'Planificación' por defecto según el modelo
    });

    // 4. Guardar en la base de datos
    const proyectoGuardado = await nuevoProyectoDesarrollo.save();

    // 5. Poblar campos para la respuesta (opcional, pero útil para el frontend)
    const proyectoDesarrolloCompleto = await ProyectoDesarrollo.findById(proyectoGuardado._id)
      .populate('contrato', 'descripcion monto estado') // Campos del contrato a mostrar
      .populate('cliente', 'nombre rubro') // Campos del cliente a mostrar
      .populate('liderTecnico', 'nombres apellidos correo') // Campos del usuario a mostrar
      .populate('arquitectoSoluciones', 'nombres apellidos correo')
      .populate('equipoDesarrollo', 'nombres apellidos correo');

    res.status(201).json({
      mensaje: 'Proyecto de desarrollo creado correctamente.',
      proyectoDesarrollo: proyectoDesarrolloCompleto,
    });

  } catch (error) {
    console.error('Error al crear proyecto de desarrollo:', error);
    // Manejo de errores de validación de Mongoose
    if (error.name === 'ValidationError') {
      const mensajes = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ mensaje: 'Error de validación', errores: mensajes });
    }
    res.status(500).json({ mensaje: 'Error del servidor al crear el proyecto de desarrollo.' });
  }
};
// @desc    Obtener todos los Proyectos de Desarrollo
// @route   GET /api/proyectos-desarrollo
// @access  Private
exports.obtenerProyectosDesarrollo = async (req, res) => {
  try {
    const proyectosDesarrollo = await ProyectoDesarrollo.find()
      .populate({
          path: 'cliente',
          select: 'nombre' // Selecciona solo el campo nombre del cliente
      })
      .populate({
          path: 'liderTecnico',
          select: 'nombres apellidos' // Selecciona los campos necesarios del usuario
      })
      .populate('contrato', 'descripcion') // Esto está bien como estaba
      .sort({ createdAt: -1 });

    res.json(proyectosDesarrollo);
  } catch (error) {
    console.error('Error al obtener proyectos de desarrollo:', error);
    res.status(500).json({ mensaje: 'Error del servidor.' });
  }
};

// @desc    Obtener un Proyecto de Desarrollo por ID
// @route   GET /api/proyectos-desarrollo/:id
// @access  Private
exports.obtenerProyectoDesarrolloPorId = async (req, res) => {
  try {
    const proyectoDesarrollo = await ProyectoDesarrollo.findById(req.params.id)
      .populate('cliente', 'nombre representante')
      .populate('contrato') // Poblar contrato completo o campos específicos
      .populate('liderTecnico', 'nombres apellidos correo rol') // Podrías popular el rol del usuario
      .populate('arquitectoSoluciones', 'nombres apellidos correo')
      .populate('equipoDesarrollo', 'nombres apellidos correo');
      // Más adelante podríamos querer poblar 'productBacklog' y 'sprints'

    if (!proyectoDesarrollo) {
      return res.status(404).json({ mensaje: 'Proyecto de desarrollo no encontrado.' });
    }
    res.json(proyectoDesarrollo);
  } catch (error) {
    console.error('Error al obtener proyecto de desarrollo por ID:', error);
    if (error.kind === 'ObjectId') {
        return res.status(404).json({ mensaje: 'Proyecto de desarrollo no encontrado (ID malformado).' });
    }
    res.status(500).json({ mensaje: 'Error del servidor.' });
  }
};

// @desc    Actualizar un Proyecto de Desarrollo
// @route   PUT /api/proyectos-desarrollo/:id
// @access  Private
exports.actualizarProyectoDesarrollo = async (req, res) => {
  // Extraer solo los campos que se pueden actualizar
  const {
    nombre,
    descripcion,
    estadoDesarrollo, // Un campo clave a actualizar
    // fechaInicioEstimada,
    // fechaFinEstimada,
    // fechaInicioReal,
    // fechaFinReal,
    liderTecnicoId,
    // arquitectoSolucionesId,
    // equipoDesarrolloIds,
    // repositorioCodigo,
    // entornoDesarrollo,
    // entornoPruebasQA,
    // entornoProduccion,
  } = req.body;

  // Construir objeto con los campos a actualizar
  const camposActualizar = {};
  if (nombre) camposActualizar.nombre = nombre;
  if (descripcion) camposActualizar.descripcion = descripcion;
  if (estadoDesarrollo) camposActualizar.estadoDesarrollo = estadoDesarrollo;
  // ... añadir todos los demás campos ...
  if (liderTecnicoId) camposActualizar.liderTecnico = liderTecnicoId;
  // ... etc.

  try {
    let proyectoDesarrollo = await ProyectoDesarrollo.findById(req.params.id);

    if (!proyectoDesarrollo) {
      return res.status(404).json({ mensaje: 'Proyecto de desarrollo no encontrado.' });
    }

    // Aquí podrías añadir lógica de permisos, ej. solo el líder técnico o un admin puede actualizar

    // Validar IDs de usuarios si se actualizan
    // ... (similar a la validación en crearProyectoDesarrollo) ...

    proyectoDesarrollo = await ProyectoDesarrollo.findByIdAndUpdate(
      req.params.id,
      { $set: camposActualizar }, // Usar $set para actualizar solo los campos proporcionados
      { new: true, runValidators: true } // new:true devuelve el doc actualizado, runValidators para que se ejecuten las validaciones del schema
    ).populate('cliente', 'nombre')
     .populate('liderTecnico', 'nombres apellidos'); // Añadir más populates según necesidad

    res.json({
        mensaje: 'Proyecto de desarrollo actualizado correctamente.',
        proyectoDesarrollo
    });

  } catch (error) {
    console.error('Error al actualizar proyecto de desarrollo:', error);
    if (error.name === 'ValidationError') {
        const mensajes = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({ mensaje: 'Error de validación', errores: mensajes });
    }
    if (error.kind === 'ObjectId') {
        return res.status(404).json({ mensaje: 'Proyecto de desarrollo no encontrado (ID malformado).' });
    }
    res.status(500).json({ mensaje: 'Error del servidor.' });
  }
};

// @desc    Eliminar un Proyecto de Desarrollo
// @route   DELETE /api/proyectos-desarrollo/:id
// @access  Private (usualmente solo Administradores)
exports.eliminarProyectoDesarrollo = async (req, res) => {
  try {
    const proyectoDesarrollo = await ProyectoDesarrollo.findById(req.params.id);

    if (!proyectoDesarrollo) {
      return res.status(404).json({ mensaje: 'Proyecto de desarrollo no encontrado.' });
    }

    // Consideraciones antes de eliminar:
    // ¿Qué pasa con los BacklogItems y Sprints asociados?
    // Por ahora, una eliminación simple. Más adelante se podría implementar soft delete o validaciones.
    // await BacklogItem.deleteMany({ proyectoDesarrollo: req.params.id });
    // await Sprint.deleteMany({ proyectoDesarrollo: req.params.id });

    await proyectoDesarrollo.deleteOne(); // O findByIdAndDelete(req.params.id)

    res.json({ mensaje: 'Proyecto de desarrollo eliminado correctamente.' });

  } catch (error) {
    console.error('Error al eliminar proyecto de desarrollo:', error);
    if (error.kind === 'ObjectId') {
        return res.status(404).json({ mensaje: 'Proyecto de desarrollo no encontrado (ID malformado).' });
    }
    res.status(500).json({ mensaje: 'Error del servidor.' });
  }
};

// @desc    Gestionar equipo de un Proyecto de Desarrollo
// @route   PUT /api/proyectos-desarrollo/:id/equipo
// @access  Private
exports.gestionarEquipoProyectoDesarrollo = async (req, res) => {
  const { liderTecnicoId, arquitectoSolucionesId, equipoDesarrolloIds } = req.body;

  try {
    let proyectoDesarrollo = await ProyectoDesarrollo.findById(req.params.id);
    if (!proyectoDesarrollo) {
      return res.status(404).json({ mensaje: 'Proyecto de desarrollo no encontrado.' });
    }

    // Validar usuarios (similar a crearProyectoDesarrollo)
    // ...

    if (liderTecnicoId !== undefined) proyectoDesarrollo.liderTecnico = liderTecnicoId; // Permitir desasginar con null
    if (arquitectoSolucionesId !== undefined) proyectoDesarrollo.arquitectoSoluciones = arquitectoSolucionesId; // Permitir desasginar con null
    if (equipoDesarrolloIds) proyectoDesarrollo.equipoDesarrollo = equipoDesarrolloIds;


    await proyectoDesarrollo.save();
    
    const proyectoActualizado = await ProyectoDesarrollo.findById(req.params.id)
        .populate('liderTecnico', 'nombres apellidos correo')
        .populate('arquitectoSoluciones', 'nombres apellidos correo')
        .populate('equipoDesarrollo', 'nombres apellidos correo');


    res.json({ 
        mensaje: 'Equipo del proyecto de desarrollo actualizado.',
        proyectoDesarrollo: proyectoActualizado
    });

  } catch (error) {
    console.error('Error al gestionar equipo del proyecto de desarrollo:', error);
    // ... manejo de errores ...
    res.status(500).json({ mensaje: 'Error del servidor.' });
  }
};