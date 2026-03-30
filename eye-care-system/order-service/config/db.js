const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('[order-service] MongoDB connected to order_db');
    } catch (err) {
        console.error('[order-service] MongoDB connection error:', err.message);
    }
};

module.exports = connectDB;
