const router = require('express').Router();
const { register, login, logout, me } = require('../controllers/auth.controller');
const protect = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { registerValidator, loginValidator } = require('../middleware/validators');

router.post('/register', register);
router.post('/login', loginValidator, validate, login);
router.post('/logout', protect, logout);
router.get('/me', protect, me);

module.exports = router;
