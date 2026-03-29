const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('[notification-service] MongoDB connected to notification_db');
    } catch (err) {
        console.error('[notification-service] MongoDB connection error:', err.message);
    }
};

module.exports = connectDB;
