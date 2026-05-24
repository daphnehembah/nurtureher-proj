const SymptomLog = require('../models/symptomLog');

exports.createLog = async (req, res) => {
  try {
    const log = await SymptomLog.create({ userId: req.user.id, ...req.body });
    res.status(201).json({ message: 'Log saved', log });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await SymptomLog.find({ userId: req.user.id }).sort({ date: -1 });
    res.json({ logs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getToday = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const log = await SymptomLog.findOne({ userId: req.user.id, date: { $gte: start, $lte: end } });
    res.json({ log: log || null });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByDate = async (req, res) => {
  try {
    const date = new Date(req.params.date);
    if (isNaN(date)) return res.status(400).json({ message: 'Invalid date. Use YYYY-MM-DD' });

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const log = await SymptomLog.findOne({ userId: req.user.id, date: { $gte: start, $lte: end } });
    res.json({ log: log || null });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteLog = async (req, res) => {
  try {
    const log = await SymptomLog.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!log) return res.status(404).json({ message: 'Log not found' });
    res.json({ message: 'Log deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
