const express = require('express');
const router = express.Router();
const controller = require('../controllers/AppointmentController');

/**
 * @swagger
 * tags:
 *   name: Appointment
 *   description: Appointment management endpoints
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all Appointments
 *     tags: [Appointment]
 *     responses:
 *       200:
 *         description: List of Appointments
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Get Appointment by ID
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The Appointment
 *       404:
 *         description: Not found
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create Appointment
 *     tags: [Appointment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientName:
 *                 type: string
 *                 example: "Jane Smith"
 *               doctorName:
 *                 type: string
 *                 example: "Dr. Silva"
 *               date:
 *                 type: string
 *                 example: "2026-04-01"
 *               description:
 *                 type: string
 *                 example: "Eye checkup"
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */
router.post('/', controller.create);

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Update Appointment
 *     tags: [Appointment]
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
 *                 example: "Jane Smith"
 *               doctorName:
 *                 type: string
 *                 example: "Dr. Silva"
 *               date:
 *                 type: string
 *                 example: "2026-04-01"
 *               description:
 *                 type: string
 *                 example: "Eye checkup"
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Delete Appointment
 *     tags: [Appointment]
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
