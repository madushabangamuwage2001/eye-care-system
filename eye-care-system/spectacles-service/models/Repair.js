const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    spectacleId: { type: String, required: true },
    issue: { type: String, required: true },
    status: { type: String, default: "Pending" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Repair', schema);
