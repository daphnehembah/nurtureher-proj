const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

  // Personal Info
  dateOfBirth: Date,
  phoneNumber: String,
  weight: Number,
  height: Number,
  bloodType: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] },

  // Pregnancy Details (pregnancy stage only)
  weeksPregnant: Number,
  dueDate: Date,
  previousPregnancies: { type: Number, default: 0 },
  previousOutcomes: String,
  complications: String,

  // Health History
  conditions: [String],
  medications: String,
  allergies: String,
  bloodPressureHistory: String,

  // Lifestyle & Habits
  smoking: String,
  alcohol: String,
  exercise: String,
  diet: String,
  sleepHours: Number,
  stressLevel: Number,

  // Preconception specific
  cycleRegularity: String,

  // Postpartum specific
  deliveryDate: Date,
  deliveryType: String,
  babyBirthWeight: Number,
  feedingMethod: String,
  mood: String,

  profileComplete: { type: Boolean, default: false }

}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
