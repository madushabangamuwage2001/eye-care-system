require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const SpectacleRoutes = require('./routes/SpectacleRoutes');
const RepairRoutes = require('./routes/RepairRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Root health-check
app.get('/', (req, res) => res.send('spectacles-service is running'));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/spectacles', SpectacleRoutes);
app.use('/repairs', RepairRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

const PORT = process.env.PORT || 8003;

connectDB();
app.listen(PORT, () => console.log('[spectacles-service] Server running on http://localhost:' + PORT));
