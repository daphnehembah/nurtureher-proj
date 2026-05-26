import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import {
  mockUser, mockPreconceptionUser, mockPostpartumUser,
  trimesterInfo, getBabySize, getFertileWindow, getBabyAge,
  getClosestWeekInsight, preconceptionInsights, postpartumInsights
} from '../data/mockData'
import './InsightsPage.css'

export default function InsightsPage() {
  const stage = localStorage.getItem('nurture_stage') || 'pregnancy'

  // Pregnancy data
  const milestone = stage === 'pregnancy' ? trimesterInfo(mockUser.weeksPregnant) : null
  const baby      = stage === 'pregnancy' ? getBabySize(mockUser.weeksPregnant)   : null
  const insight   = stage === 'pregnancy' ? getClosestWeekInsight(mockUser.weeksPregnant) : null

  // Preconception data
  const fertile   = stage === 'preconception'
    ? getFertileWindow(mockPreconceptionUser.lastPeriodDate, mockPreconceptionUser.cycleLength)
    : null

  // Postpartum data
  const babyAge   = stage === 'postpartum' ? getBabyAge(mockPostpartumUser.deliveryDate) : null

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

          {/* ══════════ PREGNANCY ══════════ */}
          {stage === 'pregnancy' && (
            <>
              {/* Where you are */}
              <div className="insights-hero card">
                <div className="insights-hero-left">
                  <span className="insights-week-badge">Week {mockUser.weeksPregnant}</span>
                  <h2>{milestone.trimester}</h2>
                  <p>Due date: {new Date(mockUser.dueDate).toLocaleDateString('en-GB', {
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
              </div>

              {/* Your body */}
              <div className="insights-section card">
                <div className="insights-section-title">
                  <span>🌸</span>
                  <h2>Your Body This Week</h2>
                </div>
                <ul className="insights-list">
                  {insight.body.map((item, i) => (
                    <li key={i} className="insights-list-item">
                      <span className="insights-dot" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Baby development */}
              <div className="insights-section card">
                <div className="insights-section-title">
                  <span>👶</span>
                  <h2>Your Baby This Week</h2>
                </div>
                <ul className="insights-list">
                  {insight.baby.map((item, i) => (
                    <li key={i} className="insights-list-item">
                      <span className="insights-dot" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tips */}
              <div className="insights-section card">
                <div className="insights-section-title">
                  <span>💡</span>
                  <h2>Tips For This Week</h2>
                </div>
                <ul className="insights-list">
                  {insight.tips.map((item, i) => (
                    <li key={i} className="insights-list-item insights-list-item--tip">
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* ══════════ PRECONCEPTION ══════════ */}
          {stage === 'preconception' && (
            <>
              {/* Where you are */}
              <div className="insights-hero card">
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
              </div>

              {/* Your body */}
              <div className="insights-section card">
                <div className="insights-section-title">
                  <span>🌸</span>
                  <h2>Your Body Right Now</h2>
                </div>
                <ul className="insights-list">
                  {preconceptionInsights.body.map((item, i) => (
                    <li key={i} className="insights-list-item">
                      <span className="insights-dot" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fertility info */}
              <div className="insights-section card">
                <div className="insights-section-title">
                  <span>🌡️</span>
                  <h2>Understanding Your Fertility</h2>
                </div>
                <ul className="insights-list">
                  {preconceptionInsights.fertility.map((item, i) => (
                    <li key={i} className="insights-list-item">
                      <span className="insights-dot" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tips */}
              <div className="insights-section card">
                <div className="insights-section-title">
                  <span>💡</span>
                  <h2>Tips For This Stage</h2>
                </div>
                <ul className="insights-list">
                  {preconceptionInsights.tips.map((item, i) => (
                    <li key={i} className="insights-list-item insights-list-item--tip">
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* ══════════ POSTPARTUM ══════════ */}
          {stage === 'postpartum' && (
            <>
              {/* Where you are */}
              <div className="insights-hero card">
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
              </div>

              {/* Your body */}
              <div className="insights-section card">
                <div className="insights-section-title">
                  <span>🌸</span>
                  <h2>Your Body Right Now</h2>
                </div>
                <ul className="insights-list">
                  {postpartumInsights.body.map((item, i) => (
                    <li key={i} className="insights-list-item">
                      <span className="insights-dot" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recovery */}
              <div className="insights-section card">
                <div className="insights-section-title">
                  <span>💜</span>
                  <h2>Your Recovery</h2>
                </div>
                <ul className="insights-list">
                  {postpartumInsights.recovery.map((item, i) => (
                    <li key={i} className="insights-list-item">
                      <span className="insights-dot" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tips */}
              <div className="insights-section card">
                <div className="insights-section-title">
                  <span>💡</span>
                  <h2>Tips For This Stage</h2>
                </div>
                <ul className="insights-list">
                  {postpartumInsights.tips.map((item, i) => (
                    <li key={i} className="insights-list-item insights-list-item--tip">
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  )
}