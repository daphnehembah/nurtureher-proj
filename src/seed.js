require('dotenv').config({ override: true });
const mongoose = require('mongoose');

const User = require('./models/user');
const Profile = require('./models/profile');
const SymptomLog = require('./models/symptomLog');
const RiskAssessment = require('./models/riskFlag');

const connectDB = require('../config/db');

const seed = async () => {
  await connectDB();

  await User.deleteMany();
  await Profile.deleteMany();
  await SymptomLog.deleteMany();
  await RiskAssessment.deleteMany();
  console.log('Cleared existing data');

  // ── Users ─────────────────────────────────────────────────────
  const users = await User.insertMany([
    { name: 'Amina Yusuf',   email: 'amina@dhnm.com',  password: 'password123', stage: 'pregnancy' },
    { name: 'Fatima Bello',  email: 'fatima@dhnm.com', password: 'password123', stage: 'postpartum' },
    { name: 'Chioma Okafor', email: 'chioma@dhnm.com', password: 'password123', stage: 'preconception' }
  ]);
  console.log(`Created ${users.length} users`);

  // ── Profiles ──────────────────────────────────────────────────
  await Profile.insertMany([
    {
      userId: users[0]._id,
      dateOfBirth: new Date('1996-03-15'),
      phoneNumber: '08012345678',
      weight: 65, height: 162, bloodType: 'O+',
      weeksPregnant: 20,
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 140),
      previousPregnancies: 1,
      conditions: ['Mild anaemia'],
      smoking: 'No', alcohol: 'No', exercise: 'Sometimes',
      sleepHours: 6, stressLevel: 2,
      profileComplete: true
    },
    {
      userId: users[1]._id,
      dateOfBirth: new Date('1992-07-22'),
      phoneNumber: '08023456789',
      weight: 72, height: 165, bloodType: 'A+',
      previousPregnancies: 2,
      conditions: ['Hypertension'],
      smoking: 'No', alcohol: 'Occasionally', exercise: 'Regularly',
      sleepHours: 7, stressLevel: 3,
      deliveryDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      deliveryType: 'Vaginal', feedingMethod: 'Breastfeeding',
      profileComplete: true
    },
    {
      userId: users[2]._id,
      dateOfBirth: new Date('1999-11-05'),
      phoneNumber: '08034567890',
      weight: 58, height: 160, bloodType: 'B+',
      conditions: [],
      smoking: 'No', alcohol: 'No', exercise: 'Regularly',
      sleepHours: 8, stressLevel: 1,
      lastPeriodDate: new Date('2026-05-01'),
      cycleLength: 28,
      cycleRegularity: 'Regular',
      profileComplete: true
    }
  ]);
  console.log('Created 3 profiles');

  // ── Symptom Logs ──────────────────────────────────────────────
  await SymptomLog.insertMany([
    { userId: users[0]._id, mood: 'Tired',  symptoms: ['Nausea', 'Fatigue', 'Back pain'], notes: 'Feeling tired most of the day', periodStatus: 'none' },
    { userId: users[1]._id, mood: 'Low',    symptoms: ['Headache', 'Swollen feet'],       notes: 'Headache persistent for 2 days',  periodStatus: 'none' },
    { userId: users[2]._id, mood: 'Great',  symptoms: [],                                 notes: 'Feeling good, preparing for pregnancy', periodStatus: 'ongoing' }
  ]);
  console.log('Created 3 symptom logs');

  // ── Risk Assessments ──────────────────────────────────────────
  await RiskAssessment.insertMany([
    {
      userId: users[0]._id,
      riskLevel: 'medium', score: 4,
      riskFactors: ['Medical condition: Mild anaemia', 'Concerning symptom: Fatigue'],
      recommendations: ['Monitor iron levels', 'Maintain a healthy diet and stay hydrated'],
      warningSymptoms: []
    },
    {
      userId: users[1]._id,
      riskLevel: 'high', score: 7,
      riskFactors: ['High-risk condition: Hypertension', 'Concerning symptom: Headache', 'Concerning symptom: Swollen feet'],
      recommendations: ['Seek immediate medical review for Hypertension', 'Monitor blood pressure daily'],
      warningSymptoms: []
    },
    {
      userId: users[2]._id,
      riskLevel: 'low', score: 0,
      riskFactors: [],
      recommendations: ['Continue attending all antenatal appointments', 'Maintain a healthy diet and stay hydrated'],
      warningSymptoms: []
    }
  ]);
  console.log('Created 3 risk assessments');

  console.log('\nSeed complete. Test accounts:');
  console.log(`  amina@dhnm.com   — pregnancy     | userId: ${users[0]._id}`);
  console.log(`  fatima@dhnm.com  — postpartum    | userId: ${users[1]._id}`);
  console.log(`  chioma@dhnm.com  — preconception | userId: ${users[2]._id}`);
  console.log('  password for all: password123');

  mongoose.connection.close();
};

seed().catch((err) => {
  console.error('Seed failed:', err);
  mongoose.connection.close();
  process.exit(1);
});
