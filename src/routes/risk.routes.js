const router = require('express').Router();
const protect = require('../middleware/auth.middleware');

router.post('/predict', protect, (req, res) => res.json({ message: 'Run risk prediction — TODO' }));
router.get('/:userId', protect, (req, res) => res.json({ message: `Get risk assessment for ${req.params.userId} — TODO` }));

module.exports = router;
