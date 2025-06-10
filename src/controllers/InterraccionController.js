const Interaccion = require('../models/Interaccion');

exports.getAll = async (req, res) => {
  const interacciones = await Interaccion.find();
  res.json(interacciones);
};

exports.create = async (req, res) => {
  const nueva = new Interaccion(req.body);
  await nueva.save();
  res.status(201).json({ mensaje: 'Interacción guardada', data: nueva });
};

exports.update = async (req, res) => {
  const actualizada = await Interaccion.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ mensaje: 'Interacción actualizada', data: actualizada });
};

exports.delete = async (req, res) => {
  await Interaccion.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Interacción eliminada' });
};
