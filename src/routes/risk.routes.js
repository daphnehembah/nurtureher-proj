const router = require('express').Router();
const { assessRisk, getRiskHistory } = require('../controllers/risk.controller');

// POST /api/risk/assess/:userId  — run risk assessment for a user
router.post('/assess/:userId', assessRisk);

// GET /api/risk/history/:userId  — get all past risk assessments for a user
router.get('/history/:userId', getRiskHistory);

module.exports = router;
