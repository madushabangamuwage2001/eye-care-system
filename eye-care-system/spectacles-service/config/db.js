const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('[spectacles-service] MongoDB connected to spectacles_db');
    } catch (err) {
        console.error('[spectacles-service] MongoDB connection error:', err.message);
    }
};

module.exports = connectDB;
