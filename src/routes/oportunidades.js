const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/oportunidadController');

router.get('/', ctrl.getOportunidades);
router.post('/', ctrl.createOportunidad);
router.put('/:id', ctrl.updateOportunidad);
router.delete('/:id', ctrl.deleteOportunidad);

module.exports = router;
