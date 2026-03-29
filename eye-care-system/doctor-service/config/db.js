const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('[doctor-service] MongoDB connected to doctor_db');
    } catch (err) {
        console.error('[doctor-service] MongoDB connection error:', err.message);
    }
};

module.exports = connectDB;
