const router = require('express').Router();
const protect = require('../middleware/auth.middleware');

router.get('/', protect, (req, res) => {
  res.json({ message: 'Get all users — TODO', requestedBy: req.user });
});

router.get('/:id', protect, (req, res) => {
  res.json({ message: `Get user ${req.params.id} — TODO` });
});

router.put('/:id', protect, (req, res) => {
  res.json({ message: `Update user ${req.params.id} — TODO` });
});

router.delete('/:id', protect, (req, res) => {
  res.json({ message: `Delete user ${req.params.id} — TODO` });
});

module.exports = router;