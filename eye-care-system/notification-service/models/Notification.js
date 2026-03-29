const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    recipient: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, default: "info" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', schema);
