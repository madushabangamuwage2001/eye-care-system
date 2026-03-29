const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.join(__dirname, 'eye-care-system');
const atlasBase = 'mongodb+srv://mtitUser:mtit1234@mtit.d2ojaq0.mongodb.net/';

const services = [
    { name: 'user-service', port: 8001, db: 'user_db', entities: [{ name: 'User', path: '/users' }] },
    { name: 'doctor-service', port: 8002, db: 'doctor_db', entities: [{ name: 'Appointment', path: '/appointments' }] },
    { name: 'spectacles-service', port: 8003, db: 'spectacles_db', entities: [{ name: 'Spectacle', path: '/spectacles' }, { name: 'Repair', path: '/repairs' }] },
    { name: 'medicine-service', port: 8004, db: 'medicine_db', entities: [{ name: 'Medicine', path: '/medicines' }, { name: 'MedicineOrder', path: '/medicine-orders' }] },
    { name: 'feedback-service', port: 8005, db: 'feedback_db', entities: [{ name: 'Feedback', path: '/feedback' }] },
    { name: 'order-service', port: 8006, db: 'order_db', entities: [{ name: 'Order', path: '/orders' }] },
    { name: 'notification-service', port: 8007, db: 'notification_db', entities: [{ name: 'Notification', path: '/notifications' }] }
];

services.forEach(svc => {
    const svcDir = path.join(rootDir, svc.name);
    
    // 1. .env
    fs.writeFileSync(path.join(svcDir, '.env'), `PORT=${svc.port}\nMONGO_URI=${atlasBase}${svc.db}\n`);

    // 2. package.json install
// npm install skipped here, running in PS instead

    // 3. swagger/swagger.js
    const swaggerCode = `
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: '${svc.name}',
            version: '1.0.0',
            description: 'API Documentation for ${svc.name}',
        },
        servers: [
            {
                url: 'http://localhost:${svc.port}',
                description: 'Development server',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);
module.exports = swaggerSpec;
`;
    // Create swagger dir if it doesn't exist just to be safe
    if (!fs.existsSync(path.join(svcDir, 'swagger'))) {
        fs.mkdirSync(path.join(svcDir, 'swagger'));
    }
    fs.writeFileSync(path.join(svcDir, 'swagger', 'swagger.js'), swaggerCode.trim());

    // Remove the old static swagger.json to avoid confusion
    if (fs.existsSync(path.join(svcDir, 'swagger', 'swagger.json'))) {
        fs.rmSync(path.join(svcDir, 'swagger', 'swagger.json'));
    }

    // 4. Update app.js
    let appJs = fs.readFileSync(path.join(svcDir, 'app.js'), 'utf8');
    appJs = appJs.replace(
        "const swaggerDocument = require('./swagger/swagger.json');", 
        "const swaggerSpec = require('./swagger/swagger');"
    );
    appJs = appJs.replace(
        "app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));",
        "app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));"
    );
    fs.writeFileSync(path.join(svcDir, 'app.js'), appJs);

    // 5. Update Routes with JSDoc
    svc.entities.forEach(entity => {
        let reqBodyProperties = '';
        if (entity.name === 'User') {
            reqBodyProperties = `
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "john@example.com"
 *                 password:
 *                   type: string
 *                   example: "mypassword123"`;
        } else {
            reqBodyProperties = `
 *                 name:
 *                   type: string
 *                   example: "Sample Name"
 *                 description:
 *                   type: string
 *                   example: "Sample Description"`;
        }

        const routeCode = `
const express = require('express');
const router = express.Router();
const controller = require('../controllers/${entity.name}Controller');

/**
 * @swagger
 * tags:
 *   name: ${entity.name}
 *   description: ${entity.name} management API
 */

/**
 * @swagger
 * ${entity.path}:
 *   get:
 *     summary: Retrieve a list of ${entity.name}s
 *     tags: [${entity.name}]
 *     responses:
 *       200:
 *         description: A list of ${entity.name}s.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * ${entity.path}/{id}:
 *   get:
 *     summary: Get a ${entity.name} by ID
 *     tags: [${entity.name}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ${entity.name} ID
 *     responses:
 *       200:
 *         description: The ${entity.name} object
 *       404:
 *         description: ${entity.name} not found
 *       500:
 *         description: Server error
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * ${entity.path}:
 *   post:
 *     summary: Create a new ${entity.name}
 *     tags: [${entity.name}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:${reqBodyProperties}
 *     responses:
 *       201:
 *         description: The created ${entity.name}
 *       400:
 *         description: Bad request (Validation error)
 *       500:
 *         description: Server error
 */
router.post('/', controller.create);

/**
 * @swagger
 * ${entity.path}/{id}:
 *   put:
 *     summary: Update a ${entity.name}
 *     tags: [${entity.name}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ${entity.name} ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:${reqBodyProperties}
 *     responses:
 *       200:
 *         description: The updated ${entity.name}
 *       404:
 *         description: ${entity.name} not found
 *       400:
 *         description: Bad request (Validation error)
 *       500:
 *         description: Server error
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * ${entity.path}/{id}:
 *   delete:
 *     summary: Delete a ${entity.name}
 *     tags: [${entity.name}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ${entity.name} ID
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: ${entity.name} not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', controller.delete);

module.exports = router;
`;
        fs.writeFileSync(path.join(svcDir, 'routes', `${entity.name}Routes.js`), routeCode.trim());
    });
});

console.log('Swagger JS Doc setup completed.');
