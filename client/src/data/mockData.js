export const mockUser = {
  name: 'Amara Johnson',
  email: 'amara@example.com',
  stage: 'pregnancy',
  weeksPregnant: 20,
  dueDate: '2025-10-15',
  bloodType: 'O+',
  riskLevel: 'low',
}

export const babySize = {
  1: { fruit: 'Poppy Seed', emoji: '🌱', size: '0.1cm' },
  4: { fruit: 'Peppercorn', emoji: '🫚', size: '0.2cm' },
  8: { fruit: 'Raspberry', emoji: '🫐', size: '1.6cm' },
  12: { fruit: 'Lime', emoji: '🍋', size: '5.4cm' },
  16: { fruit: 'Avocado', emoji: '🥑', size: '11.6cm' },
  20: { fruit: 'Mango', emoji: '🥭', size: '16.5cm' },
  24: { fruit: 'Corn', emoji: '🌽', size: '30cm' },
  28: { fruit: 'Eggplant', emoji: '🍆', size: '37.6cm' },
  32: { fruit: 'Squash', emoji: '🎃', size: '42.4cm' },
  36: { fruit: 'Honeydew', emoji: '🍈', size: '47.4cm' },
  40: { fruit: 'Watermelon', emoji: '🍉', size: '51cm' },
}

export const tipsOfTheDay = [
  'Stay hydrated — aim for 8–10 glasses of water today 💧',
  'Take a short 10-minute walk to boost circulation 🚶‍♀️',
  'Practice deep breathing to reduce stress and anxiety 🌬️',
  'Eat iron-rich foods like spinach and lentils today 🥬',
  'Rest when you need to — your body is doing incredible work 💜',
  'Attend all scheduled prenatal appointments 🏥',
  'Avoid raw or undercooked foods during pregnancy 🍱',
  'Track your baby\'s movements — 10 kicks in 2 hours is healthy 👶',
]

export const trimesterInfo = (weeks) => {
  if (weeks <= 12) {
    const day = weeks * 7
    return { trimester: 'First Trimester', day, label: `Week ${weeks} of First Trimester` }
  } else if (weeks <= 26) {
    const day = (weeks - 13) * 7
    return { trimester: 'Second Trimester', day, label: `Week ${weeks} — Day ${day} of Second Trimester` }
  } else {
    const day = (weeks - 27) * 7
    return { trimester: 'Third Trimester', day, label: `Week ${weeks} — Day ${day} of Third Trimester` }
  }
}

export const getBabySize = (weeks) => {
  const keys = Object.keys(babySize).map(Number).sort((a, b) => a - b)
  let closest = keys[0]
  for (const k of keys) {
    if (weeks >= k) closest = k
  }
  return babySize[closest]
}

// Preconception mock data
export const mockPreconceptionUser = {
  name: 'Amara Johnson',
  stage: 'preconception',
  lastPeriodDate: '2026-05-01',
  cycleLength: 28,
  riskLevel: 'low',
}

// Postpartum mock data
export const mockPostpartumUser = {
  name: 'Amara Johnson',
  stage: 'postpartum',
  deliveryDate: '2026-04-20',
  babyName: 'Baby girl',
  riskLevel: 'low',
}

// Preconception tips
export const preconceptionTips = [
  'Take folic acid daily — it reduces the risk of birth defects 💊',
  'Track your cycle to identify your fertile window 📅',
  'Maintain a healthy weight before conceiving 🥗',
  'Avoid smoking and alcohol when trying to conceive 🚭',
  'Visit your doctor for a preconception checkup 🏥',
  'Reduce stress — try yoga or meditation 🧘‍♀️',
  'Eat iron-rich foods like spinach and legumes 🥬',
]

// Postpartum tips
export const postpartumTips = [
  'Rest whenever your baby sleeps — recovery takes time 💜',
  'Stay hydrated especially if you are breastfeeding 💧',
  'Accept help from family and friends 🤝',
  'Watch for signs of postpartum depression and seek help early 🌸',
  'Gentle walks can help with physical and mental recovery 🚶‍♀️',
  'Eat nutritious meals to support your recovery 🥗',
  'Be patient with yourself — you just did something incredible 💪',
]

