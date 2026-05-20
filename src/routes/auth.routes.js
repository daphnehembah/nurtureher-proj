const router = require('express').Router();

// POST /api/auth/register
router.post('/register', (req, res) => {
  res.json({ message: 'Register route — TODO' });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  res.json({ message: 'Login route — TODO' });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.json({ message: 'Logout route — TODO' });
});

module.exports = router;