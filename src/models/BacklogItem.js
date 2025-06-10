// src/models/BacklogItem.js

const mongoose = require('mongoose');

const backlogItemSchema = new mongoose.Schema({
  proyectoDesarrollo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProyectoDesarrollo', // Referencia al Proyecto de Desarrollo al que pertenece
    required: [true, 'El proyecto de desarrollo asociado es obligatorio'],
    index: true, // Buen candidato para indexar si se consulta frecuentemente por proyecto
  },
  nombre: { // Título corto o resumen del ítem
    type: String,
    required: [true, 'El nombre del ítem del backlog es obligatorio'],
    trim: true,
  },
  descripcion: { // Descripción detallada (ej. "Como [rol], quiero [acción], para [beneficio]")
    type: String,
    trim: true,
  },
  tipo: {
    type: String,
    enum: ['Historia de Usuario', 'Tarea Técnica', 'Bug', 'Mejora', 'Investigación'],
    required: [true, 'El tipo de ítem del backlog es obligatorio'],
  },
  prioridad: {
    type: String,
    enum: ['Muy Alta', 'Alta', 'Media', 'Baja', 'Muy Baja'],
    default: 'Media',
  },
  estadoGeneral: { // Estado general del PBI, diferente del estado de las tareas en un sprint
    type: String,
    enum: ['Nuevo', 'En Análisis', 'Refinado', 'Listo para Sprint', 'En Progreso (Sprint)', 'Completado', 'Rechazado', 'Bloqueado'],
    default: 'Nuevo',
  },
  estimacionPuntos: { // Estimación en puntos de historia (Story Points)
    type: Number,
    min: 0,
  },
  estimacionHoras: { // Estimación en horas (opcional, a veces se usa en paralelo o en lugar de puntos)
    type: Number,
    min: 0,
  },
  reportadoPor: { // Quién creó o reportó este ítem (ej. para bugs)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // Referencia al modelo Usuario.js
  },
  asignadoA: { // A quién está asignado este ítem (puede ser un equipo o una persona antes de entrar a un sprint)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // Referencia al modelo Usuario.js
  },
  sprint: { // Si el ítem está actualmente asignado a un sprint
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sprint', // Modelo que definiremos a continuación
    default: null, // Por defecto no está en ningún sprint
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  fechaLimite: { // Fecha límite si aplica (ej. para bugs críticos)
    type: Date,
  },
  criteriosAceptacion: { // Criterios que deben cumplirse para considerar el ítem como completado
    type: String,
    trim: true,
  },
  // --- Sub-tareas (si decides no usar un modelo TareaSprint separado) ---
  subTareas: [{
    descripcion: { type: String, required: true },
    estadoSubTarea: { 
        type: String, 
        enum: ['Por Hacer', 'En Progreso', 'Hecho', 'Bloqueada'], 
        default: 'Por Hacer' 
    },
    asignadoASubTarea: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    estimacionHorasSubTarea: { type: Number, min: 0 },
    horasRealesSubTarea: { type: Number, default: 0, min: 0 }
  }],
  // --- Historial y Colaboración ---
  comentarios: [{
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    texto: { type: String, required: true },
    fechaComentario: { type: Date, default: Date.now },
  }],
  adjuntos: [{ // Similar a como lo manejas en Contrato.js
    filename: { type: String },
    contentType: { type: String },
    data: { type: Buffer }, // O podrías almacenar una URL si usas un servicio de storage externo
    subidoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    fechaSubida: { type: Date, default: Date.now },
  }],
  // Podríamos añadir campos para el historial de cambios de estado si es necesario
}, { timestamps: true }); // timestamps añade createdAt y updatedAt automáticamente

module.exports = mongoose.model('BacklogItem', backlogItemSchema);