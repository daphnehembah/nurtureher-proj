const Profile = require('../models/profile');

exports.createProfile = async (req, res) => {
  try {
    const exists = await Profile.findOne({ userId: req.user.id });
    if (exists)
      return res.status(409).json({ message: 'Profile already exists. Use PUT to update.' });

    const profile = await Profile.create({ userId: req.user.id, ...req.body, profileComplete: true });
    res.status(201).json({ message: 'Profile created', profile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({ userId: req.user.id });

    if (!profile) {
      profile = {
        userId: req.user.id,
        stage: null,
        profileComplete: false
      };
    }

    res.json({ profile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      { ...req.body, profileComplete: true },
      { new: true, upsert: true }
    );
    res.json({ message: 'Profile updated', profile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
