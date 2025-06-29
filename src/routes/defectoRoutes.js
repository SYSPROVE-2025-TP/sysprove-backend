const express = require('express');
const router = express.Router();
const defectoController = require('../controllers/defectoController');

// Rutas CRUD
router.post('/', defectoController.crearDefecto); // Crear
router.get('/', defectoController.obtenerDefectos); // Listar todos
router.get('/:id', defectoController.obtenerDefectoPorId); // Obtener por ID
router.put('/:id', defectoController.actualizarDefecto); // Actualizar
router.delete('/:id', defectoController.eliminarDefecto); // Eliminar

module.exports = router;
