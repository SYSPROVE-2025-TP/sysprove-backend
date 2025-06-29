// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Crear nuevo feedback
router.post('/', feedbackController.crearFeedback);

// Obtener todos los feedbacks
router.get('/', feedbackController.obtenerFeedbacks);

// Obtener feedbacks por receptor_id
router.get('/receptor/:receptor_id', feedbackController.obtenerFeedbacksPorReceptor);

// Obtener feedback por ID
router.get('/:id', feedbackController.obtenerFeedbackPorId);

// Actualizar feedback
router.put('/:id', feedbackController.actualizarFeedback); // ✔ Agregado

// Eliminar feedback
router.delete('/:id', feedbackController.eliminarFeedback); // ✔ Agregado

module.exports = router;
