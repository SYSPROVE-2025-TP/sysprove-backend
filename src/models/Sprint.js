// src/models/Sprint.js

const mongoose = require('mongoose');

const sprintSchema = new mongoose.Schema({
  proyectoDesarrollo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProyectoDesarrollo', // Referencia al Proyecto de Desarrollo al que pertenece
    required: [true, 'El proyecto de desarrollo asociado es obligatorio'],
    index: true, // Para facilitar la búsqueda de sprints por proyecto
  },
  nombre: {
    type: String,
    required: [true, 'El nombre del sprint es obligatorio'], // Ej. "Sprint 1 - Autenticación", "Sprint de Mayo - Semana 1 y 2"
    trim: true,
  },
  objetivo: { // El objetivo principal del sprint (Sprint Goal)
    type: String,
    trim: true,
  },
  fechaInicio: {
    type: Date,
    required: [true, 'La fecha de inicio del sprint es obligatoria'],
  },
  fechaFin: {
    type: Date,
    required: [true, 'La fecha de fin del sprint es obligatoria'],
  },
  estado: {
    type: String,
    enum: ['Planificado', 'En Curso', 'Completado', 'Cancelado'],
    default: 'Planificado',
    required: true,
  },
  itemsComprometidos: [{ // BacklogItems que se han comprometido para este sprint
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BacklogItem', // Referencia al modelo BacklogItem.js
  }],
  // --- Opcional: Métricas o resúmenes del sprint ---
  puntosHistoriaComprometidos: { // Suma de los puntos de historia de los itemsComprometidos
    type: Number,
    default: 0,
    min: 0,
  },
  puntosHistoriaCompletados: { // Suma de los puntos de historia de los items completados en este sprint
    type: Number,
    default: 0,
    min: 0,
  },
  horasEstimadasComprometidas: { // Suma de las horas estimadas de los itemsComprometidos (o sus subtareas)
    type: Number,
    default: 0,
    min: 0,
  },
  horasRealesCompletadas: { // Suma de las horas reales dedicadas a los items completados en este sprint
    type: Number,
    default: 0,
    min: 0,
  },
  leccionesAprendidas: { // Espacio para notas de la retrospectiva del sprint
    type: String,
    trim: true,
  },
  // --- Referencia al equipo que participó en este sprint (opcional, si puede variar del equipo general del proyecto) ---
  // equipoSprint: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Usuario',
  // }],

}, { timestamps: true }); // timestamps añade createdAt y updatedAt automáticamente

// Validación para asegurar que la fecha de fin sea posterior a la fecha de inicio
sprintSchema.pre('save', function(next) {
  if (this.fechaFin <= this.fechaInicio) {
    next(new Error('La fecha de fin debe ser posterior a la fecha de inicio del sprint.'));
  } else {
    next();
  }
});

// Podríamos añadir métodos virtuales o estáticos para calcular métricas si es necesario
// sprintSchema.virtual('duracionDias').get(function() {
//   if (this.fechaFin && this.fechaInicio) {
//     return Math.round((this.fechaFin - this.fechaInicio) / (1000 * 60 * 60 * 24));
//   }
//   return null;
// });

module.exports = mongoose.model('Sprint', sprintSchema);