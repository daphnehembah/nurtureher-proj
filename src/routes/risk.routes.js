const router = require('express').Router();
const { assessRisk, getLatestRisk, getRiskHistory } = require('../controllers/risk.controller');
const protect = require('../middleware/auth.middleware');

router.post('/assess', protect, assessRisk);
router.get('/', protect, getLatestRisk);
router.get('/history', protect, getRiskHistory);

module.exports = router;
