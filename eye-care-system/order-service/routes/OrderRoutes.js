const express = require('express');
const router = express.Router();
const controller = require('../controllers/OrderController');

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order management endpoints
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all Orders
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: List of Orders
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get Order by ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The Order
 *       404:
 *         description: Not found
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create Order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientName:
 *                 type: string
 *                 example: "Bob"
 *               item:
 *                 type: string
 *                 example: "Spectacles"
 *               quantity:
 *                 type: number
 *                 example: 1
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
 * /orders/{id}:
 *   put:
 *     summary: Update Order
 *     tags: [Order]
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
 *                 example: "Bob"
 *               item:
 *                 type: string
 *                 example: "Spectacles"
 *               quantity:
 *                 type: number
 *                 example: 1
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
 * /orders/{id}:
 *   delete:
 *     summary: Delete Order
 *     tags: [Order]
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
