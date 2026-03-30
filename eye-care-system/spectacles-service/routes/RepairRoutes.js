const express = require('express');
const router = express.Router();
const controller = require('../controllers/RepairController');

/**
 * @swagger
 * tags:
 *   name: Repair
 *   description: Repair management endpoints
 */

/**
 * @swagger
 * /repairs:
 *   get:
 *     summary: Get all Repairs
 *     tags: [Repair]
 *     responses:
 *       200:
 *         description: List of Repairs
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /repairs/{id}:
 *   get:
 *     summary: Get Repair by ID
 *     tags: [Repair]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The Repair
 *       404:
 *         description: Not found
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /repairs:
 *   post:
 *     summary: Create Repair
 *     tags: [Repair]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               spectacleId:
 *                 type: string
 *                 example: "6612abc123"
 *               issue:
 *                 type: string
 *                 example: "Broken frame"
 *               status:
 *                 type: string
 *                 example: "Pending"
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */
router.post('/', controller.create);

/**
 * @swagger
 * /repairs/{id}:
 *   put:
 *     summary: Update Repair
 *     tags: [Repair]
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
 *               spectacleId:
 *                 type: string
 *                 example: "6612abc123"
 *               issue:
 *                 type: string
 *                 example: "Broken frame"
 *               status:
 *                 type: string
 *                 example: "Pending"
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /repairs/{id}:
 *   delete:
 *     summary: Delete Repair
 *     tags: [Repair]
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
