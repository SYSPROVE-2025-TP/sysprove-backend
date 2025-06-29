const mongoose = require("mongoose");
const Incidencia = require("../models/Incidencia");

// Crear una incidencia
exports.crearIncidencia = async (req, res) => {
  try {
    const {
      cliente,
      categoria,
      descripcion,
      estado = "Abierto",
      fechaReporte,
    } = req.body;

    // Validar campos
    if (!cliente || !categoria || !descripcion || !fechaReporte) {
      return res.status(400).json({ mensaje: "Campos obligatorios incompletos" });
    }

    const evidenciaPaths = req.files?.map(file => file.path) || [];

    const nuevaIncidencia = new Incidencia({
      cliente,
      categoria,
      descripcion,
      estado,
      fechaReporte,
      documentos: evidenciaPaths,
    });

    console.log("Cliente:", cliente);
    console.log("Archivos:", req.files);
    console.log("Ruta archivos:", evidenciaPaths);
    console.log("Body completo:", req.body);

    await nuevaIncidencia.save();

    res.status(201).json({
      mensaje: "Incidencia registrada correctamente",
      incidencia: nuevaIncidencia,
    });
  } catch (error) {
    console.error("Error al crear incidencia:", error);
    res.status(500).json({ mensaje: "Error al crear la incidencia" });
  }
};

// Obtener todas las incidencias
exports.obtenerIncidencias = async (req, res) => {
  try {
    const incidencias = await Incidencia.find()
      .populate("cliente", "nombre")
      .sort({ fechaReporte: -1 });

    res.json(incidencias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener incidencias" });
  }
};

// Obtener incidencia por ID
exports.obtenerIncidenciaPorId = async (req, res) => {
  try {
    const incidencia = await Incidencia.findById(req.params.id).populate("cliente", "nombre");
    if (!incidencia) {
      return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }
    res.json(incidencia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener la incidencia" });
  }
};

// Actualizar una incidencia
exports.actualizarIncidencia = async (req, res) => {
  try {
    const { id } = req.params;
    const { cliente, categoria, descripcion, estado, fechaReporte } = req.body;

    const evidenciaPaths = req.files?.map(file => file.path) || [];

    const incidenciaActualizada = await Incidencia.findByIdAndUpdate(
      id,
      {
        cliente,
        categoria,
        descripcion,
        estado,
        fechaReporte,
        $push: { documentos: { $each: evidenciaPaths } }
      },
      { new: true }
    );

    if (!incidenciaActualizada) {
      return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    res.json({
      mensaje: "Incidencia actualizada correctamente",
      incidencia: incidenciaActualizada,
    });
  } catch (error) {
    console.error("Error al actualizar la incidencia:", error);
    res.status(500).json({ mensaje: "Error al actualizar la incidencia" });
  }
};

// Eliminar una incidencia
exports.eliminarIncidencia = async (req, res) => {
  try {
    const incidencia = await Incidencia.findByIdAndDelete(req.params.id);
    if (!incidencia) {
      return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }
    res.json({ mensaje: "Incidencia eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar la incidencia" });
  }
};

// Cambiar estado de una incidencia
exports.cambiarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { nuevoEstado } = req.body;

    const incidencia = await Incidencia.findById(id);
    if (!incidencia) {
      return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    incidencia.estado = nuevoEstado;
    await incidencia.save();

    res.json({ mensaje: "Estado actualizado", incidencia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al cambiar el estado" });
  }
};

// Agregar seguimiento (comentarios o bitácora)
exports.agregarSeguimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const { autor, comentario } = req.body;

    if (!autor || !comentario) {
      return res.status(400).json({ mensaje: "Datos de seguimiento incompletos" });
    }

    const incidencia = await Incidencia.findById(id);
    if (!incidencia) {
      return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    incidencia.seguimiento.push({
      autor,
      comentario,
      fecha: new Date(),
    });

    await incidencia.save();

    res.json({ mensaje: "Seguimiento agregado", incidencia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al agregar seguimiento" });
  }
};
