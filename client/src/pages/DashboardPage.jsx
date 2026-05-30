import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import {
  mockUser, mockPreconceptionUser, mockPostpartumUser,
  tipsOfTheDay, preconceptionTips, postpartumTips,
  trimesterInfo, getBabySize, getFertileWindow, getBabyAge
} from '../data/mockData'
import api from '../services/api'
import { useState, useEffect } from 'react'
import './DashboardPage.css'

// ── Symptom lists by stage ──────────────────────────────
const symptomsByStage = {
  pregnancy: [
    'Headache', 'Nausea/Vomiting', 'Swelling (hands/feet/face)',
    'Blurred vision', 'Bleeding/Spotting', 'Dizziness',
    'Back pain', 'Chest pain', 'Fatigue', 'Reduced baby movement',
    'Contractions', 'Heartburn', 'None'
  ],
  preconception: [
    'Irregular periods', 'Cramping', 'Bloating', 'Mood swings',
    'Fatigue', 'Headache', 'Nausea', 'Spotting', 'None'
  ],
  postpartum: [
    'Breast pain', 'Excessive bleeding', 'Fever', 'Headache',
    'Fatigue', 'Mood swings', 'Anxiety', 'Baby blues',
    'Wound pain (C-section)', 'Dizziness', 'None'
  ]
}

// ── Week calendar helpers ───────────────────────────────
const getWeekDays = () => {
  const today = new Date()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay())
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    return date
  })
}

const dayNames   = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const riskColors = {
  low:      { bg: '#f0fdf4', color: '#15803d', label: 'Low Risk' },
  medium:   { bg: '#fffbeb', color: '#b45309', label: 'Medium Risk' },
  high:     { bg: '#fff1f2', color: '#b91c1c', label: 'High Risk' },
}

