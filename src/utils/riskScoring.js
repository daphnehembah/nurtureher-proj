// Risk scoring logic for NurtureHer
// Takes a user document and their latest health log
// Returns { riskLevel: 'Low' | 'Medium' | 'High', triggers: [...] }

const calculateRisk = (user, latestHealthLog) => {
  const triggers = [];
  let points = 0;

  // ── Age checks ──────────────────────────────────────────────
  if (user.age) {
    if (user.age < 18) {
      triggers.push('Age under 18 (teenage pregnancy)');
      points += 3;
    } else if (user.age > 40) {
      triggers.push('Age over 40 (advanced maternal age)');
      points += 3;
    } else if (user.age >= 35) {
      triggers.push('Age 35–40 (elevated maternal age)');
      points += 1;
    }
  }

  // ── Medical history checks ───────────────────────────────────
  if (user.medicalHistory) {
    const history = user.medicalHistory.toLowerCase();

    const highRiskConditions = [
      'hypertension', 'diabetes', 'preeclampsia',
      'eclampsia', 'gestational diabetes', 'heart disease'
    ];
    const mediumRiskConditions = [
      'anaemia', 'anemia', 'thyroid', 'asthma', 'sickle cell'
    ];

    highRiskConditions.forEach((condition) => {
      if (history.includes(condition)) {
        triggers.push(`High-risk condition in medical history: ${condition}`);
        points += 3;
      }
    });

    mediumRiskConditions.forEach((condition) => {
      if (history.includes(condition)) {
        triggers.push(`Medical history includes: ${condition}`);
        points += 1;
      }
    });
  }

  // ── Previous pregnancies ─────────────────────────────────────
  if (user.previousPregnancies >= 4) {
    triggers.push('4 or more previous pregnancies');
    points += 2;
  }

  // ── Blood group (Rh negative needs monitoring) ───────────────
  if (user.bloodGroup && user.bloodGroup.includes('-')) {
    triggers.push(`Rh-negative blood group (${user.bloodGroup}) — requires monitoring`);
    points += 1;
  }

  // ── Lifestyle habit checks (from latest health log) ──────────
  if (latestHealthLog && latestHealthLog.habits) {
    const { smoking, alcohol, drugUse, sleep, exercise } = latestHealthLog.habits;

    if (smoking >= 3) {
      triggers.push(`High smoking habit score (${smoking}/5)`);
      points += 3;
    } else if (smoking === 2) {
      triggers.push(`Moderate smoking habit score (${smoking}/5)`);
      points += 1;
    }

    if (alcohol >= 3) {
      triggers.push(`High alcohol intake score (${alcohol}/5)`);
      points += 3;
    } else if (alcohol === 2) {
      triggers.push(`Moderate alcohol intake score (${alcohol}/5)`);
      points += 1;
    }

    if (drugUse >= 2) {
      triggers.push(`Drug use reported (score: ${drugUse}/5)`);
      points += 3;
    }

    if (sleep <= 2) {
      triggers.push(`Poor sleep quality score (${sleep}/5)`);
      points += 1;
    }

    if (exercise <= 1) {
      triggers.push(`Very low exercise score (${exercise}/5)`);
      points += 1;
    }
  }

  // ── Symptom checks ───────────────────────────────────────────
  if (latestHealthLog && latestHealthLog.symptoms) {
    const symptoms = latestHealthLog.symptoms.map((s) => s.toLowerCase());

    const highRiskSymptoms = [
      'bleeding', 'heavy bleeding', 'chest pain',
      'difficulty breathing', 'seizure', 'unconscious',
      'severe headache', 'sudden vision'
    ];
    const mediumRiskSymptoms = [
      'headache', 'swollen feet', 'swelling',
      'dizziness', 'vomiting', 'fever'
    ];

    symptoms.forEach((symptom) => {
      if (highRiskSymptoms.some((s) => symptom.includes(s))) {
        triggers.push(`High-risk symptom reported: ${symptom}`);
        points += 3;
      } else if (mediumRiskSymptoms.some((s) => symptom.includes(s))) {
        triggers.push(`Concerning symptom reported: ${symptom}`);
        points += 1;
      }
    });
  }

  // ── Determine risk level from total points ───────────────────
  let riskLevel;
  if (points >= 6) {
    riskLevel = 'High';
  } else if (points >= 3) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'Low';
  }

  return { riskLevel, triggers };
};

module.exports = calculateRisk;
