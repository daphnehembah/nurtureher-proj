const mongoose = require('mongoose');

const riskFlagSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  riskLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },

  triggers: {
    type: [String],
    default: []
  },

  assessedAt: {
    type: Date,
    default: Date.now
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('RiskFlag', riskFlagSchema);