// ── Component ───────────────────────────────────────────
export default function DashboardPage() {
  const navigate = useNavigate()
  const today    = new Date()
  const weekDays = getWeekDays()

  // ── Stage & user data ──
  const stage = localStorage.getItem('nurture_stage') || 'pregnancy'
  const name  = localStorage.getItem('nurture_name')  || 'there'
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile')
        setProfile(response.data.profile)
        if (response.data.profile?.stage) {
          localStorage.setItem('nurture_stage', response.data.profile.stage)
        }
      } catch (err) {
        console.log('Using mock data:', err)
      }
    }
    fetchProfile()
  }, [])

  const activeUser = stage === 'preconception'
    ? mockPreconceptionUser
    : stage === 'postpartum'
    ? mockPostpartumUser
    : mockUser

  const activeTips = stage === 'preconception'
    ? preconceptionTips
    : stage === 'postpartum'
    ? postpartumTips
    : tipsOfTheDay

  const tip  = activeTips[today.getDay() % activeTips.length]
  const risk = riskColors[activeUser.riskLevel]
  const profileComplete = localStorage.getItem('nurture_profile_complete')

  // Stage specific data
  const milestone = stage === 'pregnancy'      ? trimesterInfo(mockUser.weeksPregnant)                                                : null
  const baby      = stage === 'pregnancy'      ? getBabySize(mockUser.weeksPregnant)                                                  : null
  const fertile   = stage === 'preconception'  ? getFertileWindow(mockPreconceptionUser.lastPeriodDate, mockPreconceptionUser.cycleLength) : null
  const babyAge   = stage === 'postpartum'     ? getBabyAge(mockPostpartumUser.deliveryDate)                                          : null

  // ── State ──
  const [showBanner,   setShowBanner]   = useState(profileComplete !== 'true')
  const [showLogModal, setShowLogModal] = useState(false)
  const [mood,         setMood]         = useState('')
  const [symptoms,     setSymptoms]     = useState([])
  const [notes,        setNotes]        = useState('')
  const [periodStatus, setPeriodStatus] = useState('')

  const availableSymptoms = symptomsByStage[stage]

  // ── Handlers ──
  const toggleSymptom = (symptom) => {
    if (symptom === 'None') {
      setSymptoms(['None'])
      return
    }
    setSymptoms(prev => {
      const without = prev.filter(s => s !== 'None')
      return without.includes(symptom)
        ? without.filter(s => s !== symptom)
        : [...without, symptom]
    })
  }

  const handleLogSubmit = async () => {
    try {
      await api.post('/logs', {
        date: new Date().toISOString().split('T')[0],
        mood,
        symptoms,
        notes,
        periodStatus
      })
      alert('Log saved successfully! 🌸')
    } catch (err) {
      console.log('Log save failed:', err)
      alert('Failed to save log. Please try again.')
    }
    setShowLogModal(false)
    setMood('')
    setSymptoms([])
    setNotes('')
    setPeriodStatus('')
  }

  // ── Render ──
  return (
    <div className="dashboard-layout">
      <Navbar />
      <Sidebar />

      <main className="dashboard-main">

        {/* ── Profile incomplete banner ── */}
        {showBanner && (
          <div className="dashboard-banner">
            <span>
              🔔 Your profile is incomplete —{' '}
              <button onClick={() => navigate('/onboarding')}>
                complete it here
              </button>{' '}
              for a personalised experience
            </span>
            <button
              className="dashboard-banner-close"
              onClick={() => setShowBanner(false)}
            >
              ✕
            </button>
          </div>
        )}

        <div className="dashboard-content">

          {/* ── Mini week calendar ── */}
          <div className="dashboard-calendar card" onClick={() => navigate('/calendar')} style={{ cursor: 'pointer' }}>
            <div className="dashboard-calendar-header">
              <span className="dashboard-calendar-month">
                {monthNames[today.getMonth()]} {today.getFullYear()}
              </span>
              <span className="dashboard-calendar-week">This Week</span>
              <span className="dashboard-calendar-link">View full calendar →</span>                       
            </div>
            <div className="dashboard-calendar-days">
              {weekDays.map((date, i) => {
                const isToday = date.toDateString() === today.toDateString()
                return (
                  <div
                    key={i}
                    className={`dashboard-cal-day ${isToday ? 'today' : ''}`}
                  >
                    <span className="dashboard-cal-name">{dayNames[i]}</span>
                    <span className="dashboard-cal-num">{date.getDate()}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── Milestone section ── */}
          <div className="dashboard-milestone">
            <div className="dashboard-milestone-text">

              {stage === 'pregnancy' && (
                <>
                  <span className="dashboard-milestone-emoji">🤰</span>
                  <div>
                    <h2>{milestone.label}</h2>
                    <p>You're doing amazing, {name}!</p>
                  </div>
                </>
              )}

              {stage === 'preconception' && (
                <>
                  <span className="dashboard-milestone-emoji">🌸</span>
                  <div>
                    <h2>
                      {fertile.isInFertileWindow
                        ? 'You may be in your fertile window today! 🌟'
                        : fertile.daysUntilFertile === 0
                        ? 'Your fertile window is very soon! 🌟'
                        : `Your fertile window is in ${fertile.daysUntilFertile} day${fertile.daysUntilFertile !== 1 ? 's' : ''}`
                      }
                    </h2>
                    <p>Keep tracking, {name}! You're doing great 🌸</p>
                  </div>
                </>
              )}

              {stage === 'postpartum' && (
                <>
                  <span className="dashboard-milestone-emoji">👶</span>
                  <div>
                    <h2>Day {babyAge.days} since delivery</h2>
                    <p>Your baby is {babyAge.label} old — you're doing incredible, {name}!</p>
                  </div>
                </>
              )}

            </div>

            <button
              className="dashboard-insights-link"
              onClick={() => navigate('/insights')}
            >
              Find out more insights →
            </button>

            <button
              className="dashboard-log-btn"
              onClick={() => setShowLogModal(true)}
            >
              ✏️ Log Today's Symptoms
            </button>
          </div>

          {/* ── Bottom 3 cards ── */}
          <div className="dashboard-cards">

            {/* Card 1 — stage specific */}
            {stage === 'pregnancy' && (
              <div className="dashboard-card card">
                <p className="dashboard-card-label">Baby This Week</p>
                <div className="dashboard-baby-emoji">{baby.emoji}</div>
                <h3>Size of a {baby.fruit}</h3>
                <p className="dashboard-card-sub">
                  About {baby.size} long · Week {mockUser.weeksPregnant}
                </p>
              </div>
            )}

            {stage === 'preconception' && (
              <div className="dashboard-card card">
                <p className="dashboard-card-label">🌸 Fertile Window</p>
                <div className="dashboard-baby-emoji"></div>
                {fertile.isInFertileWindow ? (
                  <>
                    <h2>You're in your window!</h2>
                    <p className="dashboard-card-sub">
                      Day {fertile.cycleDay} of your cycle
                    </p>
                  </>
                ) : (
                  <>
                    <h3>In {fertile.daysUntilFertile} day{fertile.daysUntilFertile !== 1 ? 's' : ''}</h3>
                    <p className="dashboard-card-sub">
                      Day {fertile.cycleDay} of your cycle · Next period in {fertile.nextPeriodIn} days
                    </p>
                  </>
                )}
              </div>
            )}

            {stage === 'postpartum' && (
              <div className="dashboard-card card">
                <p className="dashboard-card-label">👶 Your Baby</p>
                <div className="dashboard-baby-emoji">🍼</div>
                <h3>{babyAge.label} old</h3>
                <p className="dashboard-card-sub">Day {babyAge.days} postpartum</p>
              </div>
            )}

            {/* Tip of the day — same for all */}
            <div className="dashboard-card card">
              <p className="dashboard-card-label">💡 Tip of the Day</p>
              <p className="dashboard-tip-text">{tip}</p>
            </div>

            {/* Risk level — same for all, clickable */}
            <div
              className="dashboard-card card dashboard-risk-card"
              style={{ background: risk.bg, cursor: 'pointer' }}
              onClick={() => navigate('/risk-assessment')}
            >
              <p className="dashboard-card-label">Risk Level</p>
              <div className="dashboard-risk-badge" style={{ color: risk.color }}>
                ⚠️ {risk.label}
              </div>
              <p className="dashboard-card-sub" style={{ color: risk.color }}>
                Tap to view full report →
              </p>
            </div>

          </div>
        </div>
      </main>

      {/* ── Log symptoms modal ── */}
      {showLogModal && (
        <div className="dashboard-modal-overlay" onClick={() => setShowLogModal(false)}>
          <div className="dashboard-modal" onClick={e => e.stopPropagation()}>

            <h3>How are you feeling today? 🌸</h3>
            <p>Log your mood and any symptoms</p>

            {/* Mood */}
            <div className="form-group" style={{ marginTop: '20px' }}>
              <label>Mood</label>
              <select value={mood} onChange={e => setMood(e.target.value)}>
                <option value="">Select your mood</option>
                <option>😊 Great</option>
                <option>🙂 Good</option>
                <option>😐 Okay</option>
                <option>😔 Low</option>
                <option>😢 Struggling</option>
              </select>
            </div>

            {/* Period tracking — preconception only */}
            {stage === 'preconception' && (
              <div className="form-group">
                <label>Period Tracking</label>
                <div className="symptom-pills">
                  {['Just started 🔴', 'Ongoing', 'Just ended', 'Not on period'].map(status => (
                    <button
                      key={status}
                      type="button"
                      className={`symptom-pill ${periodStatus === status ? 'active' : ''}`}
                      onClick={() => setPeriodStatus(status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Symptoms */}
            <div className="form-group">
              <label>Symptoms (select all that apply)</label>
              <div className="symptom-pills">
                {availableSymptoms.map(symptom => (
                  <button
                    key={symptom}
                    type="button"
                    className={`symptom-pill ${symptoms.includes(symptom) ? 'active' : ''}`}
                    onClick={() => toggleSymptom(symptom)}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="form-group">
              <label>Additional Notes (optional)</label>
              <textarea
                rows={2}
                placeholder="Anything else you'd like to note..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </div>

            <div className="dashboard-modal-btns">
              <button
                className="register-btn-back"
                onClick={() => setShowLogModal(false)}
              >
                Cancel
              </button>
              <button
                className="dashboard-log-submit"
                onClick={handleLogSubmit}
              >
                Save Log 🌸
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}