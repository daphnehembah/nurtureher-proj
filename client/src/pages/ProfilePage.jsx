import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import { useAuth } from '../context/AuthContext'
import { trimesterInfo, getBabyAge } from '../data/mockData'
import api from '../services/api'
import './ProfilePage.css'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const stage = localStorage.getItem('nurture_stage') || 'pregnancy'

  const [profile,        setProfile]        = useState(null)
  const [loading,        setLoading]        = useState(true)
  const [showStageModal, setShowStageModal] = useState(false)

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

  const name     = localStorage.getItem('nurture_name') || user?.name || 'User'
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase()

  const milestone = stage === 'pregnancy' && profile?.weeksPregnant
    ? trimesterInfo(profile.weeksPregnant)
    : null
  const babyAge = stage === 'postpartum' && profile?.deliveryDate
    ? getBabyAge(profile.deliveryDate)
    : null

  const stageLabel = stage === 'pregnancy'
    ? `🤰 Pregnancy — Week ${profile?.weeksPregnant || '...'}`
    : stage === 'preconception'
    ? '🌸 Preconception Journey'
    : `👶 Postpartum — Day ${babyAge?.days || '...'}`

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading) return (
    <div className="dashboard-layout">
      <Navbar />
      <Sidebar />
      <main className="dashboard-main">
        <p style={{ color: '#ec407a', fontFamily: 'DM Sans, sans-serif', padding: '32px' }}>
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
              <p className="profile-email">{user?.email || ''}</p>
              <span className="profile-stage-badge">{stageLabel}</span>
            </div>
          </div>

          {/* ── Action buttons ── */}
          <div className="profile-actions">
            <button className="profile-btn-edit" onClick={() => navigate('/onboarding')}>
              ✏️ Edit Profile Info
            </button>
            <button className="profile-btn-edit" onClick={() => setShowStageModal(true)}>
              🔄 Change Stage
            </button>
            <button className="profile-btn-logout" onClick={handleLogout}>
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
                  {profile?.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  }) : '—'}
                </span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">Phone Number</span>
                <span className="profile-field-value">{profile?.phoneNumber || '—'}</span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">Weight</span>
                <span className="profile-field-value">{profile?.weight ? `${profile.weight}kg` : '—'}</span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">Height</span>
                <span className="profile-field-value">{profile?.height ? `${profile.height}cm` : '—'}</span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">Blood Type</span>
                <span className="profile-field-value">{profile?.bloodType || '—'}</span>
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
                  <span className="profile-field-value">
                    {profile?.weeksPregnant ? `Week ${profile.weeksPregnant} — ${milestone?.trimester}` : '—'}
                  </span>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Due Date</span>
                  <span className="profile-field-value">
                    {profile?.dueDate ? new Date(profile.dueDate).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    }) : '—'}
                  </span>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Previous Pregnancies</span>
                  <span className="profile-field-value">{profile?.previousPregnancies ?? '—'}</span>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Previous Outcomes</span>
                  <span className="profile-field-value">{profile?.previousOutcomes || '—'}</span>
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
                  <span className="profile-field-value">{babyAge ? `Day ${babyAge.days}` : '—'}</span>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Baby's Age</span>
                  <span className="profile-field-value">{babyAge ? `${babyAge.label} old` : '—'}</span>
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
                <span className="profile-field-value">
                  {profile?.conditions?.length ? profile.conditions.join(', ') : '—'}
                </span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">Medications</span>
                <span className="profile-field-value">{profile?.medications || '—'}</span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">Allergies</span>
                <span className="profile-field-value">{profile?.allergies || '—'}</span>
              </div>
            </div>
          </div>

          {/* ── Lifestyle ── */}
          <div className="profile-section card">
            <h3 className="profile-section-title">🌿 Lifestyle & Habits</h3>
            <div className="profile-grid">
              <div className="profile-field">
                <span className="profile-field-label">Smoking</span>
                <span className="profile-field-value">{profile?.smoking || '—'}</span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">Alcohol</span>
                <span className="profile-field-value">{profile?.alcohol || '—'}</span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">Exercise</span>
                <span className="profile-field-value">{profile?.exercise || '—'}</span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">Diet</span>
                <span className="profile-field-value">{profile?.diet || '—'}</span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">Sleep</span>
                <span className="profile-field-value">
                  {profile?.sleepHours ? `${profile.sleepHours} hours/night` : '—'}
                </span>
              </div>
              <div className="profile-field">
                <span className="profile-field-label">Stress Level</span>
                <span className="profile-field-value">{profile?.stressLevel || '—'}</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ── Change Stage Modal ── */}
      {showStageModal && (
        <div className="dashboard-modal-overlay" onClick={() => setShowStageModal(false)}>
          <div className="dashboard-modal" onClick={e => e.stopPropagation()}>
            <h3>Change Your Journey Stage 🌸</h3>
            <p style={{ color: '#bbb', fontSize: '0.85rem', marginBottom: '20px' }}>
              You'll be taken to onboarding to fill in your new stage info
            </p>
            <div className="register-stages">
              {[
                { id: 'preconception', icon: '🌸', title: 'Preconception', desc: 'Planning and preparing for pregnancy' },
                { id: 'pregnancy',     icon: '🤰', title: 'Pregnancy',     desc: 'Currently pregnant and tracking my journey' },
                { id: 'postpartum',    icon: '👶', title: 'Postpartum',    desc: 'Recently gave birth and recovering' }
              ].map(s => (
                <div
                  key={s.id}
                  className={`register-stage-card ${stage === s.id ? 'active' : ''}`}
                  onClick={() => {
                    localStorage.setItem('nurture_stage', s.id)
                    setShowStageModal(false)
                    navigate('/onboarding')
                  }}
                >
                  <span className="register-stage-icon">{s.icon}</span>
                  <div>
                    <p className="register-stage-title">{s.title}</p>
                    <p className="register-stage-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button className="register-btn-back" onClick={() => setShowStageModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}