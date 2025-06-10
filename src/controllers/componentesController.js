const Componente = require('../models/Componente');

// Obtener todos los componentes
exports.obtenerComponentes = async (req, res) => {
  try {
    const componentes = await Componente.find();
    res.json(componentes);
  } catch (error) {
    console.error('Error al obtener componentes:', error);
    res.status(500).json({ mensaje: 'Error al obtener componentes' });
  }
};

// Crear un nuevo componente
exports.crearComponente = async (req, res) => {
  try {
    const nuevoComponente = new Componente(req.body);
    await nuevoComponente.save();
    res.status(201).json(nuevoComponente);
  } catch (error) {
    console.error('Error al crear componente:', error);
    res.status(500).json({ mensaje: 'Error al crear componente' });
  }
};

// Actualizar componente por ID
exports.actualizarComponente = async (req, res) => {
  try {
    const componenteActualizado = await Componente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(componenteActualizado);
  } catch (error) {
    console.error('Error al actualizar componente:', error);
    res.status(500).json({ mensaje: 'Error al actualizar componente' });
  }
};

// Eliminar componente por ID
exports.eliminarComponente = async (req, res) => {
  try {
    await Componente.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Componente eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar componente:', error);
    res.status(500).json({ mensaje: 'Error al eliminar componente' });
  }
};

// Solicitar estimación: cambiar estado y estimacionSolicitada a true
exports.solicitarEstimacion = async (req, res) => {
  try {
    const componente = await Componente.findById(req.params.id);
    if (!componente) {
      return res.status(404).json({ mensaje: 'Componente no encontrado' });
    }

    componente.estado = 'Solicitado';
    componente.estimacionSolicitada = true;
    await componente.save();

    res.json({ mensaje: 'Estimación solicitada', componente });
  } catch (error) {
    console.error('Error al solicitar estimación:', error);
    res.status(500).json({ mensaje: 'Error al solicitar estimación' });
  }
};

// Cancelar estimación: cambiar estado y estimacionSolicitada a false
exports.cancelarEstimacion = async (req, res) => {
  try {
    const componente = await Componente.findById(req.params.id);
    if (!componente) {
      return res.status(404).json({ mensaje: 'Componente no encontrado' });
    }

    componente.estado = 'No solicitado';
    componente.estimacionSolicitada = false;
    await componente.save();

    res.json({ mensaje: 'Estimación cancelada', componente });
  } catch (error) {
    console.error('Error al cancelar estimación:', error);
    res.status(500).json({ mensaje: 'Error al cancelar estimación' });
  }
};
