const router = require('express').Router();
const protect = require('../middleware/auth.middleware');

router.post('/', protect, (req, res) => res.json({ message: 'Submit health profile — TODO' }));
router.get('/:userId', protect, (req, res) => res.json({ message: `Get health profile for ${req.params.userId} — TODO` }));
router.put('/:id', protect, (req, res) => res.json({ message: `Update health profile ${req.params.id} — TODO` }));

module.exports = router;