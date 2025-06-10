const Vendedor = require('../models/ReporteVenta');

// Obtener todos los vendedores
exports.getVendedores = async (req, res) => {
  try {
    const vendedores = await Vendedor.find();
    res.json(vendedores);
  } catch  {
    res.status(500).json({ error: 'Error al obtener vendedores' });
  }
};

// Crear un nuevo vendedor
exports.createVendedor = async (req, res) => {
  try {
    const nuevoVendedor = new Vendedor(req.body);
    await nuevoVendedor.save();
    res.status(201).json(nuevoVendedor);
  } catch  {
    res.status(400).json({ error: 'Error al crear vendedor' });
  }
};

// Actualizar un vendedor
exports.updateVendedor = async (req, res) => {
  try {
    const vendedor = await Vendedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(vendedor);
  } catch  {
    res.status(400).json({ error: 'Error al actualizar vendedor' });
  }
};

// Eliminar un vendedor
exports.deleteVendedor = async (req, res) => {
  try {
    await Vendedor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vendedor eliminado' });
  } catch  {
    res.status(400).json({ error: 'Error al eliminar vendedor' });
  }
};
