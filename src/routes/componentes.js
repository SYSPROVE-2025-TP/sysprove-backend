const express = require('express');
const router = express.Router();
const componentesController = require('../controllers/componentesController');

// Obtener todos los componentes
router.get('/', componentesController.obtenerComponentes);

// Crear un nuevo componente
router.post('/', componentesController.crearComponente);

// Rutas específicas antes de la ruta genérica
router.put('/solicitar-estimacion/:id', componentesController.solicitarEstimacion);
router.put('/cancelar-estimacion/:id', componentesController.cancelarEstimacion);

// Actualizar un componente por ID
router.put('/:id', componentesController.actualizarComponente);

// Eliminar un componente por ID
router.delete('/:id', componentesController.eliminarComponente);

module.exports = router;

