require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const MedicineRoutes = require('./routes/MedicineRoutes');
const MedicineOrderRoutes = require('./routes/MedicineOrderRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Root health-check
app.get('/', (req, res) => res.send('medicine-service is running'));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/medicines', MedicineRoutes);
app.use('/medicine-orders', MedicineOrderRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

const PORT = process.env.PORT || 8004;

connectDB();
app.listen(PORT, () => console.log('[medicine-service] Server running on http://localhost:' + PORT));
