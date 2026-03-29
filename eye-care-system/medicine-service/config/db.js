const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('[medicine-service] MongoDB connected to medicine_db');
    } catch (err) {
        console.error('[medicine-service] MongoDB connection error:', err.message);
    }
};

module.exports = connectDB;
