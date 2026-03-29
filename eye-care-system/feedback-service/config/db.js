const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('[feedback-service] MongoDB connected to feedback_db');
    } catch (err) {
        console.error('[feedback-service] MongoDB connection error:', err.message);
    }
};

module.exports = connectDB;
