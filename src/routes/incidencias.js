const express = require('express');
const router = express.Router();
const incidenciaController = require('../controllers/incidenciaController');
const upload = require('../middleware/upload'); // ✅ usa el middleware centralizado
const auth = require('../middleware/authMiddleware'); // ✅ protección con JWT

/**
 * @swagger
 * tags:
 *   name: Incidencias
 *   description: APIs para gestión de incidencias reportadas por clientes
 */

/**
 * @swagger
 * /incidencias:
 *   post:
 *     summary: Registrar una nueva incidencia
 *     tags: [Incidencias]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               cliente:
 *                 type: string
 *               categoria:
 *                 type: string
 *                 enum: [Hardware, Software, Red, Servicio, Otro]
 *               descripcion:
 *                 type: string
 *               estado:
 *                 type: string
 *                 enum: [Abierto, En Proceso, Resuelto, Cerrado]
 *               fechaReporte:
 *                 type: string
 *                 format: date
 *               documentos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Incidencia registrada correctamente
 *       500:
 *         description: Error al crear la incidencia
 */
router.post('/', auth, upload.array('documentos'), incidenciaController.crearIncidencia);

/**
 * @swagger
 * /incidencias:
 *   get:
 *     summary: Obtener todas las incidencias
 *     tags: [Incidencias]
 *     responses:
 *       200:
 *         description: Lista de incidencias
 *       500:
 *         description: Error al obtener incidencias
 */
router.get('/', auth, incidenciaController.obtenerIncidencias);

/**
 * @swagger
 * /incidencias/{id}:
 *   get:
 *     summary: Obtener una incidencia por ID
 *     tags: [Incidencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la incidencia
 *     responses:
 *       200:
 *         description: Incidencia encontrada
 *       404:
 *         description: Incidencia no encontrada
 */
router.get('/:id', auth, incidenciaController.obtenerIncidenciaPorId);

/**
 * @swagger
 * /incidencias/{id}:
 *   put:
 *     summary: Actualizar una incidencia
 *     tags: [Incidencias]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               cliente:
 *                 type: string
 *               categoria:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               estado:
 *                 type: string
 *               fechaReporte:
 *                 type: string
 *                 format: date
 *               documentos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Incidencia actualizada correctamente
 *       404:
 *         description: Incidencia no encontrada
 */
router.put('/:id', auth, upload.array('documentos'), incidenciaController.actualizarIncidencia);

/**
 * @swagger
 * /incidencias/{id}:
 *   delete:
 *     summary: Eliminar una incidencia por ID
 *     tags: [Incidencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la incidencia
 *     responses:
 *       200:
 *         description: Incidencia eliminada correctamente
 *       404:
 *         description: Incidencia no encontrada
 */
router.delete('/:id', auth, incidenciaController.eliminarIncidencia);

/**
 * @swagger
 * /incidencias/{id}/estado:
 *   patch:
 *     summary: Cambiar el estado de una incidencia
 *     tags: [Incidencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la incidencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nuevoEstado:
 *                 type: string
 *                 enum: [Abierto, En Proceso, Resuelto, Cerrado]
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *       404:
 *         description: Incidencia no encontrada
 */
router.patch('/:id/estado', auth, incidenciaController.cambiarEstado);

/**
 * @swagger
 * /incidencias/{id}/seguimiento:
 *   post:
 *     summary: Agregar seguimiento a una incidencia
 *     tags: [Incidencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la incidencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               autor:
 *                 type: string
 *               comentario:
 *                 type: string
 *     responses:
 *       200:
 *         description: Seguimiento agregado correctamente
 *       404:
 *         description: Incidencia no encontrada
 */
router.post('/:id/seguimiento', auth, incidenciaController.agregarSeguimiento);

module.exports = router;