  const Feedback = require('../models/FeedbackRecibido');

// Crear nuevo feedback
const crearFeedback = async (req, res) => {
  try {
    const nuevoFeedback = new Feedback(req.body);
    const resultado = await nuevoFeedback.save();
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los feedbacks
const obtenerFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener feedbacks por receptor_id
const obtenerFeedbacksPorReceptor = async (req, res) => {
  try {
    const { receptor_id } = req.params;
    const feedbacks = await Feedback.find({ receptor_id });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener feedback por ID
const obtenerFeedbackPorId = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback no encontrado' });
    }
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar feedback por ID
const actualizarFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback no encontrado' });
    }
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar feedback por ID
const eliminarFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback no encontrado' });
    }
    res.json({ message: 'Feedback eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔧 EXPORTACIÓN COMPLETA
module.exports = {
  crearFeedback,
  obtenerFeedbacks,
  obtenerFeedbacksPorReceptor,
  obtenerFeedbackPorId,
  actualizarFeedback,     // ✔ Añadido
  eliminarFeedback        // ✔ Añadido
  };
