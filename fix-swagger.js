const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'eye-care-system');
const atlasBase = 'mongodb+srv://mtitUser:mtit1234@mtit.d2ojaq0.mongodb.net/';

const services = [
    {
        name: 'user-service', port: 8001, db: 'user_db',
        entities: [{
            name: 'User', path: '/users',
            fields: `name: { type: String, required: true },\n    email: { type: String, required: true },\n    password: { type: String, required: true }`,
            swaggerProps: `name:\n               type: string\n               example: "John Doe"\n             email:\n               type: string\n               example: "john@example.com"\n             password:\n               type: string\n               example: "password123"`
        }]
    },
    {
        name: 'doctor-service', port: 8002, db: 'doctor_db',
        entities: [{
            name: 'Appointment', path: '/appointments',
            fields: `patientName: { type: String, required: true },\n    doctorName: { type: String, required: true },\n    date: { type: String, required: true },\n    description: { type: String }`,
            swaggerProps: `patientName:\n               type: string\n               example: "Jane Smith"\n             doctorName:\n               type: string\n               example: "Dr. Silva"\n             date:\n               type: string\n               example: "2026-04-01"\n             description:\n               type: string\n               example: "Eye checkup"`
        }]
    },
    {
        name: 'spectacles-service', port: 8003, db: 'spectacles_db',
        entities: [
            {
                name: 'Spectacle', path: '/spectacles',
                fields: `brand: { type: String, required: true },\n    model: { type: String, required: true },\n    price: { type: Number, required: true }`,
                swaggerProps: `brand:\n               type: string\n               example: "Ray-Ban"\n             model:\n               type: string\n               example: "Aviator"\n             price:\n               type: number\n               example: 150`
            },
            {
                name: 'Repair', path: '/repairs',
                fields: `spectacleId: { type: String, required: true },\n    issue: { type: String, required: true },\n    status: { type: String, default: "Pending" }`,
                swaggerProps: `spectacleId:\n               type: string\n               example: "6612abc123"\n             issue:\n               type: string\n               example: "Broken frame"\n             status:\n               type: string\n               example: "Pending"`
            }
        ]
    },
    {
        name: 'medicine-service', port: 8004, db: 'medicine_db',
        entities: [
            {
                name: 'Medicine', path: '/medicines',
                fields: `name: { type: String, required: true },\n    dosage: { type: String, required: true },\n    price: { type: Number, required: true }`,
                swaggerProps: `name:\n               type: string\n               example: "Eye Drops"\n             dosage:\n               type: string\n               example: "2 drops daily"\n             price:\n               type: number\n               example: 12.5`
            },
            {
                name: 'MedicineOrder', path: '/medicine-orders',
                fields: `medicineId: { type: String, required: true },\n    quantity: { type: Number, required: true },\n    patientName: { type: String, required: true }`,
                swaggerProps: `medicineId:\n               type: string\n               example: "6612abc456"\n             quantity:\n               type: number\n               example: 2\n             patientName:\n               type: string\n               example: "John Doe"`
            }
        ]
    },
    {
        name: 'feedback-service', port: 8005, db: 'feedback_db',
        entities: [{
            name: 'Feedback', path: '/feedback',
            fields: `patientName: { type: String, required: true },\n    message: { type: String, required: true },\n    rating: { type: Number, min: 1, max: 5 }`,
            swaggerProps: `patientName:\n               type: string\n               example: "Alice"\n             message:\n               type: string\n               example: "Great service!"\n             rating:\n               type: number\n               example: 5`
        }]
    },
    {
        name: 'order-service', port: 8006, db: 'order_db',
        entities: [{
            name: 'Order', path: '/orders',
            fields: `patientName: { type: String, required: true },\n    item: { type: String, required: true },\n    quantity: { type: Number, required: true },\n    status: { type: String, default: "Pending" }`,
            swaggerProps: `patientName:\n               type: string\n               example: "Bob"\n             item:\n               type: string\n               example: "Spectacles"\n             quantity:\n               type: number\n               example: 1\n             status:\n               type: string\n               example: "Pending"`
        }]
    },
    {
        name: 'notification-service', port: 8007, db: 'notification_db',
        entities: [{
            name: 'Notification', path: '/notifications',
            fields: `recipient: { type: String, required: true },\n    message: { type: String, required: true },\n    type: { type: String, default: "info" }`,
            swaggerProps: `recipient:\n               type: string\n               example: "john@example.com"\n             message:\n               type: string\n               example: "Your appointment is confirmed"\n             type:\n               type: string\n               example: "info"`
        }]
    }
];

