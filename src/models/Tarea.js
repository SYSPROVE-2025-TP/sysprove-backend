// import mongoose from "mongoose";

// const tareaSchema = new mongoose.Schema({
//   titulo: { type: String, required: true },
//   descripcion: { type: String },
//   fechaInicio: { type: Date },
//   fechaFin: { type: Date },
//   estado: {
//     type: String,
//     enum: ["Pendiente", "En Progreso", "Completada", "Cancelada"],
//     default: "Pendiente",
//   },
// });

// const Tarea = mongoose.model("Tarea", tareaSchema);

// export default Tarea;

const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  fechaInicio: { type: Date },
  fechaFin: { type: Date },
  estado: {
    type: String,
    enum: ["Pendiente", "En Progreso", "Completada", "Cancelada"],
    default: "Pendiente",
  },
});

module.exports = mongoose.model("Tarea", tareaSchema);