const Oportunidad = require('../models/Oportunidad');

exports.getOportunidades = async (req, res) => {
  const datos = await Oportunidad.find();
  res.json(datos);
};

exports.createOportunidad = async (req, res) => {
  const nueva = new Oportunidad(req.body);
  await nueva.save();
  res.json({ mensaje: 'Oportunidad creada' });
};

exports.updateOportunidad = async (req, res) => {
  await Oportunidad.findByIdAndUpdate(req.params.id, req.body);
  res.json({ mensaje: 'Oportunidad actualizada' });
};

exports.deleteOportunidad = async (req, res) => {
  await Oportunidad.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Oportunidad eliminada' });
};
