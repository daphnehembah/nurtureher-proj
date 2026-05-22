const router = require('express').Router();
const { register, login, logout } = require('../controllers/auth.controller');
const protect = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, (req, res) => res.json({ message: 'Logout — TODO' }));
router.get('/me', protect, (req, res) => res.json({ message: 'Get current user — TODO', user: req.user }));

module.exports = router;