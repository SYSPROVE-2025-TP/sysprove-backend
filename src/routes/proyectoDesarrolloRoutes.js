// src/routes/proyectoDesarrolloRoutes.js

const express = require('express');
const router = express.Router();
const proyectoDesarrolloController = require('../controllers/proyectoDesarrolloController');
// const authMiddleware = require('../middleware/authMiddleware'); // Middleware de autenticación que ya tienes
// const { check } = require('express-validator'); // Si decides usar express-validator
const backlogItemController = require('../controllers/backlogItemController');
const sprintController = require('../controllers/sprintController');
// Middleware para proteger todas las rutas de este módulo (o puedes aplicarlo individualmente)
// router.use(authMiddleware); // Descomenta si todas las rutas requieren autenticación

// @route   POST /api/proyectos-desarrollo
// @desc    Crear un nuevo Proyecto de Desarrollo
// @access  Private (ej. Administrador, Líder de Proyecto)
router.post(
  '/',
  // authMiddleware, // Aplicar autenticación
  // Aquí irían las validaciones de express-validator si las usas:
  // [
  //   check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(),
  //   check('contratoId', 'El ID del contrato es obligatorio').isMongoId(),
  //   check('clienteId', 'El ID del cliente es obligatorio').isMongoId(),
  //   // ... más validaciones
  // ],
  proyectoDesarrolloController.crearProyectoDesarrollo
);

// @route   GET /api/proyectos-desarrollo
// @desc    Obtener todos los Proyectos de Desarrollo
// @access  Private
router.get(
  '/',
  // authMiddleware,
  proyectoDesarrolloController.obtenerProyectosDesarrollo
);

// @route   GET /api/proyectos-desarrollo/:id
// @desc    Obtener un Proyecto de Desarrollo por ID
// @access  Private
router.get(
  '/:id',
  // authMiddleware,
  proyectoDesarrolloController.obtenerProyectoDesarrolloPorId
);

// @route   PUT /api/proyectos-desarrollo/:id
// @desc    Actualizar un Proyecto de Desarrollo
// @access  Private (ej. Líder de Proyecto asignado, Administrador)
router.put(
  '/:id',
  // authMiddleware,
  // Aquí también podrías añadir validaciones para los campos actualizables
  proyectoDesarrolloController.actualizarProyectoDesarrollo
);

// @route   DELETE /api/proyectos-desarrollo/:id
// @desc    Eliminar un Proyecto de Desarrollo
// @access  Private (ej. Administrador)
router.delete(
  '/:id',
  // authMiddleware,
  proyectoDesarrolloController.eliminarProyectoDesarrollo
);

// @route   PUT /api/proyectos-desarrollo/:id/equipo
// @desc    Gestionar el equipo de un Proyecto de Desarrollo
// @access  Private (ej. Líder de Proyecto asignado, Administrador)
router.put(
  '/:id/equipo',
  // authMiddleware,
  // Validaciones para los IDs de usuario del equipo
  proyectoDesarrolloController.gestionarEquipoProyectoDesarrollo
);

// --- Rutas para BacklogItems y Sprints (se añadirán más adelante) ---
// Ejemplo:
// router.post('/:proyectoId/backlog-items', authMiddleware, backlogItemController.crearBacklogItem);
// router.get('/:proyectoId/sprints', authMiddleware, sprintController.obtenerSprintsPorProyecto);


router.get('/items', backlogItemController.obtenerTodosLosItemsBacklog);
router.get('/sprints', sprintController.obtenerTodosLosSprints);
// --- RUTAS PARA BACKLOG ITEMS ---

// Crear un nuevo Backlog Item para un proyecto
// POST /api/proyectos-desarrollo/:proyectoId/backlog-items
router.post(
  '/:proyectoId/backlog-items',
  // authMiddleware,
  backlogItemController.crearBacklogItem
);

// Obtener todos los Backlog Items de un proyecto
// GET /api/proyectos-desarrollo/:proyectoId/backlog-items
router.get(
  '/:proyectoId/backlog-items',
  // authMiddleware,
  backlogItemController.obtenerBacklogItemsPorProyecto
);

// Estas rutas podrían estar en su propio archivo si se vuelven muy complejas,
// pero por ahora pueden vivir aquí. Se refieren a un ítem específico, no a un proyecto.

// GET /api/backlog-items/:itemId
router.get(
  '/items/:itemId', // Usamos un prefijo para evitar conflictos con /:id de proyectos
  // authMiddleware,
  backlogItemController.obtenerBacklogItemPorId
);

// PUT /api/backlog-items/:itemId
router.put(
  '/items/:itemId',
  // authMiddleware,
  backlogItemController.actualizarBacklogItem
);

// DELETE /api/backlog-items/:itemId
router.delete(
  '/items/:itemId',
  // authMiddleware,
  backlogItemController.eliminarBacklogItem
);


// --- RUTAS PARA SPRINTS ---

// Crear un nuevo Sprint para un proyecto
// POST /api/proyectos-desarrollo/:proyectoId/sprints
router.post(
  '/:proyectoId/sprints',
  // authMiddleware,
  sprintController.crearSprint
);

// Obtener todos los Sprints de un proyecto
// GET /api/proyectos-desarrollo/:proyectoId/sprints
router.get(
  '/:proyectoId/sprints',
  // authMiddleware,
  sprintController.obtenerSprintsPorProyecto
);

// Estas rutas se refieren a un sprint específico.
// Para evitar conflictos y mantener la claridad, podríamos crear un nuevo router para /api/sprints

// GET /api/sprints/:sprintId
router.get(
    '/sprints/:sprintId', // Usando un prefijo diferente
    // authMiddleware,
    sprintController.obtenerSprintPorId
);

// PUT /api/sprints/:sprintId
router.put(
    '/sprints/:sprintId',
    // authMiddleware,
    sprintController.actualizarSprint
);

// DELETE /api/sprints/:sprintId
router.delete(
    '/sprints/:sprintId',
    // authMiddleware,
    sprintController.eliminarSprint
);



module.exports = router;