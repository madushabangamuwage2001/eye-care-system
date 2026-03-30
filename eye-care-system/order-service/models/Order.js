const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    patientName: { type: String, required: true },
    item: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, default: "Pending" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', schema);
