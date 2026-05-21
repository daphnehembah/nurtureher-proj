const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },

  age: {
    type: Number,
    min: 10,
    max: 100
  },

  weight: {
    type: Number,
    min: 0
  },

  contact: {
    type: String,
    trim: true
  },

  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
  },

  medicalHistory: {
    type: String,
    trim: true
  },

  previousPregnancies: {
    type: Number,
    default: 0,
    min: 0
  },

  maternalStage: {
    type: String,
    enum: ['preconception', 'pregnant', 'postpartum'],
    required: [true, 'Maternal stage is required']
  }

}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
