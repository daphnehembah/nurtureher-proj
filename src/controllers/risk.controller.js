const User = require('../models/user');
const HealthLog = require('../models/healthLog');
const RiskFlag = require('../models/riskFlag');
const calculateRisk = require('../utils/riskScoring');

// POST /api/risk/assess/:userId
const assessRisk = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get the most recent health log for this user
    const latestHealthLog = await HealthLog.findOne({ user: userId })
      .sort({ createdAt: -1 });

    const { riskLevel, triggers } = calculateRisk(user, latestHealthLog);

    // Save the result to RiskFlag collection
    const riskFlag = await RiskFlag.create({
      user: userId,
      riskLevel,
      triggers
    });

    res.status(201).json({
      message: 'Risk assessment complete',
      riskLevel,
      triggers,
      riskFlagId: riskFlag._id
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/risk/history/:userId
const getRiskHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const history = await RiskFlag.find({ user: userId })
      .sort({ assessedAt: -1 });

    res.json({ history });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { assessRisk, getRiskHistory };
