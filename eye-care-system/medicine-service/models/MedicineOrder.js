const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    medicineId: { type: String, required: true },
    quantity: { type: Number, required: true },
    patientName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MedicineOrder', schema);
