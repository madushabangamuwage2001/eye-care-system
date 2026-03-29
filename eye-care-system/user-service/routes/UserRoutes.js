const express = require('express');
const router = express.Router();
const controller = require('../controllers/UserController');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management endpoints
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all Users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of Users
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get User by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The User
 *       404:
 *         description: Not found
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */
router.post('/', controller.create);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update User
 *     tags: [User]
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
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete User
 *     tags: [User]
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
