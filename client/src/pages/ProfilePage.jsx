import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'
import api from '../services/api'
import { mockUser, mockPostpartumUser, trimesterInfo, getBabyAge } from '../data/mockData'
import './ProfilePage.css'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const stage = localStorage.getItem('nurture_stage') || 'pregnancy'
  const name  = localStorage.getItem('nurture_name') || user?.name || 'User'

  

  const milestone = stage === 'pregnancy' ? trimesterInfo(mockUser.weeksPregnant) : null
  const babyAge   = stage === 'postpartum' ? getBabyAge(mockPostpartumUser.deliveryDate) : null

  const stageLabel = stage === 'pregnancy'
    ? `🤰 Pregnancy — Week ${mockUser.weeksPregnant}`
    : stage === 'preconception'
    ? '🌸 Preconception Journey'
    : `👶 Postpartum — Day ${babyAge?.days}`

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const [profile, setProfile] = useState({
    dob:             '',
    phone:           '',
    weight:          '',
    height:          '',
    bloodType:       '',
    weeksPregnant:   '',
    dueDate:         '',
    prevPregnancies: '',
    prevOutcomes:    '',
    conditions:      [],
    medications:     '',
    allergies:       '',
    smoking:         '',
    alcohol:         '',
    exercise:        '',
    diet:            '',
    sleep:           '',
    stress:          '',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile')
        setProfile(response.data.profile)
      } catch (err) {
        console.log('Using mock profile:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])
 

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase()
  
  if (loading) return (
    <div className="dashboard-layout">
      <Navbar />
      <Sidebar />
      <main className="dashboard-main">
        <p style={{ color: '#ec407a', fontFamily: 'DM Sans, sans-serif' }}>
          Loading your profile... 🌸
        </p>
      </main>
    </div>
  )
  return (
    <div className="dashboard-layout">
      <Navbar />
      <Sidebar />

      <main className="dashboard-main">
        <div className="profile-content">

          {/* ── Hero ── */}
          <div className="profile-hero card">
            <div className="profile-avatar">{initials}</div>
            <div className="profile-hero-info">
              <h2>{name}</h2>
              <p className="profile-email">{user?.email || 'amara@example.com'}</p>
              <span className="profile-stage-badge">{stageLabel}</span>
            </div>
          </div>

          {/* ── Action buttons ── */}
          <div className="profile-actions">
            <button
              className="profile-btn-edit"
              onClick={() => navigate('/onboarding')}
            >
              ✏️ Edit Profile Info
            </button>
            <button
              className="profile-btn-logout"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </div>

          {/* ── Personal Info ── */}
          <div className="profile-section card">
            <h3 className="profile-section-title">👤 Personal Info</h3>
            <div className="profile-grid">
              <div className="profile-field">
                <span className="profile-field-label">Date of Birth</span>
                <span className="profile-field-value">
                  {new Date(profile.dob).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">Phone Number</span>
                <span className="profile-field-value">{profile.phone}</span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">Weight</span>
                <span className="profile-field-value">{profile.weight}</span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">Height</span>
                <span className="profile-field-value">{profile.height}</span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">Blood Type</span>
                <span className="profile-field-value">{profile.bloodType}</span>
              </div>
            </div>
          </div>

          {/* ── Stage specific details ── */}
          {stage === 'pregnancy' && (
            <div className="profile-section card">
              <h3 className="profile-section-title">🤰 Pregnancy Details</h3>
              <div className="profile-grid">
                <div className="profile-field">
                  <span className="profile-field-label">Current Week</span>
                  <span className="profile-field-value">Week {profile.weeksPregnant} — {milestone?.trimester}</span>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Due Date</span>
                  <span className="profile-field-value">
                    {new Date(profile.dueDate).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Previous Pregnancies</span>
                  <span className="profile-field-value">{profile.prevPregnancies}</span>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Previous Outcomes</span>
                  <span className="profile-field-value">{profile.prevOutcomes}</span>
                </div>
              </div>
            </div>
          )}

          {stage === 'postpartum' && (
            <div className="profile-section card">
              <h3 className="profile-section-title">👶 Postpartum Details</h3>
              <div className="profile-grid">
                <div className="profile-field">
                  <span className="profile-field-label">Days Since Delivery</span>
                  <span className="profile-field-value">Day {babyAge?.days}</span>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Baby's Age</span>
                  <span className="profile-field-value">{babyAge?.label} old</span>
                </div>
              </div>
            </div>
          )}

          {/* ── Health History ── */}
          <div className="profile-section card">
            <h3 className="profile-section-title">🩺 Health History</h3>
            <div className="profile-grid">
              <div className="profile-field">
                <span className="profile-field-label">Conditions</span>
                <span className="profile-field-value">{profile.conditions.join(', ')}</span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">Medications</span>
                <span className="profile-field-value">{profile.medications}</span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">Allergies</span>
                <span className="profile-field-value">{profile.allergies}</span>
              </div>
            </div>
          </div>

          {/* ── Lifestyle ── */}
          <div className="profile-section card">
            <h3 className="profile-section-title">🌿 Lifestyle & Habits</h3>
            <div className="profile-grid">
              <div className="profile-field">
                <span className="profile-field-label">Smoking</span>
                <span className="profile-field-value">{profile.smoking}</span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">Alcohol</span>
                <span className="profile-field-value">{profile.alcohol}</span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">Exercise</span>
                <span className="profile-field-value">{profile.exercise}</span>
              </div>
              
              <div className="profile-field">
                <span className="profile-field-label">Sleep</span>
                <span className="profile-field-value">{profile.sleep} hours/night</span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">Stress Level</span>
                <span className="profile-field-value">{profile.stress}</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}