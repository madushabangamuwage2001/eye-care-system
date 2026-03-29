const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'eye-care-system');
const atlasBase = 'mongodb+srv://mtitUser:mtit1234@mtit.d2ojaq0.mongodb.net/';

const services = [
    {
        name: 'user-service', port: 8001, db: 'user_db',
        entities: [{
            name: 'User', path: '/users',
            swaggerProps: `name:\n                 type: string\n                 example: "John Doe"\n               email:\n                 type: string\n                 example: "john@example.com"\n               password:\n                 type: string\n                 example: "password123"`
        }]
    },
    {
        name: 'doctor-service', port: 8002, db: 'doctor_db',
        entities: [{
            name: 'Appointment', path: '/appointments',
            swaggerProps: `patientName:\n                 type: string\n                 example: "Jane Smith"\n               doctorName:\n                 type: string\n                 example: "Dr. Silva"\n               date:\n                 type: string\n                 example: "2026-04-01"\n               description:\n                 type: string\n                 example: "Eye checkup"`
        }]
    },
    {
        name: 'spectacles-service', port: 8003, db: 'spectacles_db',
        entities: [
            {
                name: 'Spectacle', path: '/spectacles',
                swaggerProps: `brand:\n                 type: string\n                 example: "Ray-Ban"\n               model:\n                 type: string\n                 example: "Aviator"\n               price:\n                 type: number\n                 example: 150`
            },
            {
                name: 'Repair', path: '/repairs',
                swaggerProps: `spectacleId:\n                 type: string\n                 example: "6612abc123"\n               issue:\n                 type: string\n                 example: "Broken frame"\n               status:\n                 type: string\n                 example: "Pending"`
            }
        ]
    },
    {
        name: 'medicine-service', port: 8004, db: 'medicine_db',
        entities: [
            {
                name: 'Medicine', path: '/medicines',
                swaggerProps: `name:\n                 type: string\n                 example: "Eye Drops"\n               dosage:\n                 type: string\n                 example: "2 drops daily"\n               price:\n                 type: number\n                 example: 12.5`
            },
            {
                name: 'MedicineOrder', path: '/medicine-orders',
                swaggerProps: `medicineId:\n                 type: string\n                 example: "6612abc456"\n               quantity:\n                 type: number\n                 example: 2\n               patientName:\n                 type: string\n                 example: "John Doe"`
            }
        ]
    },
    {
        name: 'feedback-service', port: 8005, db: 'feedback_db',
        entities: [{
            name: 'Feedback', path: '/feedback',
            swaggerProps: `patientName:\n                 type: string\n                 example: "Alice"\n               message:\n                 type: string\n                 example: "Great service!"\n               rating:\n                 type: number\n                 example: 5`
        }]
    },
    {
        name: 'order-service', port: 8006, db: 'order_db',
        entities: [{
            name: 'Order', path: '/orders',
            swaggerProps: `patientName:\n                 type: string\n                 example: "Bob"\n               item:\n                 type: string\n                 example: "Spectacles"\n               quantity:\n                 type: number\n                 example: 1\n               status:\n                 type: string\n                 example: "Pending"`
        }]
    },
    {
        name: 'notification-service', port: 8007, db: 'notification_db',
        entities: [{
            name: 'Notification', path: '/notifications',
            swaggerProps: `recipient:\n                 type: string\n                 example: "john@example.com"\n               message:\n                 type: string\n                 example: "Your appointment is confirmed"\n               type:\n                 type: string\n                 example: "info"`
        }]
    }
];

services.forEach(svc => {
    const svcDir = path.join(rootDir, svc.name);

    svc.entities.forEach(entity => {
        // Rewrite routes with correct JS DOC indentations
        const routePath = path.join(svcDir, 'routes', `${entity.name}Routes.js`);
        let routeCode = `const express = require('express');
const router = express.Router();
const controller = require('../controllers/${entity.name}Controller');

/**
 * @swagger
 * tags:
 *   name: ${entity.name}
 *   description: ${entity.name} management endpoints
 */

/**
 * @swagger
 * ${entity.path}:
 *   get:
 *     summary: Get all ${entity.name}s
 *     tags: [${entity.name}]
 *     responses:
 *       200:
 *         description: List of ${entity.name}s
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * ${entity.path}/{id}:
 *   get:
 *     summary: Get ${entity.name} by ID
 *     tags: [${entity.name}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The ${entity.name}
 *       404:
 *         description: Not found
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * ${entity.path}:
 *   post:
 *     summary: Create ${entity.name}
 *     tags: [${entity.name}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ${entity.swaggerProps}
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */
router.post('/', controller.create);

/**
 * @swagger
 * ${entity.path}/{id}:
 *   put:
 *     summary: Update ${entity.name}
 *     tags: [${entity.name}]
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
 *               ${entity.swaggerProps}
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * ${entity.path}/{id}:
 *   delete:
 *     summary: Delete ${entity.name}
 *     tags: [${entity.name}]
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
`;
        fs.writeFileSync(routePath, routeCode);
    });
});

console.log('Swagger JSDoc indentations fixed successfully.');
