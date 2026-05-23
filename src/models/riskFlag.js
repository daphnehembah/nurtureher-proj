const mongoose = require('mongoose');

const riskAssessmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true
  },
  score: { type: Number, default: 0 },
  riskFactors: [String],
  recommendations: [String],
  warningSymptoms: [String],
  assessedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RiskAssessment', riskAssessmentSchema);
