const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Medicine', schema);
