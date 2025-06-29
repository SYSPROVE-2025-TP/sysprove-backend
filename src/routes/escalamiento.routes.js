const express = require('express');
const router = express.Router();
const {
  crearEscalamiento,
  obtenerEscalamientos
} = require('../controllers/escalamiento.controller');

/**
 * @swagger
 * tags:
 *   name: Escalamientos
 *   description: Endpoints para gestionar escalamientos
 */

/**
 * @swagger
 * /api/escalamientos:
 *   post:
 *     summary: Crear un nuevo escalamiento
 *     tags: [Escalamientos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *               - responsable
 *               - proyecto
 *               - comentarioEscalamiento
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Problema en el servidor
 *               descripcion:
 *                 type: string
 *                 example: El servidor dejó de responder desde ayer.
 *               responsable:
 *                 type: string
 *                 example: 664f1c9bc22f24e10dca10a4
 *               proyecto:
 *                 type: string
 *                 example: 6650a2a1be3d1426bba39b32
 *               comentarioEscalamiento:
 *                 type: string
 *                 example: Escalar al equipo de infraestructura
 *     responses:
 *       201:
 *         description: Escalamiento creado correctamente
 *       500:
 *         description: Error al crear escalamiento
 */
router.post('/', crearEscalamiento);

/**
 * @swagger
 * /api/escalamientos:
 *   get:
 *     summary: Obtener todos los escalamientos
 *     tags: [Escalamientos]
 *     responses:
 *       200:
 *         description: Lista de escalamientos
 *       500:
 *         description: Error al obtener escalamientos
 */
router.get('/', obtenerEscalamientos);

module.exports = router;