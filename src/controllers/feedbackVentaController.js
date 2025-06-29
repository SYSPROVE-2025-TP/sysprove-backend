// src/controllers/feedbackVentaController.js

const FeedbackVenta = require('../models/FeedbackVenta.js');

/**
 * Crea un nuevo feedback desde Desarrollo
 * POST /api/repositorio-ventas/feedback-desarrollo
 */
exports.createFeedback = async (req, res) => {
  try {
    // Verificamos que el modelo esté cargado
    console.log('🗂️ FeedbackVenta model is:', typeof FeedbackVenta);

    const {
      proyectoId,
      tipoCambio,
      descripcion,
      justificacion,
      impacto,
      fechaEstimacion
    } = req.body;

    // Creamos la instancia
    const feedback = new FeedbackVenta({
      proyectoId,
      tipoCambio,
      descripcion,
      justificacion,
      impacto,
      // Si envías fechaEstimacion como string, conviértela a Date
      fechaEstimacion: fechaEstimacion ? new Date(fechaEstimacion) : undefined
    });

    await feedback.save();
    return res.status(201).json({ ok: true, feedback });
  } catch (err) {
    console.error('📌 Error en createFeedback:', err);
    return res.status(500).json({
      mensaje: 'Error al guardar el feedback.',
      error: err.message
    });
  }
};

/**
 * Obtiene todos los feedbacks desde Desarrollo
 * GET /api/repositorio-ventas/feedbacks
 */
exports.getFeedbacks = async (req, res) => {
  try {
    const list = await FeedbackVenta.find()
      .populate('proyectoId', 'nombre')
      .sort({ fecha: -1 });

    const feedbacks = list.map(f => ({
      id: f._id,
      proyectoNombre: f.proyectoId?.nombre || '—',
      tipoCambio: f.tipoCambio,
      descripcion: f.descripcion,
      justificacion: f.justificacion,
      impacto: f.impacto,
      fechaEstimacion: f.fechaEstimacion,
      fechaRegistro: f.fecha
    }));

    return res.json(feedbacks);
  } catch (err) {
    console.error('📌 Error en getFeedbacks:', err);
    return res.status(500).json({
      mensaje: 'Error al obtener los feedbacks.',
      error: err.message
    });
  }
};

/**
 * Elimina un feedback por su ID
 * DELETE /api/repositorio-ventas/feedback-desarrollo/:id
 */
exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const fb = await FeedbackVenta.findByIdAndDelete(id);

    if (!fb) {
      return res.status(404).json({ mensaje: 'Feedback no encontrado.' });
    }

    return res.json({ ok: true, mensaje: 'Feedback eliminado.' });
  } catch (err) {
    console.error('📌 Error en deleteFeedback:', err);
    return res.status(500).json({
      mensaje: 'Error al eliminar el feedback.',
      error: err.message
    });
  }
};
