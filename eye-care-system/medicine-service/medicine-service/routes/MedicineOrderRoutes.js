const express = require('express');
const router = express.Router();
const controller = require('../controllers/MedicineOrderController');

/**
 * @swagger
 * tags:
 *   name: MedicineOrder
 *   description: MedicineOrder management endpoints
 */

/**
 * @swagger
 * /medicine-orders:
 *   get:
 *     summary: Get all MedicineOrders
 *     tags: [MedicineOrder]
 *     responses:
 *       200:
 *         description: List of MedicineOrders
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /medicine-orders/{id}:
 *   get:
 *     summary: Get MedicineOrder by ID
 *     tags: [MedicineOrder]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The MedicineOrder
 *       404:
 *         description: Not found
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /medicine-orders:
 *   post:
 *     summary: Create MedicineOrder
 *     tags: [MedicineOrder]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               medicineId:
 *                 type: string
 *                 example: "6612abc456"
 *               quantity:
 *                 type: number
 *                 example: 2
 *               patientName:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */
router.post('/', controller.create);

/**
 * @swagger
 * /medicine-orders/{id}:
 *   put:
 *     summary: Update MedicineOrder
 *     tags: [MedicineOrder]
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
 *               medicineId:
 *                 type: string
 *                 example: "6612abc456"
 *               quantity:
 *                 type: number
 *                 example: 2
 *               patientName:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /medicine-orders/{id}:
 *   delete:
 *     summary: Delete MedicineOrder
 *     tags: [MedicineOrder]
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
