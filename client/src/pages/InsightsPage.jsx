import { useState, useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import {
  mockUser, mockPreconceptionUser, mockPostpartumUser,
  trimesterInfo, getBabySize, getFertileWindow, getBabyAge,
  getClosestWeekInsight, preconceptionInsights, postpartumInsights
} from '../data/mockData'
import api from '../services/api'
import './InsightsPage.css'


export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(false)
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile')
        setProfile(response.data.profile)
      } catch (err) {
        console.log('Failed to load profile:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  
  

  const stage          = profile?.stage
  const weeksPregnant  = profile?.weeksPregnant
  const lastPeriodDate = profile?.lastPeriodDate
  const cycleLength    = profile?.cycleLength
  const deliveryDate   = profile?.deliveryDate
  // Pregnancy data
  const milestone = stage === 'pregnancy' ? trimesterInfo(weeksPregnant)             : null
  const baby      = stage === 'pregnancy' ? getBabySize(weeksPregnant)               : null
  const insight   = stage === 'pregnancy' ? getClosestWeekInsight(weeksPregnant)     : null

  // Preconception data
  const fertile   = stage === 'preconception'
    ? getFertileWindow(lastPeriodDate, cycleLength)
    : null

  // Postpartum data
  const babyAge   = stage === 'postpartum' ? getBabyAge(deliveryDate) : null

  // ── Tabs per stage ──
  const pregnancyTabs = [
    { icon: '🌸', label: 'Your Body',  facts: insight?.body },
    { icon: '👶', label: 'Your Baby',  facts: insight?.baby },
    { icon: '💡', label: 'Tips',       facts: insight?.tips },
  ]

  const preconceptionTabs = [
    { icon: '🌸', label: 'Your Body',     facts: preconceptionInsights.body },
    { icon: '🌡️', label: 'Your Fertility', facts: preconceptionInsights.fertility },
    { icon: '💡', label: 'Tips',           facts: preconceptionInsights.tips },
  ]

  const postpartumTabs = [
    { icon: '🌸', label: 'Your Body',   facts: postpartumInsights.body },
    { icon: '💜', label: 'Recovery',    facts: postpartumInsights.recovery },
    { icon: '💡', label: 'Tips',        facts: postpartumInsights.tips },
  ]

  const tabs = stage === 'pregnancy'
    ? pregnancyTabs
    : stage === 'preconception'
    ? preconceptionTabs
    : postpartumTabs

  const currentTab = tabs[activeTab]

  if (loading) return (
    <div className="dashboard-layout">
      <Navbar />
      <Sidebar />
      <main className="dashboard-main">
        <p style={{ color: '#ec407a', fontFamily: 'DM Sans, sans-serif', padding: '32px' }}>
          Loading your insights... 🌸
        </p>
      </main>
    </div>
  )

  if (error) return (
    <div className="dashboard-layout">
      <Navbar />
      <Sidebar />
      <main className="dashboard-main">
        <div style={{ padding: '32px', fontFamily: 'DM Sans, sans-serif' }}>
          <p style={{ color: '#b91c1c', marginBottom: '12px' }}>
            ⚠️ Could not load your insights. Please check your connection and try again.
          </p>
          <button
            style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #ec407a, #f06292)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </main>
    </div>
  )

  return (
    <div className="dashboard-layout">
      <Navbar />
      <Sidebar />

      <main className="dashboard-main">
        <div className="insights-content">

          {/* ── Header ── */}
          <div className="insights-header">
            <h1>Tracking Insights</h1>
            <p>Everything you need to know about where you are in your journey</p>
          </div>

          {/* ── Hero card ── */}
          <div className="insights-hero card">

            {stage === 'pregnancy' && (
              <>
                <div className="insights-hero-left">
                  <span className="insights-week-badge">Week {weeksPregnant}</span>
                  <h2>{milestone?.trimester}</h2>
                  <p>Due date: {new Date(profile?.dueDate || mockUser.dueDate).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}</p>
                </div>
                <div className="insights-hero-right">
                  <div className="insights-baby-size">
                    <span className="insights-baby-emoji">{baby.emoji}</span>
                    <div>
                      <p className="insights-baby-label">Baby is the size of a</p>
                      <h3>{baby.fruit}</h3>
                      <p className="insights-baby-size-text">~{baby.size} long</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {stage === 'preconception' && (
              <>
                <div className="insights-hero-left">
                  <span className="insights-week-badge">Day {fertile.cycleDay}</span>
                  <h2>Your Preconception Journey</h2>
                  <p>
                    {fertile.isInFertileWindow
                      ? '🌟 You are in your fertile window!'
                      : `Fertile window in ${fertile.daysUntilFertile} day${fertile.daysUntilFertile !== 1 ? 's' : ''}`
                    }
                  </p>
                </div>
                <div className="insights-hero-right">
                  <div className="insights-baby-size">
                    <span className="insights-baby-emoji">🌸</span>
                    <div>
                      <p className="insights-baby-label">Next period in</p>
                      <h3>{fertile.nextPeriodIn} days</h3>
                      <p className="insights-baby-size-text">Cycle day {fertile.cycleDay}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {stage === 'postpartum' && (
              <>
                <div className="insights-hero-left">
                  <span className="insights-week-badge">Day {babyAge.days}</span>
                  <h2>Your Postpartum Journey</h2>
                  <p>Your baby is {babyAge.label} old 💜</p>
                </div>
                <div className="insights-hero-right">
                  <div className="insights-baby-size">
                    <span className="insights-baby-emoji">🍼</span>
                    <div>
                      <p className="insights-baby-label">Your baby is</p>
                      <h3>{babyAge.label} old</h3>
                      <p className="insights-baby-size-text">Day {babyAge.days} postpartum</p>
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>

          {/* ── Tabs ── */}
          <div className="insights-tabs">
            {tabs.map((tab, i) => (
              <button
                key={i}
                className={`insights-tab ${activeTab === i ? 'active' : ''}`}
                onClick={() => setActiveTab(i)}
              >
                <span className="insights-tab-icon">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* ── Tab content ── */}
          <div className="insights-tab-content card">
            <div className="insights-section-title">
              <span>{currentTab.icon}</span>
              <h2>{currentTab.label}</h2>
            </div>
            <ul className="insights-list">
              {currentTab.facts?.map((item, i) => (
                <li
                  key={i}
                  className={`insights-list-item ${activeTab === tabs.length - 1 ? 'insights-list-item--tip' : ''}`}
                >
                  {activeTab !== tabs.length - 1 && <span className="insights-dot" />}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </main>
    </div>
  )
}