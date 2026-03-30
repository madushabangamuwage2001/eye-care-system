require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const OrderRoutes = require('./routes/OrderRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Root health-check
app.get('/', (req, res) => res.send('order-service is running'));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/orders', OrderRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

const PORT = process.env.PORT || 8006;

connectDB();
app.listen(PORT, () => console.log('[order-service] Server running on http://localhost:' + PORT));
