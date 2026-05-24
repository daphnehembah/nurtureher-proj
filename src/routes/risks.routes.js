const router = require('express').Router();
const protect = require('../middleware/auth.middleware');

router.post('/assess', protect, (req, res) => res.json({ message: 'Run risk assessment — TODO' }));
router.get('/', protect, (req, res) => res.json({ message: 'Get risk — TODO' }));
router.get('/history', protect, (req, res) => res.json({ message: 'Get risk history — TODO' }));

module.exports = router;