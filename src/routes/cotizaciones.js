const express = require("express");
const router = express.Router();
const cotizacionController = require("../controllers/cotizacionController");
const { ObjectId } = require("mongoose").Types;
const authMiddleware = require("../middleware/authMiddleware");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Validar IDs
router.param("id", (_req, res, next, id) => {
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "ID inválido" });
  next();
});
router.get("/", authMiddleware, cotizacionController.obtenerCotizaciones);
// Rutas principales
router.get("/propuestas/:id", cotizacionController.verPropuesta);
router.post("/", authMiddleware, upload.array('documentos'), cotizacionController.crearCotizacion);
router.post("/:id/enviar", authMiddleware, cotizacionController.enviarCotizacion);
router.get("/:id/pdf", cotizacionController.obtenerPDF);
router.get("/:id/preview", cotizacionController.previewPDF); // Nueva

module.exports = router;