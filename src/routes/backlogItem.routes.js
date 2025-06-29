const express = require('express');
const router = express.Router();
const BacklogItem = require('../models/BacklogItem');

// GET /api/backlog-items
router.get('/', async (req, res) => {
  try {
    const items = await BacklogItem.find().populate('proyectoDesarrollo');
    res.json(items);
  } catch (error) {
    console.error('Error al obtener backlog items:', error);
    res.status(500).json({ mensaje: 'Error interno' });
  }
});

module.exports = router;
