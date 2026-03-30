const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Spectacle', schema);
