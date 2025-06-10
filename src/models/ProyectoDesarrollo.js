// src/models/ProyectoDesarrollo.js

const mongoose = require('mongoose');

const proyectoDesarrolloSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del proyecto de desarrollo es obligatorio'],
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  // --- VINCULACIÓN CON VENTAS Y CLIENTE ---
  proyectoVentas: { // Vínculo al proyecto original del módulo de ventas
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proyecto', // Hace referencia a tu modelo Proyecto.js actual (el de ventas)
    // required: true, // Podría ser opcional si se vincula directamente a un Contrato
  },
  contrato: { // Vínculo al contrato que originó este desarrollo
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contrato', // Hace referencia a tu modelo Contrato.js
    required: [true, 'El contrato asociado es obligatorio'],
  },
  cliente: { // Se puede obtener del contrato o proyectoVentas, pero tenerlo aquí puede facilitar consultas
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente', // Hace referencia a tu modelo Cliente.js
    required: [true, 'El cliente es obligatorio'],
  },

  // --- INFORMACIÓN ESPECÍFICA DE DESARROLLO ---
  estadoDesarrollo: {
    type: String,
    enum: ['Planificación', 'En Curso', 'En Pruebas (QA)', 'Pausado', 'Completado', 'Cancelado'],
    default: 'Planificación',
    required: true,
  },
  fechaInicioEstimada: {
    type: Date,
  },
  fechaFinEstimada: {
    type: Date,
  },
  fechaInicioReal: {
    type: Date,
  },
  fechaFinReal: {
    type: Date,
  },
  productBacklog: [{ // Array de referencias a los ítems del Product Backlog
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BacklogItem', // Modelo que definiremos a continuación
  }],
  sprints: [{ // Array de referencias a los Sprints de este proyecto
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sprint', // Modelo que definiremos a continuación
  }],
  
  // --- EQUIPO DE DESARROLLO ---
  liderTecnico: { // Podría ser el "Responsable" desde la perspectiva de desarrollo
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // Hace referencia a tu modelo Usuario.js
  },
  arquitectoSoluciones: { // Quien diseñó la solución, puede venir de preventa/comercial
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  equipoDesarrollo: [{ // Miembros del equipo asignados (Desarrolladores, QAs)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  }],

  // --- OTROS DETALLES ---
  repositorioCodigo: {
    type: String,
    trim: true,
    // Podrías añadir una validación de URL si quieres
  },
  entornoDesarrollo: {
    type: String,
    trim: true,
  },
  entornoPruebasQA: {
    type: String,
    trim: true,
  },
  entornoProduccion: {
    type: String,
    trim: true,
  },
  // Podríamos añadir campos para métricas generales del proyecto si es necesario
  // Por ejemplo: presupuestoAsignadoDesarrollo, horasEstimadasTotales, horasRealesTotales

}, { timestamps: true }); // timestamps añade createdAt y updatedAt automáticamente

module.exports = mongoose.model('ProyectoDesarrollo', proyectoDesarrolloSchema);