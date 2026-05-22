const router = require('express').Router();
const protect = require('../middleware/auth.middleware');

router.post('/', protect, (req, res) => res.json({ message: 'Record symptom — TODO' }));
router.get('/:userId', protect, (req, res) => res.json({ message: `Get symptom history for ${req.params.userId} — TODO` }));

module.exports = router;