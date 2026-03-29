const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    patientName: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', schema);
