const express = require('express');
const router = express.Router();
const controller = require('../controllers/SpectacleController');

/**
 * @swagger
 * tags:
 *   name: Spectacle
 *   description: Spectacle management endpoints
 */

/**
 * @swagger
 * /spectacles:
 *   get:
 *     summary: Get all Spectacles
 *     tags: [Spectacle]
 *     responses:
 *       200:
 *         description: List of Spectacles
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /spectacles/{id}:
 *   get:
 *     summary: Get Spectacle by ID
 *     tags: [Spectacle]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The Spectacle
 *       404:
 *         description: Not found
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /spectacles:
 *   post:
 *     summary: Create Spectacle
 *     tags: [Spectacle]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand:
 *                 type: string
 *                 example: "Ray-Ban"
 *               model:
 *                 type: string
 *                 example: "Aviator"
 *               price:
 *                 type: number
 *                 example: 150
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */
router.post('/', controller.create);

/**
 * @swagger
 * /spectacles/{id}:
 *   put:
 *     summary: Update Spectacle
 *     tags: [Spectacle]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand:
 *                 type: string
 *                 example: "Ray-Ban"
 *               model:
 *                 type: string
 *                 example: "Aviator"
 *               price:
 *                 type: number
 *                 example: 150
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /spectacles/{id}:
 *   delete:
 *     summary: Delete Spectacle
 *     tags: [Spectacle]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.delete('/:id', controller.delete);

module.exports = router;
