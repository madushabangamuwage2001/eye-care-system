const express = require('express');
const router = express.Router();
const controller = require('../controllers/FeedbackController');

/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: Feedback management endpoints
 */

/**
 * @swagger
 * /feedback:
 *   get:
 *     summary: Get all Feedbacks
 *     tags: [Feedback]
 *     responses:
 *       200:
 *         description: List of Feedbacks
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /feedback/{id}:
 *   get:
 *     summary: Get Feedback by ID
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The Feedback
 *       404:
 *         description: Not found
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /feedback:
 *   post:
 *     summary: Create Feedback
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientName:
 *                 type: string
 *                 example: "Alice"
 *               message:
 *                 type: string
 *                 example: "Great service!"
 *               rating:
 *                 type: number
 *                 example: 5
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */
router.post('/', controller.create);

/**
 * @swagger
 * /feedback/{id}:
 *   put:
 *     summary: Update Feedback
 *     tags: [Feedback]
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
 *               patientName:
 *                 type: string
 *                 example: "Alice"
 *               message:
 *                 type: string
 *                 example: "Great service!"
 *               rating:
 *                 type: number
 *                 example: 5
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /feedback/{id}:
 *   delete:
 *     summary: Delete Feedback
 *     tags: [Feedback]
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