// Fertile window calculator
export const getFertileWindow = (lastPeriodDate, cycleLength = 28) => {
  const last = new Date(lastPeriodDate)
  const today = new Date()
  const daysSincePeriod = Math.floor((today - last) / (1000 * 60 * 60 * 24))
  const ovulationDay = cycleLength - 14
  const fertileStart = ovulationDay - 5
  const fertileEnd = ovulationDay + 1
  const daysUntilFertile = fertileStart - daysSincePeriod
  const nextPeriodIn = cycleLength - daysSincePeriod

  const isInFertileWindow = daysSincePeriod >= fertileStart && daysSincePeriod <= fertileEnd

  return {
    daysSincePeriod,
    cycleDay: daysSincePeriod + 1,
    isInFertileWindow,
    daysUntilFertile: Math.max(0, daysUntilFertile),
    fertileStart,
    fertileEnd,
    nextPeriodIn: Math.max(0, nextPeriodIn),
    ovulationDay,
  }
}

// Baby age calculator for postpartum
export const getBabyAge = (deliveryDate) => {
  const delivery = new Date(deliveryDate)
  const today = new Date()
  const days = Math.floor((today - delivery) / (1000 * 60 * 60 * 24))
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)

  if (days < 7) return { label: `${days} day${days !== 1 ? 's' : ''}`, days }
  if (weeks < 8) return { label: `${weeks} week${weeks !== 1 ? 's' : ''}`, days }
  return { label: `${months} month${months !== 1 ? 's' : ''}`, days }
}

