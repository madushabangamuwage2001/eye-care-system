const Spectacle = require('../models/Spectacle');

exports.getAll = async (req, res) => {
    try {
        const data = await Spectacle.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const data = await Spectacle.findById(req.params.id);
        if (!data) return res.status(404).json({ message: 'Spectacle not found' });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const doc = new Spectacle(req.body);
        const saved = await doc.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await Spectacle.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: 'Spectacle not found' });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await Spectacle.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Spectacle not found' });
        res.status(200).json({ message: 'Spectacle deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
