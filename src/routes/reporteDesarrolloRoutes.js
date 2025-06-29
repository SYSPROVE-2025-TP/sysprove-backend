const express = require('express')
const router = express.Router()

const {
  obtenerReportesDesarrollo
} = require('../controllers/reporteDesarrolloController')

router.get('/', obtenerReportesDesarrollo)

module.exports = router
