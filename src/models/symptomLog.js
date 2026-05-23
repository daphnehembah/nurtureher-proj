const mongoose = require('mongoose');

const symptomLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  mood: String,
  symptoms: [String],
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('SymptomLog', symptomLogSchema);
