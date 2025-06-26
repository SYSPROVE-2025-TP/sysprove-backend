// routes/casosPrueba.routes.js
const express = require('express');
const router = express.Router();
const casosPruebaController = require('../controllers/casosPrueba.controller');

// CRUD
router.post('/', casosPruebaController.crearCasoPrueba);
router.get('/proyecto/:proyectoId', casosPruebaController.obtenerCasosPorProyecto);
router.get('/:id', casosPruebaController.obtenerCasoPorId);
router.put('/:id', casosPruebaController.actualizarCasoPrueba);
router.delete('/:id', casosPruebaController.eliminarCasoPrueba);

module.exports = router;
