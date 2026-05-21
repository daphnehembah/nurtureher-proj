const mongoose = require('mongoose');

const pregnancySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  expectedDeliveryDate: {
    type: Date,
    required: [true, 'Expected delivery date is required']
  },

  startDate: {
    type: Date,
    required: [true, 'Pregnancy start date is required']
  },

  currentWeek: {
    type: Number,
    min: 1,
    max: 42
  },

  trimester: {
    type: Number,
    enum: [1, 2, 3]
  }

}, {
  timestamps: true
});

pregnancySchema.pre('save', function (next) {
  if (this.startDate) {
    const weeksElapsed = Math.floor(
      (Date.now() - this.startDate) / (1000 * 60 * 60 * 24 * 7)
    );
    this.currentWeek = Math.min(weeksElapsed + 1, 42);

    if (this.currentWeek <= 12) this.trimester = 1;
    else if (this.currentWeek <= 26) this.trimester = 2;
    else this.trimester = 3;
  }
  next();
});

module.exports = mongoose.model('Pregnancy', pregnancySchema);
