const express = require('express');
const router = express.Router();
const repopropuestaController = require('../controllers/repopropuestaController');

// Listar propuestas con filtros
router.get('/', repopropuestaController.obtenerPropuestas);

// Crear nueva propuesta
router.post('/', repopropuestaController.crearPropuesta);

// Eliminar propuesta por ID
router.delete('/:id', repopropuestaController.eliminarPropuesta);

module.exports = router;