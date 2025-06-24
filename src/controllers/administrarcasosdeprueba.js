const CasoDePrueba = require('../models/CasoDePrueba'); // Importa el modelo

// Crear un nuevo caso de prueba
exports.crearCasoDePrueba = async (req, res) => {
  try {
    const casoDePrueba = new CasoDePrueba(req.body);
    await casoDePrueba.save();
    res.status(201).json(casoDePrueba);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los casos de prueba
exports.obtenerCasosDePrueba = async (req, res) => {
  try {
    const casos = await CasoDePrueba.find();
    res.status(200).json(casos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Editar un caso de prueba
exports.editarCasoDePrueba = async (req, res) => {
  try {
    const casoDePrueba = await CasoDePrueba.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(casoDePrueba);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un caso de prueba
exports.eliminarCasoDePrueba = async (req, res) => {
  try {
    await CasoDePrueba.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Caso de prueba eliminado" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
