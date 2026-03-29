const express = require('express');
const router = express.Router();
const controller = require('../controllers/MedicineController');

/**
 * @swagger
 * tags:
 *   name: Medicine
 *   description: Medicine management endpoints
 */

/**
 * @swagger
 * /medicines:
 *   get:
 *     summary: Get all Medicines
 *     tags: [Medicine]
 *     responses:
 *       200:
 *         description: List of Medicines
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /medicines/{id}:
 *   get:
 *     summary: Get Medicine by ID
 *     tags: [Medicine]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The Medicine
 *       404:
 *         description: Not found
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /medicines:
 *   post:
 *     summary: Create Medicine
 *     tags: [Medicine]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Eye Drops"
 *               dosage:
 *                 type: string
 *                 example: "2 drops daily"
 *               price:
 *                 type: number
 *                 example: 12.5
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */
router.post('/', controller.create);

/**
 * @swagger
 * /medicines/{id}:
 *   put:
 *     summary: Update Medicine
 *     tags: [Medicine]
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
 *               name:
 *                 type: string
 *                 example: "Eye Drops"
 *               dosage:
 *                 type: string
 *                 example: "2 drops daily"
 *               price:
 *                 type: number
 *                 example: 12.5
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /medicines/{id}:
 *   delete:
 *     summary: Delete Medicine
 *     tags: [Medicine]
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
