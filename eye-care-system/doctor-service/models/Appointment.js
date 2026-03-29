const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    patientName: { type: String, required: true },
    doctorName: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', schema);
