const router = require('express').Router();
const protect = require('../middleware/auth.middleware');

router.post('/', protect, (req, res) => res.json({ message: 'Log lifestyle — TODO' }));
router.get('/:userId', protect, (req, res) => res.json({ message: `Get lifestyle history for ${req.params.userId} — TODO` }));
router.put('/:id', protect, (req, res) => res.json({ message: `Update lifestyle entry ${req.params.id} — TODO` }));

module.exports = router;