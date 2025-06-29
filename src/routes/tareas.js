// const express = require("express");
// const router = express.Router();
// const {
//   obtenerTareas,
//   crearTarea,
//   actualizarTarea,
//   eliminarTarea,
// } = require("../controllers/tareacontroller");

// router.get("/", obtenerTareas);
// router.post("/", crearTarea);
// router.put("/:id", actualizarTarea);
// router.delete("/:id", eliminarTarea);

// module.exports = router;


const express = require("express");
const router = express.Router();
const {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
} = require("../controllers/tareacontroller");

router.get("/", obtenerTareas);
router.post("/", crearTarea);
router.put("/:id", actualizarTarea);
router.delete("/:id", eliminarTarea);

module.exports = router;