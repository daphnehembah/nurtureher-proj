const Profile = require('../models/profile');
const SymptomLog = require('../models/symptomLog');
const RiskAssessment = require('../models/riskFlag');
const calculateRisk = require('../utils/riskScoring');

// POST /api/risk/assess
const assessRisk = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await Profile.findOne({ userId });
    if (!profile)
      return res.status(404).json({ message: 'Profile not found. Please complete your profile first.' });

    const latestLog = await SymptomLog.findOne({ userId }).sort({ date: -1 });

    const { riskLevel, score, riskFactors, recommendations, warningSymptoms } = calculateRisk(profile, latestLog);

    const assessment = await RiskAssessment.create({ userId, riskLevel, score, riskFactors, recommendations, warningSymptoms });

    res.status(201).json({ message: 'Risk assessment complete', riskLevel, score, riskFactors, recommendations, warningSymptoms, assessmentId: assessment._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/risk — latest assessment
const getLatestRisk = async (req, res) => {
  try {
    const assessment = await RiskAssessment.findOne({ userId: req.user.id }).sort({ assessedAt: -1 });
    res.json({ assessment: assessment || null });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/risk/history
const getRiskHistory = async (req, res) => {
  try {
    const history = await RiskAssessment.find({ userId: req.user.id }).sort({ assessedAt: -1 });
    res.json({ history });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { assessRisk, getLatestRisk, getRiskHistory };
