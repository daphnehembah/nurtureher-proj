const router = require('express').Router();

// GET /api/users
router.get('/', (req, res) => {
  res.json({ message: 'Get all users — TODO' });
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  res.json({ message: `Get user ${req.params.id} — TODO` });
});

// PUT /api/users/:id
router.put('/:id', (req, res) => {
  res.json({ message: `Update user ${req.params.id} — TODO` });
});

// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete user ${req.params.id} — TODO` });
});

module.exports = router;