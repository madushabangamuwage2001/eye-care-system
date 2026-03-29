const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('[user-service] MongoDB connected to user_db');
    } catch (err) {
        console.error('[user-service] MongoDB connection error:', err.message);
    }
};

module.exports = connectDB;
