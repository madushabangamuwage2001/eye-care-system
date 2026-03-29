const Medicine = require('../models/Medicine');

exports.getAll = async (req, res) => {
    try {
        const data = await Medicine.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const data = await Medicine.findById(req.params.id);
        if (!data) return res.status(404).json({ message: 'Medicine not found' });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const doc = new Medicine(req.body);
        const saved = await doc.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: 'Medicine not found' });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await Medicine.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Medicine not found' });
        res.status(200).json({ message: 'Medicine deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
