const { body } = require('express-validator');

exports.registerValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('stage')
    .notEmpty().withMessage('Stage is required')
    .isIn(['preconception', 'pregnancy', 'postpartum']).withMessage('Stage must be preconception, pregnancy or postpartum')
];

exports.loginValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

exports.logValidator = [
  body('symptoms').optional().isArray().withMessage('Symptoms must be an array'),
  body('mood').optional().isString().withMessage('Mood must be a string'),
  body('notes').optional().isString().withMessage('Notes must be a string'),
  body('periodStatus')
    .optional()
    .isIn(['started', 'ongoing', 'ended', 'none']).withMessage('Invalid period status')
];

exports.profileValidator = [
  body('dateOfBirth').optional().isISO8601().withMessage('Invalid date format for dateOfBirth'),
  body('weight').optional().isNumeric().withMessage('Weight must be a number'),
  body('height').optional().isNumeric().withMessage('Height must be a number'),
  body('sleepHours').optional().isNumeric().withMessage('Sleep hours must be a number'),
  body('stressLevel').optional().isNumeric().withMessage('Stress level must be a number'),
  body('bloodType')
    .optional()
    .isIn(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']).withMessage('Invalid blood type')
];