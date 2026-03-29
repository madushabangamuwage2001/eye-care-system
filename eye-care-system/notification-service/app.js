require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const NotificationRoutes = require('./routes/NotificationRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Root health-check
app.get('/', (req, res) => res.send('notification-service is running'));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/notifications', NotificationRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

const PORT = process.env.PORT || 8007;

connectDB();
app.listen(PORT, () => console.log('[notification-service] Server running on http://localhost:' + PORT));