services.forEach(svc => {
    const svcDir = path.join(rootDir, svc.name);
    console.log(`\nFixing ${svc.name}...`);

    // ── .env ──────────────────────────────────────────────────────────
    fs.writeFileSync(path.join(svcDir, '.env'),
        `PORT=${svc.port}\nMONGO_URI=${atlasBase}${svc.db}\n`);

    // ── config/db.js ──────────────────────────────────────────────────
    fs.writeFileSync(path.join(svcDir, 'config', 'db.js'), `const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('[${svc.name}] MongoDB connected to ${svc.db}');
    } catch (err) {
        console.error('[${svc.name}] MongoDB connection error:', err.message);
    }
};

module.exports = connectDB;
`);

    // ── swagger/swagger.js ─────────────────────────────────────────────
    const swaggerDir = path.join(svcDir, 'swagger');
    if (!fs.existsSync(swaggerDir)) fs.mkdirSync(swaggerDir);
    // Remove stale swagger.json if present
    const staleJson = path.join(swaggerDir, 'swagger.json');
    if (fs.existsSync(staleJson)) fs.unlinkSync(staleJson);

    fs.writeFileSync(path.join(swaggerDir, 'swagger.js'), `const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: '${svc.name} API',
            version: '1.0.0',
            description: 'CRUD API documentation for ${svc.name}',
        },
        servers: [{ url: 'http://localhost:${svc.port}' }],
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerJsDoc(options);
`);

    // ── Models, Controllers, Routes ────────────────────────────────────
    svc.entities.forEach(entity => {
        // Model
        fs.writeFileSync(path.join(svcDir, 'models', `${entity.name}.js`), `const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    ${entity.fields},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('${entity.name}', schema);
`);

        // Controller
        fs.writeFileSync(path.join(svcDir, 'controllers', `${entity.name}Controller.js`), `const ${entity.name} = require('../models/${entity.name}');

exports.getAll = async (req, res) => {
    try {
        const data = await ${entity.name}.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const data = await ${entity.name}.findById(req.params.id);
        if (!data) return res.status(404).json({ message: '${entity.name} not found' });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const doc = new ${entity.name}(req.body);
        const saved = await doc.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await ${entity.name}.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: '${entity.name} not found' });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await ${entity.name}.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: '${entity.name} not found' });
        res.status(200).json({ message: '${entity.name} deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
`);

        // Route (with correct JSDoc indentation — 2 spaces under properties)
        fs.writeFileSync(path.join(svcDir, 'routes', `${entity.name}Routes.js`), `const express = require('express');
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
`);
    });

    // ── app.js — clean rewrite ─────────────────────────────────────────
    const routeImports = svc.entities.map(e =>
        `const ${e.name}Routes = require('./routes/${e.name}Routes');`
    ).join('\n');
    const routeUses = svc.entities.map(e =>
        `app.use('${e.path}', ${e.name}Routes);`
    ).join('\n');

    fs.writeFileSync(path.join(svcDir, 'app.js'), `require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
${routeImports}

const app = express();

app.use(cors());
app.use(express.json());

// Root health-check
app.get('/', (req, res) => res.send('${svc.name} is running'));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
${routeUses}

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

const PORT = process.env.PORT || ${svc.port};

connectDB();
app.listen(PORT, () => console.log('[${svc.name}] Server running on http://localhost:' + PORT));
`);

    console.log(`  ✓ ${svc.name} fixed`);
});

console.log('\nAll services fixed successfully!');
