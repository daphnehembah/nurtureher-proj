const router = require('express').Router();
const protect = require('../middleware/auth.middleware');

router.get('/', protect, (req, res) => res.json({ message: 'Get logs — TODO' }));
router.post('/', protect, (req, res) => res.json({ message: 'Post log — TODO' }));
router.put('/:id', protect, (req, res) => res.json({ message: `Update log ${req.params.id} — TODO` }));
router.get('/today', protect, (req, res) => res.json({ message: 'Get today logs — TODO' }));
router.get('/:date', protect, (req, res) => res.json({ message: `Get logs for ${req.params.date} — TODO` }));
router.delete('/:id', protect, (req, res) => res.json({ message: `Delete log ${req.params.id} — TODO` }));

module.exports = router;