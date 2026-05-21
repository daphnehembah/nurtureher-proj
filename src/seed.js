const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/user');
const Pregnancy = require('./models/pregnancy');
const HealthLog = require('./models/healthLog');
const RiskFlag = require('./models/riskFlag');

const connectDB = require('../config/db');

const seed = async () => {
  await connectDB();

  // Clear existing data
  await User.deleteMany();
  await Pregnancy.deleteMany();
  await HealthLog.deleteMany();
  await RiskFlag.deleteMany();
  console.log('Cleared existing data');

  // ── Create Users ──────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('password123', 10);

  const users = await User.insertMany([
    {
      name: 'Amina Yusuf',
      email: 'amina@test.com',
      password: hashedPassword,
      age: 28,
      weight: 65,
      contact: '08012345678',
      bloodGroup: 'O+',
      medicalHistory: 'Mild anaemia',
      previousPregnancies: 1,
      maternalStage: 'pregnant'
    },
    {
      name: 'Fatima Bello',
      email: 'fatima@test.com',
      password: hashedPassword,
      age: 32,
      weight: 72,
      contact: '08023456789',
      bloodGroup: 'A+',
      medicalHistory: 'Hypertension',
      previousPregnancies: 2,
      maternalStage: 'postpartum'
    },
    {
      name: 'Chioma Okafor',
      email: 'chioma@test.com',
      password: hashedPassword,
      age: 25,
      weight: 58,
      contact: '08034567890',
      bloodGroup: 'B+',
      medicalHistory: 'None',
      previousPregnancies: 0,
      maternalStage: 'preconception'
    }
  ]);

  console.log(`Created ${users.length} users`);

  // ── Create Pregnancies (only for pregnant user) ───────────────
  const pregnancyStartDate = new Date();
  pregnancyStartDate.setDate(pregnancyStartDate.getDate() - 100);

  const pregnancies = await Pregnancy.insertMany([
    {
      user: users[0]._id,
      startDate: pregnancyStartDate,
      expectedDeliveryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 180)
    }
  ]);

  console.log(`Created ${pregnancies.length} pregnancy record(s)`);

  // ── Create Health Logs ────────────────────────────────────────
  const healthLogs = await HealthLog.insertMany([
    {
      user: users[0]._id,
      symptoms: ['nausea', 'fatigue', 'back pain'],
      notes: 'Feeling tired most of the day',
      habits: {
        smoking: 1,
        alcohol: 1,
        drugUse: 1,
        sleep: 3,
        exercise: 2
      }
    },
    {
      user: users[1]._id,
      symptoms: ['headache', 'swollen feet'],
      notes: 'Headache has been persistent for 2 days',
      habits: {
        smoking: 1,
        alcohol: 2,
        drugUse: 1,
        sleep: 4,
        exercise: 3
      }
    },
    {
      user: users[2]._id,
      symptoms: [],
      notes: 'Feeling good, preparing for pregnancy',
      habits: {
        smoking: 1,
        alcohol: 2,
        drugUse: 1,
        sleep: 5,
        exercise: 4
      }
    }
  ]);

  console.log(`Created ${healthLogs.length} health log(s)`);

  // ── Create Risk Flags ─────────────────────────────────────────
  const riskFlags = await RiskFlag.insertMany([
    {
      user: users[0]._id,
      riskLevel: 'Medium',
      triggers: ['fatigue reported 3+ days', 'low exercise score']
    },
    {
      user: users[1]._id,
      riskLevel: 'High',
      triggers: ['hypertension in medical history', 'persistent headache', 'swollen feet']
    },
    {
      user: users[2]._id,
      riskLevel: 'Low',
      triggers: []
    }
  ]);

  console.log(`Created ${riskFlags.length} risk flag(s)`);

  console.log('\nSeed complete. Test accounts:');
  console.log('  amina@test.com   — pregnant');
  console.log('  fatima@test.com  — postpartum');
  console.log('  chioma@test.com  — preconception');
  console.log('  password for all: password123');

  mongoose.connection.close();
};

seed().catch((err) => {
  console.error('Seed failed:', err);
  mongoose.connection.close();
  process.exit(1);
});
