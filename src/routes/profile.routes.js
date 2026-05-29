const router = require('express').Router();
const protect = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { profileValidator } = require('../middleware/validators');
const { createProfile, getProfile, updateProfile } = require('../controllers/profile.controller');

router.post('/', protect, profileValidator, validate, createProfile);
router.get('/', protect, getProfile);
router.put('/', protect, profileValidator, validate, updateProfile);

module.exports = router;