export const mockRiskData = {
  riskLevel: 'medium',
  score: 4,
  lastAssessed: '2026-05-19',
  riskFactors: [
    'History of high blood pressure',
    'BMI above healthy range',
    'Headache reported 3 times this week'
  ],
  recommendations: [
    'Monitor your blood pressure daily',
    'Attend all scheduled prenatal appointments',
    'Contact your doctor if headaches persist',
    'Reduce sodium intake and stay hydrated'
  ],
  warningSymptoms: [
    'Blurred vision',
    'Sudden swelling of hands or face',
    'Chest pain or shortness of breath',
    'Severe headache that won\'t go away'
  ],
  history: [
    { date: '2026-04-01', level: 'low' },
    { date: '2026-04-15', level: 'low' },
    { date: '2026-05-01', level: 'medium' },
    { date: '2026-05-19', level: 'medium' },
  ]
}
export const weeklyInsights = {
  1: {
    body: [
      'Your body is preparing for ovulation and fertilisation',
      'Hormone levels are rising to support a potential pregnancy',
      'The lining of your uterus is thickening',
      'You may experience mild cramping or spotting'
    ],
    baby: [
      'Fertilisation may occur this week',
      'A single sperm will fertilise the egg to form a zygote',
      'The fertilised egg begins dividing rapidly',
      'It travels down the fallopian tube to the uterus'
    ],
    tips: [
      'Start taking folic acid if you haven\'t already 💊',
      'Avoid alcohol and smoking this week 🚭',
      'Track your basal body temperature for ovulation signs 🌡️',
      'Stay hydrated and eat nutritious meals 🥗'
    ]
  },
  4: {
    body: [
      'You may have just missed your period — a sign of pregnancy!',
      'Your uterus is beginning to grow',
      'Hormones hCG and progesterone are rising rapidly',
      'You may feel bloated, tired or have sore breasts'
    ],
    baby: [
      'Your baby is the size of a poppy seed 🌱',
      'The embryo is implanting into the uterine lining',
      'Three layers are forming — these become organs, muscles and skin',
      'The neural tube (brain and spinal cord) is beginning to develop'
    ],
    tips: [
      'Take a pregnancy test if you haven\'t already 🤰',
      'Book your first prenatal appointment 🏥',
      'Avoid raw fish, deli meats and unpasteurised cheese 🚫',
      'Get plenty of rest — your body is working hard 💜'
    ]
  },
  8: {
    body: [
      'Morning sickness may be at its peak this week',
      'Your uterus has grown to the size of a large orange',
      'Breasts may feel tender and fuller',
      'You may need to urinate more frequently',
      'Fatigue is very common — rest as much as you can'
    ],
    baby: [
      'Your baby is the size of a raspberry 🫐',
      'Tiny fingers and toes are beginning to form',
      'The heart is beating about 150 times per minute',
      'Eyes, nose and mouth are taking shape',
      'Major organs like kidneys and liver are developing'
    ],
    tips: [
      'Eat small frequent meals to manage nausea 🍽️',
      'Ginger tea can help with morning sickness 🫖',
      'Stay hydrated even if you\'re feeling nauseous 💧',
      'Wear a supportive bra as breasts grow 👙'
    ]
  },
  12: {
    body: [
      'You\'re almost at the end of your first trimester!',
      'Morning sickness usually starts to ease this week',
      'Your uterus is now the size of a grapefruit',
      'You may notice a small bump starting to show',
      'Energy levels should start improving soon'
    ],
    baby: [
      'Your baby is the size of a lime 🍋',
      'All major organs are formed and starting to function',
      'Baby can open and close their fists',
      'Reflexes are developing — baby may suck their thumb',
      'Fingernails and toenails are growing'
    ],
    tips: [
      'Your 12-week scan is coming up — an exciting milestone! 🌟',
      'Start thinking about announcing your pregnancy 🎉',
      'Continue taking prenatal vitamins daily 💊',
      'Light exercise like walking or swimming is great 🏊‍♀️'
    ]
  },
  16: {
    body: [
      'You\'re in the second trimester — many mums feel much better now',
      'Your bump is becoming more visible',
      'You may start to feel baby movements (quickening) soon',
      'Skin changes like a pregnancy glow or stretch marks may appear',
      'Your hair may feel thicker and shinier due to hormones'
    ],
    baby: [
      'Your baby is the size of an avocado 🥑',
      'Baby can make facial expressions',
      'Hearing is developing — they can hear your voice!',
      'Tiny bones are hardening',
      'Baby is covered in fine hair called lanugo'
    ],
    tips: [
      'Start sleeping on your left side for better blood flow 😴',
      'Use pregnancy-safe moisturiser for stretch marks 🧴',
      'Talk or sing to your baby — they can hear you! 🎵',
      'Stay active with gentle prenatal yoga 🧘‍♀️'
    ]
  },
  20: {
    body: [
      'You\'re halfway there — congratulations! 🎉',
      'Your uterus is now level with your belly button',
      'You should be feeling baby kicks regularly by now',
      'Back pain may increase as your bump grows',
      'You may experience round ligament pain — sharp pains in your lower abdomen'
    ],
    baby: [
      'Your baby is the size of a mango 🥭',
      'Baby is swallowing amniotic fluid and practising breathing',
      'Covered in vernix — a protective waxy coating',
      'Fingerprints are fully formed',
      'Baby sleeps and wakes in regular cycles'
    ],
    tips: [
      'Your anatomy scan is around this week — so exciting! 🩺',
      'Start doing pelvic floor exercises daily 💪',
      'Track baby\'s kicks — 10 movements in 2 hours is healthy 👶',
      'Consider starting a birth plan conversation with your doctor 📋'
    ]
  },
  24: {
    body: [
      'Your uterus is now the size of a football',
      'You may experience Braxton Hicks contractions — practice contractions',
      'Heartburn and indigestion may become more frequent',
      'Swelling in feet and ankles is common',
      'Your centre of gravity is shifting — be careful on stairs!'
    ],
    baby: [
      'Your baby is the size of an ear of corn 🌽',
      'Baby\'s face is fully formed',
      'Taste buds are developing',
      'Baby responds to sound and light',
      'Lungs are developing but not yet ready for breathing'
    ],
    tips: [
      'Elevate your feet to reduce swelling 🦶',
      'Eat smaller meals more frequently to ease heartburn 🍽️',
      'Consider taking a childbirth class 📚',
      'Stay cool and comfortable — you may feel warmer than usual 🌬️'
    ]
  },
  28: {
    body: [
      'Welcome to the third trimester!',
      'You may feel short of breath as baby pushes on your diaphragm',
      'Sleep may become more difficult — try a pregnancy pillow',
      'Frequent urination returns as baby presses on your bladder',
      'Your belly button may pop out'
    ],
    baby: [
      'Your baby is the size of an eggplant 🍆',
      'Baby can blink and has eyelashes',
      'Brain is developing rapidly',
      'Baby is gaining weight and fat quickly now',
      'If born now, baby would have a good chance of survival'
    ],
    tips: [
      'Sleep on your left side with a pillow between your knees 😴',
      'Pack your hospital bag — just in case! 👜',
      'Discuss your birth plan with your healthcare provider 📋',
      'Monitor for signs of preeclampsia — headaches, swelling, vision changes ⚠️'
    ]
  },
  32: {
    body: [
      'Baby is taking up a lot of space now!',
      'You may feel very uncomfortable and tired',
      'Braxton Hicks contractions may be more frequent',
      'Colostrum (early breast milk) may start leaking',
      'You may feel baby\'s hiccups!'
    ],
    baby: [
      'Your baby is the size of a squash 🎃',
      'Baby is practising breathing movements',
      'Bones are fully developed but skull remains soft',
      'Baby is likely in a head-down position now',
      'All five senses are working'
    ],
    tips: [
      'Finalise your hospital bag 👜',
      'Pre-register at the hospital if possible 🏥',
      'Rest as much as possible — save your energy 💜',
      'Do kick counts daily to monitor baby\'s activity 👶'
    ]
  },
  36: {
    body: [
      'Baby may \'drop\' into your pelvis — called lightening',
      'You may breathe easier but feel more pressure below',
      'Cervix may start to soften and dilate',
      'Nesting instinct may kick in strongly',
      'You\'re almost there — the finish line is in sight!'
    ],
    baby: [
      'Your baby is the size of a honeydew melon 🍈',
      'Baby is almost fully developed',
      'Gaining about an ounce of fat per day',
      'Most babies are head-down in preparation for birth',
      'Immune system is continuing to strengthen'
    ],
    tips: [
      'Attend weekly prenatal appointments 🏥',
      'Know the signs of labour 📋',
      'Stay close to home just in case 🏠',
      'Rest, rest, rest — you\'ll need your energy for labour! 💜'
    ]
  },
  40: {
    body: [
      'You\'ve reached your due date — baby could arrive any day!',
      'You may experience a mucus plug discharge — a sign of labour approaching',
      'Contractions may start becoming regular',
      'You may feel very heavy and uncomfortable',
      'Your body is ready — trust the process 💜'
    ],
    baby: [
      'Your baby is the size of a watermelon 🍉',
      'Baby is fully developed and ready to meet you!',
      'Immune system is strong',
      'Baby has shed most of the vernix coating',
      'Average weight is around 3.4kg (7.5 lbs)'
    ],
    tips: [
      'Know the difference between real and false labour 📋',
      'Time your contractions when they start ⏱️',
      'Head to hospital when contractions are 5 mins apart 🏥',
      'You\'ve got this — you\'re incredible! 💜'
    ]
  }
}

