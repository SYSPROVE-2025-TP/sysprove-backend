const express = require('express');
const router = express.Router();
const casoDePruebaController = require('../controllers/casoDePruebaController');

router.post('/caso', casoDePruebaController.crearCasoDePrueba);
router.get('/casos', casoDePruebaController.obtenerCasosDePrueba);
router.put('/caso/:id', casoDePruebaController.editarCasoDePrueba);
router.delete('/caso/:id', casoDePruebaController.eliminarCasoDePrueba);

module.exports = router;
