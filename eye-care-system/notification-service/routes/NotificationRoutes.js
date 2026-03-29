const express = require('express');
const router = express.Router();
const controller = require('../controllers/NotificationController');

/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: Notification management endpoints
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get all Notifications
 *     tags: [Notification]
 *     responses:
 *       200:
 *         description: List of Notifications
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /notifications/{id}:
 *   get:
 *     summary: Get Notification by ID
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The Notification
 *       404:
 *         description: Not found
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create Notification
 *     tags: [Notification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipient:
 *                 type: string
 *                 example: "john@example.com"
 *               message:
 *                 type: string
 *                 example: "Your appointment is confirmed"
 *               type:
 *                 type: string
 *                 example: "info"
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */
router.post('/', controller.create);

/**
 * @swagger
 * /notifications/{id}:
 *   put:
 *     summary: Update Notification
 *     tags: [Notification]
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
 *               recipient:
 *                 type: string
 *                 example: "john@example.com"
 *               message:
 *                 type: string
 *                 example: "Your appointment is confirmed"
 *               type:
 *                 type: string
 *                 example: "info"
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: Delete Notification
 *     tags: [Notification]
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
