const ProyectoDesarrollo = require('../models/ProyectoDesarrollo')

const obtenerReportesDesarrollo = async (req, res) => {
  try {
    const proyectos = await ProyectoDesarrollo.find({})
      .select('nombre descripcion estadoDesarrollo fechaInicioEstimada fechaFinEstimada') // Solo los campos necesarios
      .sort({ createdAt: -1 }) // Opcional: más recientes primero

    res.json(proyectos)
  } catch (error) {
    console.error('Error al obtener reportes de desarrollo:', error)
    res.status(500).json({ mensaje: 'Error del servidor' })
  }
}

module.exports = {
  obtenerReportesDesarrollo
}
