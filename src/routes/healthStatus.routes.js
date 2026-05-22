const router = require('express').Router();
const protect = require('../middleware/auth.middleware');

router.post('/', protect, (req, res) => res.json({ message: 'Log health status — TODO' }));
router.get('/:userId', protect, (req, res) => res.json({ message: `Get status history for ${req.params.userId} — TODO` }));

module.exports = router;