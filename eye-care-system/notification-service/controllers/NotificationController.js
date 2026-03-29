const Notification = require('../models/Notification');

exports.getAll = async (req, res) => {
    try {
        const data = await Notification.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const data = await Notification.findById(req.params.id);
        if (!data) return res.status(404).json({ message: 'Notification not found' });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const doc = new Notification(req.body);
        const saved = await doc.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: 'Notification not found' });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await Notification.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Notification not found' });
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
