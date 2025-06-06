const express = require('express');
const router = express.Router();
const conocimientoController = require('../controllers/conocimientoController');

/**
 * @swagger
 * tags:
 *   name: Base de Conocimiento
 *   description: APIs para gestionar la Base de Conocimiento
 */

/**
 * @swagger
 * /base-conocimiento:
 *   post:
 *     summary: Crear una nueva propuesta
 *     tags: [Base de Conocimiento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               etiquetas:
 *                 type: array
 *                 items:
 *                   type: string
 *               archivoUrl:
 *                 type: string
 *               anonimo:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Propuesta creada correctamente
 *       500:
 *         description: Error al crear la propuesta
 */
router.post('/', conocimientoController.crearPropuesta);

/**
 * @swagger
 * /base-conocimiento:
 *   get:
 *     summary: Obtener todas las propuestas
 *     tags: [Base de Conocimiento]
 *     responses:
 *       200:
 *         description: Lista de propuestas
 *       500:
 *         description: Error al obtener las propuestas
 */
router.get('/', conocimientoController.obtenerPropuestas);

/**
 * @swagger
 * /base-conocimiento/{id}:
 *   get:
 *     summary: Obtener una propuesta por ID
 *     tags: [Base de Conocimiento]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la propuesta
 *     responses:
 *       200:
 *         description: Datos de la propuesta
 *       404:
 *         description: Propuesta no encontrada
 *       500:
 *         description: Error al obtener la propuesta
 */
router.get('/:id', conocimientoController.obtenerPropuestaPorId);

/**
 * @swagger
 * /base-conocimiento/{id}:
 *   put:
 *     summary: Actualizar una propuesta por ID
 *     tags: [Base de Conocimiento]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la propuesta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               etiquetas:
 *                 type: array
 *                 items:
 *                   type: string
 *               archivoUrl:
 *                 type: string
 *               anonimo:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Propuesta actualizada correctamente
 *       404:
 *         description: Propuesta no encontrada
 *       500:
 *         description: Error al actualizar la propuesta
 */
router.put('/:id', conocimientoController.actualizarPropuesta);

/**
 * @swagger
 * /base-conocimiento/{id}:
 *   delete:
 *     summary: Eliminar una propuesta por ID
 *     tags: [Base de Conocimiento]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la propuesta
 *     responses:
 *       200:
 *         description: Propuesta eliminada correctamente
 *       404:
 *         description: Propuesta no encontrada
 *       500:
 *         description: Error al eliminar la propuesta
 */
router.delete('/:id', conocimientoController.eliminarPropuesta);

/**
 * @swagger
 * /base-conocimiento/buscar:
 *   get:
 *     summary: Buscar propuestas por palabra clave o etiqueta
 *     tags: [Base de Conocimiento]
 *     parameters:
 *       - in: query
 *         name: palabra
 *         schema:
 *           type: string
 *         description: Palabra clave a buscar
 *       - in: query
 *         name: etiqueta
 *         schema:
 *           type: string
 *         description: Etiqueta a filtrar
 *     responses:
 *       200:
 *         description: Resultados de la búsqueda
 *       500:
 *         description: Error al buscar propuestas
 */
router.get('/buscar', conocimientoController.buscarPropuestas);

module.exports = router;