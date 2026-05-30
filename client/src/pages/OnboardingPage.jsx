import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import './OnboardingPage.css'

// ── Field configs per stage ──────────────────────────────

const pregnancySteps = [
  {
    title: 'Personal Info',
    icon: '👤',
    fields: [
      { id: 'dob',       label: 'Date of Birth',   type: 'date',   placeholder: '' },
      { id: 'phone',     label: 'Phone Number',     type: 'tel',    placeholder: 'e.g. +234 800 000 0000' },
      { id: 'weight',    label: 'Weight (kg)',       type: 'number', placeholder: 'e.g. 65' },
      { id: 'height',    label: 'Height (cm)',       type: 'number', placeholder: 'e.g. 162' },
      { id: 'bloodType', label: 'Blood Type',        type: 'select', options: ['A+','A-','B+','B-','AB+','AB-','O+','O-','Unknown'] },
    ]
  },
  {
    title: 'Pregnancy Details',
    icon: '🤰',
    fields: [
      { id: 'weeksPregnant',   label: 'Current Week of Pregnancy', type: 'number', placeholder: 'e.g. 20' },
      { id: 'dueDate',         label: 'Due Date',                  type: 'date',   placeholder: '' },
      { id: 'prevPregnancies', label: 'Number of Previous Pregnancies', type: 'number', placeholder: 'e.g. 1' },
      { id: 'prevOutcomes',    label: 'Previous Pregnancy Outcomes', type: 'select', options: ['N/A — First pregnancy', 'All healthy births', 'Miscarriage(s)', 'Stillbirth(s)', 'C-section(s)', 'Mixed outcomes'] },
      { id: 'complications',   label: 'Any complications this pregnancy?', type: 'textarea', placeholder: 'e.g. spotting, morning sickness, none...' },
    ]
  },
  {
    title: 'Health History',
    icon: '🩺',
    fields: [
      { id: 'conditions', label: 'Existing Medical Conditions', type: 'checkboxes', options: ['None', 'Diabetes / Gestational Diabetes', 'Hypertension', 'Thyroid Disorder', 'Anaemia', 'Asthma', 'PCOS', 'Heart Condition', 'Other'] },
      { id: 'medications', label: 'Current Medications', type: 'textarea', placeholder: 'List any medications or supplements you take...' },
      { id: 'allergies',   label: 'Known Allergies',     type: 'textarea', placeholder: 'e.g. penicillin, nuts, none...' },
      { id: 'bpHistory',   label: 'History of High Blood Pressure?', type: 'select', options: ['No', 'Yes — before pregnancy', 'Yes — during this pregnancy', 'Yes — both'] },
    ]
  },
  {
    title: 'Lifestyle & Habits',
    icon: '🌿',
    fields: [
      { id: 'smoking',   label: 'Do you smoke?',         type: 'select', options: ['No', 'Yes', 'Quit recently'] },
      { id: 'alcohol',   label: 'Do you consume alcohol?', type: 'select', options: ['No', 'Occasionally', 'Regularly', 'Quit Recently'] },
      { id: 'exercise',  label: 'Exercise Frequency',    type: 'select', options: ['Never', '1–2 times/week', '3–4 times/week', 'Daily'] },
      { id: 'sleep',     label: 'Average Sleep (hours)', type: 'number', placeholder: 'e.g. 7' },
      { id: 'stress',    label: 'Stress Level',          type: 'select', options: ['Low', 'Moderate', 'High'] },
    ]
  }
]

const preconceptionSteps = [
  {
    title: 'Personal Info',
    icon: '👤',
    fields: [
      { id: 'dob',    label: 'Date of Birth', type: 'date',   placeholder: '' },
      { id: 'phone',  label: 'Phone Number',  type: 'tel',    placeholder: 'e.g. +234 800 000 0000' },
      { id: 'weight', label: 'Weight (kg)',   type: 'number', placeholder: 'e.g. 60' },
      { id: 'height', label: 'Height (cm)',   type: 'number', placeholder: 'e.g. 162' },
    ]
  },
  {
    title: 'Health & Cycle',
    icon: '🩺',
    fields: [
      { id: 'lastPeriodDate',  label: 'Last Period Start Date',      type: 'date',   placeholder: '' },
      { id: 'cycleLength',     label: 'Average Cycle Length (days)', type: 'number', placeholder: 'e.g. 28' },
      { id: 'cycleRegularity', label: 'Menstrual Cycle Regularity',  type: 'select', options: ['Regular', 'Irregular', 'Unknown'] },
      { id: 'conditions',      label: 'Known Conditions',            type: 'checkboxes', options: ['None', 'PCOS', 'Endometriosis', 'Thyroid Disorder', 'Diabetes', 'Other'] },
      { id: 'prevPregnancies', label: 'Previous Pregnancies',        type: 'number', placeholder: 'e.g. 0' },
    ]
  },
  {
    title: 'Lifestyle & Habits',
    icon: '🌿',
    fields: [
      { id: 'smoking',  label: 'Do you smoke?',           type: 'select', options: ['No', 'Yes', 'Quit recently'] },
      { id: 'alcohol',  label: 'Do you consume alcohol?', type: 'select', options: ['No', 'Occasionally', 'Regularly'] },
      { id: 'exercise', label: 'Exercise Frequency',      type: 'select', options: ['Never', '1–2 times/week', '3–4 times/week', 'Daily'] },    ]
  }
]

