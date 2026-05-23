const mongoose = require('mongoose');

const riskAssessmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  riskLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    required: true
  },
  riskFactors: [String],
  recommendations: [String],
  assessedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RiskAssessment', riskAssessmentSchema);
