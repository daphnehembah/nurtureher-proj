// Takes a profile document and the user's latest symptom log
// Returns { riskLevel, riskFactors, recommendations }

const calculateRisk = (profile, latestSymptomLog) => {
  const riskFactors = [];
  const recommendations = [];
  let points = 0;

  // ── Age checks (from dateOfBirth) ────────────────────────────
  if (profile.dateOfBirth) {
    const age = Math.floor((Date.now() - new Date(profile.dateOfBirth)) / (1000 * 60 * 60 * 24 * 365));
    if (age < 18) {
      riskFactors.push('Age under 18 (teenage pregnancy)');
      recommendations.push('Seek specialist care — teenage pregnancies need extra monitoring');
      points += 3;
    } else if (age > 40) {
      riskFactors.push('Age over 40 (advanced maternal age)');
      recommendations.push('Regular monitoring recommended for advanced maternal age');
      points += 3;
    } else if (age >= 35) {
      riskFactors.push('Age 35–40 (elevated maternal age)');
      points += 1;
    }
  }

  // ── Medical conditions (array from profile) ──────────────────
  if (profile.conditions && profile.conditions.length > 0) {
    const highRisk = ['hypertension', 'diabetes', 'preeclampsia', 'eclampsia', 'gestational diabetes', 'heart disease'];
    const mediumRisk = ['anaemia', 'anemia', 'thyroid', 'asthma', 'sickle cell'];

    profile.conditions.forEach((condition) => {
      const c = condition.toLowerCase();
      if (highRisk.some(h => c.includes(h))) {
        riskFactors.push(`High-risk condition: ${condition}`);
        recommendations.push(`Seek immediate medical review for ${condition}`);
        points += 3;
      } else if (mediumRisk.some(m => c.includes(m))) {
        riskFactors.push(`Medical condition: ${condition}`);
        points += 1;
      }
    });
  }

  // ── Previous pregnancies ─────────────────────────────────────
  if (profile.previousPregnancies >= 4) {
    riskFactors.push('4 or more previous pregnancies');
    recommendations.push('Consult your doctor about grand multiparity risks');
    points += 2;
  }

  // ── Blood type (Rh negative) ─────────────────────────────────
  if (profile.bloodType && profile.bloodType.includes('-')) {
    riskFactors.push(`Rh-negative blood type (${profile.bloodType})`);
    recommendations.push('Ensure Rh-D immunoglobulin injections are kept up to date');
    points += 1;
  }

  // ── Lifestyle habits (stored as text from onboarding form) ───
  if (profile.smoking) {
    const s = profile.smoking.toLowerCase();
    if (['yes', 'daily', 'regularly'].includes(s)) {
      riskFactors.push(`Smoking: ${profile.smoking}`);
      recommendations.push('Stop smoking immediately — seek cessation support');
      points += 3;
    } else if (s === 'occasionally' || s === 'sometimes') {
      riskFactors.push(`Occasional smoking reported`);
      recommendations.push('Avoid all smoking during pregnancy');
      points += 1;
    }
  }

  if (profile.alcohol) {
    const a = profile.alcohol.toLowerCase();
    if (['yes', 'regularly', 'daily'].includes(a)) {
      riskFactors.push(`Alcohol use: ${profile.alcohol}`);
      recommendations.push('Avoid all alcohol during pregnancy');
      points += 3;
    } else if (a === 'occasionally' || a === 'sometimes') {
      riskFactors.push(`Occasional alcohol use reported`);
      points += 1;
    }
  }

  if (profile.sleepHours && profile.sleepHours < 5) {
    riskFactors.push(`Very low sleep (${profile.sleepHours} hours/night)`);
    recommendations.push('Aim for 7–9 hours of sleep per night');
    points += 1;
  }

  if (profile.stressLevel && profile.stressLevel >= 4) {
    riskFactors.push(`High stress level (${profile.stressLevel}/5)`);
    recommendations.push('Consider stress management or counselling support');
    points += 1;
  }

  // ── Symptom checks (from latest symptom log) ─────────────────
  if (latestSymptomLog && latestSymptomLog.symptoms) {
    const symptoms = latestSymptomLog.symptoms.map(s => s.toLowerCase());

    const highRiskSymptoms = ['bleeding', 'heavy bleeding', 'chest pain', 'difficulty breathing', 'seizure', 'unconscious', 'severe headache', 'sudden vision'];
    const mediumRiskSymptoms = ['headache', 'swollen feet', 'swelling', 'dizziness', 'vomiting', 'fever'];

    symptoms.forEach((symptom) => {
      if (highRiskSymptoms.some(s => symptom.includes(s))) {
        riskFactors.push(`High-risk symptom: ${symptom}`);
        recommendations.push(`Seek emergency care for: ${symptom}`);
        points += 3;
      } else if (mediumRiskSymptoms.some(s => symptom.includes(s))) {
        riskFactors.push(`Concerning symptom: ${symptom}`);
        recommendations.push(`Monitor and report to your doctor: ${symptom}`);
        points += 1;
      }
    });
  }

  // ── Determine risk level ─────────────────────────────────────
  let riskLevel;
  if (points >= 9) {
    riskLevel = 'Critical';
  } else if (points >= 6) {
    riskLevel = 'High';
  } else if (points >= 3) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'Low';
  }

  if (riskLevel === 'Low') {
    recommendations.push('Continue attending all antenatal appointments');
    recommendations.push('Maintain a healthy diet and stay hydrated');
  }

  return { riskLevel, riskFactors, recommendations };
};

module.exports = calculateRisk;