const postpartumSteps = [
  {
    title: 'Personal Info',
    icon: '👤',
    fields: [
      { id: 'dob',    label: 'Date of Birth', type: 'date',   placeholder: '' },
      { id: 'phone',  label: 'Phone Number',  type: 'tel',    placeholder: 'e.g. +234 800 000 0000' },
      { id: 'weight', label: 'Current Weight (kg)', type: 'number', placeholder: 'e.g. 68' },
    ]
  },
  {
    title: 'Delivery Info',
    icon: '👶',
    fields: [
      { id: 'deliveryDate', label: 'Delivery Date',   type: 'date',   placeholder: '' },
      { id: 'deliveryType', label: 'Delivery Type',   type: 'select', options: ['Vaginal', 'C-section', 'Assisted (forceps/vacuum)'] },
      { id: 'babyWeight',   label: "Baby's Birth Weight (kg)", type: 'number', placeholder: 'e.g. 3.2' },
      { id: 'feeding',      label: 'Feeding Method',  type: 'select', options: ['Breastfeeding', 'Formula', 'Both'] },
    ]
  },
  {
    title: 'Recovery & Wellbeing',
    icon: '🌿',
    fields: [
      { id: 'mood',        label: 'General Mood',       type: 'select', options: ['Great', 'Good', 'Okay', 'Low', 'Struggling'] },
      { id: 'medications', label: 'Current Medications', type: 'textarea', placeholder: 'List any medications...' },
    ]
  }
]

const stepsMap = {
  pregnancy:      pregnancySteps,
  preconception:  preconceptionSteps,
  postpartum:     postpartumSteps
}

// ── Component ────────────────────────────────────────────

export default function OnboardingPage() {
  const navigate  = useNavigate()
  const stage     = localStorage.getItem('nurture_stage') || 'pregnancy'
  const name      = localStorage.getItem('nurture_name')  || 'there'
  const steps     = stepsMap[stage] || pregnancySteps

  const [step,    setStep]    = useState(0)
  const [form,    setForm]    = useState({})
  const [error,   setError]   = useState('')

  const current = steps[step]
  const isLast  = step === steps.length - 1

  const update = (id, value) => setForm(prev => ({ ...prev, [id]: value }))

  const toggleCheckbox = (id, option) => {
    const current = form[id] || []
    const updated  = current.includes(option)
      ? current.filter(v => v !== option)
      : [...current, option]
    update(id, updated)
  }

  const nextStep = async () => {
    setError('')
    if (isLast) {
      try {
        await api.post('/profile', form)
        localStorage.setItem('nurture_profile_complete', 'true')
        navigate('/dashboard')
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to save profile. Please try again.')
      }
    } else {
      setStep(prev => prev + 1)
    }
  }
  const skipAll = async () => {
    try {
      await api.post('/profile', { ...form, profileComplete: false })
    } catch  {
      console.log('Profile save skipped')
    }
    localStorage.setItem('nurture_profile_complete', 'false')
    navigate('/dashboard')
  }
  
  return (
    <div className="onboarding-page">
      <div className="onboarding-container">

        {/* Header */}
        <div className="onboarding-header">
          <div className="onboarding-brand">🌸 NurtureHer</div>
          <h1>Let's set up your profile</h1>
          <p>Hi {name}! Tell us a little about yourself so we can personalise your experience.</p>
          <button className="onboarding-skip" onClick={skipAll}>Skip for now →</button>
        </div>

        {/* Progress bar */}
        <div className="onboarding-progress-bar">
          <div
            className="onboarding-progress-fill"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="onboarding-progress-label">
          Step {step + 1} of {steps.length} — {current.title}
        </div>

        {/* Step tabs */}
        <div className="onboarding-tabs">
          {steps.map((s, i) => (
            <div key={i} className={`onboarding-tab ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
              <span>{s.icon}</span>
              <span>{s.title}</span>
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="onboarding-card">
          <h2>{current.icon} {current.title}</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="onboarding-fields">
            {current.fields.map(field => (
              <div key={field.id} className="form-group">
                <label>{field.label}</label>

                {field.type === 'select' && (
                  <select
                    value={form[field.id] || ''}
                    onChange={e => update(field.id, e.target.value)}
                  >
                    <option value="">Select an option</option>
                    {field.options.map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                )}

                {field.type === 'textarea' && (
                  <textarea
                    rows={3}
                    placeholder={field.placeholder}
                    value={form[field.id] || ''}
                    onChange={e => update(field.id, e.target.value)}
                  />
                )}

                {field.type === 'checkboxes' && (
                  <div className="onboarding-checkboxes">
                    {field.options.map(o => (
                      <label key={o} className={`onboarding-checkbox ${(form[field.id] || []).includes(o) ? 'active' : ''}`}>
                        <input
                          type="checkbox"
                          checked={(form[field.id] || []).includes(o)}
                          onChange={() => toggleCheckbox(field.id, o)}
                        />
                        {o}
                      </label>
                    ))}
                  </div>
                )}

                {['text','number','date','tel'].includes(field.type) && (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.id] || ''}
                    onChange={e => update(field.id, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="onboarding-btn-row">
            {step > 0 && (
              <button className="onboarding-btn-back" onClick={() => setStep(s => s - 1)}>
                ← Back
              </button>
            )}
            <button className="onboarding-btn-next" onClick={nextStep}>
              {isLast ? 'Complete Setup 🌸' : 'Next →'}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}