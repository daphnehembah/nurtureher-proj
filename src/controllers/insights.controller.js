const SymptomLog = require('../models/symptomLog');

function getMostCommon(arr, limit) {
  const counts = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

exports.getSummary = async (req, res) => {
  try {
    const logs = await SymptomLog.find({ userId: req.user.id }).sort({ date: -1 }).limit(30);
    const allSymptoms = logs.flatMap(l => l.symptoms || []);
    const allMoods = logs.map(l => l.mood).filter(Boolean);

    res.json({
      totalLogs: logs.length,
      commonSymptoms: getMostCommon(allSymptoms, 5),
      recentMoods: allMoods.slice(0, 7),
      lastLogged: logs[0]?.date || null
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSymptomInsights = async (req, res) => {
  try {
    const logs = await SymptomLog.find({ userId: req.user.id });
    const allSymptoms = logs.flatMap(l => l.symptoms || []);
    res.json({ symptoms: getMostCommon(allSymptoms, 10) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMoodInsights = async (req, res) => {
  try {
    const logs = await SymptomLog.find({ userId: req.user.id }).sort({ date: -1 }).limit(30);
    const moods = logs.map(l => ({ date: l.date, mood: l.mood })).filter(l => l.mood);
    res.json({ moods });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
