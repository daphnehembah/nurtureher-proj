const router = require('express').Router();
const protect = require('../middleware/auth.middleware');

router.get('/summary', protect, (req, res) => res.json({ message: 'Get insights summary — TODO' }));
router.get('/symptoms', protect, (req, res) => res.json({ message: 'Get symptom insights — TODO' }));
router.get('/mood', protect, (req, res) => res.json({ message: 'Get mood insights — TODO' }));

module.exports = router;