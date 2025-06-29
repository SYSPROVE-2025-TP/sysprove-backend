// const Tarea = require("../models/Tarea");

// // Obtener todas las tareas
// const obtenerTareas = async (req, res) => {
//   try {
//     const tareas = await Tarea.find();
//     res.json(tareas);
//   } catch (error) {
//     res.status(500).json({ mensaje: "Error al obtener tareas" });
//   }
// };

// // Crear una tarea
// const crearTarea = async (req, res) => {
//   try {
//     const nuevaTarea = new Tarea(req.body);
//     await nuevaTarea.save();
//     res.status(201).json(nuevaTarea);
//   } catch (error) {
//     res.status(500).json({ mensaje: "Error al crear la tarea" });
//   }
// };

// // Actualizar una tarea
// const actualizarTarea = async (req, res) => {
//   try {
//     const tareaActualizada = await Tarea.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!tareaActualizada) {
//       return res.status(404).json({ mensaje: "Tarea no encontrada" });
//     }
//     res.json(tareaActualizada);
//   } catch (error) {
//     res.status(500).json({ mensaje: "Error al actualizar la tarea" });
//   }
// };

// // Eliminar una tarea
// const eliminarTarea = async (req, res) => {
//   try {
//     const tareaEliminada = await Tarea.findByIdAndDelete(req.params.id);
//     if (!tareaEliminada) {
//       return res.status(404).json({ mensaje: "Tarea no encontrada" });
//     }
//     res.json({ mensaje: "Tarea eliminada" });
//   } catch (error) {
//     res.status(500).json({ mensaje: "Error al eliminar la tarea" });
//   }
// };

// module.exports = {
//   obtenerTareas,
//   crearTarea,
//   actualizarTarea,
//   eliminarTarea,
// };


const Tarea = require("../models/Tarea");

// Obtener todas las tareas
const obtenerTareas = async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.json(tareas);
  } catch {
    res.status(500).json({ mensaje: "Error al obtener tareas" });
  }
};

// Crear una tarea
const crearTarea = async (req, res) => {
  try {
    const nuevaTarea = new Tarea(req.body);
    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
  } catch  {
    res.status(500).json({ mensaje: "Error al crear la tarea" });
  }
};

// Actualizar una tarea
const actualizarTarea = async (req, res) => {
  try {
    const tareaActualizada = await Tarea.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!tareaActualizada) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }
    res.json(tareaActualizada);
  } catch  {
    res.status(500).json({ mensaje: "Error al actualizar la tarea" });
  }
};

// Eliminar una tarea
const eliminarTarea = async (req, res) => {
  try {
    const tareaEliminada = await Tarea.findByIdAndDelete(req.params.id);
    if (!tareaEliminada) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }
    res.json({ mensaje: "Tarea eliminada" });
  } catch  {
    res.status(500).json({ mensaje: "Error al eliminar la tarea" });
  }
};

module.exports = {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
};