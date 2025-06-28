const Contacto = require('../../models/venta-models/Contacto');

exports.crearContacto = async (req, res) => {
  try {
    const nuevoContacto = new Contacto(req.body);
    await nuevoContacto.save();
    res.status(201).json({ mensaje: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al enviar el mensaje', error });
  }
};
exports.obtenerContactos = async (req, res) => {
  try {
    const contactos = await Contacto.find();
    res.status(200).json(contactos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener contactos' });
  }
};

exports.eliminarContacto = async (req, res) => {
  try {
    const { id } = req.params;
    await Contacto.findByIdAndDelete(id);
    res.status(200).json({ mensaje: 'Contacto eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el contacto' });
  }
};

exports.editarContacto = async (req, res) => {
  try {
    const { id } = req.params;
    const contactoActualizado = await Contacto.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(contactoActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al editar el contacto' });
  }
};