export const preconceptionInsights = {
  body: [
    'Your body is preparing for a potential pregnancy',
    'Tracking your cycle helps identify your most fertile days',
    'Folic acid intake now reduces the risk of neural tube defects',
    'Maintaining a healthy BMI improves fertility outcomes',
    'Stress can affect ovulation — practise relaxation techniques'
  ],
  fertility: [
    'Ovulation typically occurs 14 days before your next period',
    'The fertile window is 5 days before and 1 day after ovulation',
    'Cervical mucus becomes clear and stretchy during fertile days',
    'Basal body temperature rises slightly after ovulation',
    'Cycle tracking apps can help predict your fertile window'
  ],
  tips: [
    'Take 400mcg of folic acid daily 💊',
    'Reduce caffeine to under 200mg per day ☕',
    'Exercise regularly but avoid over-exercising 🏃‍♀️',
    'Get a preconception checkup with your doctor 🏥',
    'Track your cycle using an app or calendar 📅'
  ]
}

export const postpartumInsights = {
  body: [
    'Your uterus is shrinking back to its normal size — this takes about 6 weeks',
    'Lochia (postpartum bleeding) is normal and may last 4-6 weeks',
    'Hormones are fluctuating significantly — mood swings are normal',
    'Your pelvic floor needs time to recover — gentle exercises help',
    'If breastfeeding, your body is producing oxytocin which aids bonding'
  ],
  recovery: [
    'C-section recovery takes longer — avoid lifting for 6 weeks',
    'Perineal soreness is normal after vaginal delivery',
    'Sleep deprivation affects mood and recovery — rest when baby sleeps',
    'Postpartum depression affects 1 in 7 mothers — seek help if struggling',
    'Your body grew a human — be patient and kind with yourself 💜'
  ],
  tips: [
    'Accept all help offered by family and friends 🤝',
    'Eat iron-rich foods to replenish blood loss 🥗',
    'Stay hydrated especially if breastfeeding 💧',
    'Attend your 6-week postnatal checkup 🏥',
    'Talk to your doctor if you feel persistently sad or anxious 💜'
  ]
}

export const getClosestWeekInsight = (weeks) => {
  const keys = Object.keys(weeklyInsights).map(Number).sort((a, b) => a - b)
  let closest = keys[0]
  for (const k of keys) {
    if (weeks >= k) closest = k
  }
  return weeklyInsights[closest]
}