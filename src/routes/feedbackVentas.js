// src/routes/feedbackVentas.js

const express = require('express');
const {
  createFeedback,
  getFeedbacks,
  deleteFeedback
} = require('../controllers/feedbackVentaController');

const router = express.Router();

// POST   /api/repositorio-ventas/feedback-desarrollo
router.post('/feedback-desarrollo', createFeedback);

// GET    /api/repositorio-ventas/feedbacks
router.get('/feedbacks', getFeedbacks);

// DELETE /api/repositorio-ventas/feedback-desarrollo/:id
router.delete('/feedback-desarrollo/:id', deleteFeedback);

module.exports = router;