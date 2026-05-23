const router = require('express').Router();
const { createProfile, getProfile, updateProfile } = require('../controllers/profile.controller');
const protect = require('../middleware/auth.middleware');

router.post('/', protect, createProfile);
router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);

module.exports = router;
