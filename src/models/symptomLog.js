const mongoose = require('mongoose');

const symptomLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  mood: String,
  symptoms: [String],
  notes: String,
  periodStatus: { type: String, enum: ['started', 'ongoing', 'ended', 'none'], default: 'none' }
}, { timestamps: true });

module.exports = mongoose.model('SymptomLog', symptomLogSchema);
