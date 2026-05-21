const mongoose = require('mongoose');

const healthLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },

  symptoms: {
    type: [String],
    default: []
  },

  notes: {
    type: String,
    trim: true
  },

  habits: {
    smoking: {
      type: Number,
      min: 1,
      max: 5
    },
    alcohol: {
      type: Number,
      min: 1,
      max: 5
    },
    drugUse: {
      type: Number,
      min: 1,
      max: 5
    },
    sleep: {
      type: Number,
      min: 1,
      max: 5
    },
    exercise: {
      type: Number,
      min: 1,
      max: 5
    }
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('HealthLog', healthLogSchema);
