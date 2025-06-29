const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/venta-controllers/contacto.controller');

// Ruta POST /api/contacto
router.post('/contacto', contactoController.crearContacto);
router.get('/contacto', contactoController.obtenerContactos);
router.delete('/contacto/:id', contactoController.eliminarContacto);
router.put('/contacto/:id', contactoController.editarContacto);
module.exports = router;
