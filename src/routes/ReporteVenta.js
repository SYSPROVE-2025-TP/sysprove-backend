const express = require('express');
const router = express.Router();
const vendedorController = require('../controllers/ReporteVenta');

router.get('/', vendedorController.getVendedores);
router.post('/', vendedorController.createVendedor);
router.put('/:id', vendedorController.updateVendedor);
router.delete('/:id', vendedorController.deleteVendedor);

module.exports = router;
