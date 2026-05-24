const router = require('express').Router();
const { getSummary, getSymptomInsights, getMoodInsights } = require('../controllers/insights.controller');
const protect = require('../middleware/auth.middleware');

router.get('/summary', protect, getSummary);
router.get('/symptoms', protect, getSymptomInsights);
router.get('/mood', protect, getMoodInsights);

module.exports = router;
