const express = require('express');
const router = express.Router();
const Sprint = require('../models/Sprint');

// GET /api/sprints
router.get('/', async (req, res) => {
  try {
    const sprints = await Sprint.find();
    res.json(sprints);
  } catch (error) {
    console.error('Error al obtener sprints:', error);
    res.status(500).json({ mensaje: 'Error interno' });
  }
});

module.exports = router;
