const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

  // Personal Info (All Stages)
  dateOfBirth: Date,
  phoneNumber: String,
  weight: Number,
  height: Number,
  bloodType: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] },

  // Lifestyle (All Stages)
  smoking: String,
  alcohol: String,
  exercise: String,
  diet: String,
  sleepHours: Number,
  stressLevel: Number,

  // Pregnancy Only
  weeksPregnant: Number,
  dueDate: Date,
  previousPregnancies: { type: Number, default: 0 },
  previousOutcomes: String,
  complications: String,
  conditions: [String],
  medications: String,
  allergies: String,
  bloodPressureHistory: String,

  // Preconception Only
  lastPeriodDate: Date,
  cycleLength: Number,
  cycleRegularity: String,

  // Postpartum Only
  deliveryDate: Date,
  deliveryType: String,
  babyBirthWeight: Number,
  feedingMethod: String,
  mood: String,

  profileComplete: { type: Boolean, default: false }

}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
