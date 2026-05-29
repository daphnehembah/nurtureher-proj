import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import { mockPreconceptionUser, mockPostpartumUser, mockUser, getFertileWindow, getBabyAge } from '../data/mockData'
import './CalendarPage.css'

const dayNames   = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December']

const mockLogs = {
  '2026-05-01': { mood: '😊 Great',    symptoms: ['Fatigue'],              notes: 'Feeling good today!' },
  '2026-05-03': { mood: '😐 Okay',     symptoms: ['Headache', 'Nausea'],   notes: '' },
  '2026-05-07': { mood: '🙂 Good',     symptoms: ['None'],                 notes: 'Had a great walk' },
  '2026-05-10': { mood: '😔 Low',      symptoms: ['Back pain', 'Fatigue'], notes: 'Rough day' },
  '2026-05-15': { mood: '😊 Great',    symptoms: ['None'],                 notes: '' },
  '2026-05-19': { mood: '🙂 Good',     symptoms: ['Heartburn'],            notes: '' },
}

const mockPeriodDays = [
  '2026-05-01','2026-05-02','2026-05-03','2026-05-04','2026-05-05'
]

const getDaysInMonth    = (y, m) => new Date(y, m + 1, 0).getDate()
const getFirstDayOfMonth = (y, m) => new Date(y, m, 1).getDay()
const formatDate         = (y, m, d) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

const symptomOptions = {
  pregnancy:     ['Headache', 'Nausea', 'Swelling', 'Fatigue', 'Back pain', 'Heartburn', 'Dizziness', 'None'],
  preconception: ['Cramping', 'Bloating', 'Mood swings', 'Fatigue', 'Headache', 'Spotting', 'None'],
  postpartum:    ['Fatigue', 'Mood swings', 'Anxiety', 'Headache', 'Breast pain', 'Dizziness', 'None'],
}

export default function CalendarPage() {
  const stage = localStorage.getItem('nurture_stage') || 'pregnancy'
  const today = new Date()

  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear,  setCurrentYear]  = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [logMood,      setLogMood]      = useState('')
  const [logSymptoms,  setLogSymptoms]  = useState([])
  const [logNotes,     setLogNotes]     = useState('')
  const [logs,         setLogs]         = useState(mockLogs)

  // Fertile window dates
  const getFertileDates = () => {
    if (stage !== 'preconception') return []
    const lastPeriod = new Date(mockPreconceptionUser.lastPeriodDate)
    const cycleLen   = mockPreconceptionUser.cycleLength
    const dates      = []
    for (let c = -1; c <= 1; c++) {
      const cycleStart = new Date(lastPeriod)
      cycleStart.setDate(cycleStart.getDate() + c * cycleLen)
      const ovulation  = new Date(cycleStart)
      ovulation.setDate(cycleStart.getDate() + cycleLen - 14)
      for (let d = -5; d <= 1; d++) {
        const fd = new Date(ovulation)
        fd.setDate(ovulation.getDate() + d)
        dates.push(formatDate(fd.getFullYear(), fd.getMonth(), fd.getDate()))
      }
    }
    return dates
  }

  
  const fertileDates  = getFertileDates()
  const fertile  = stage === 'preconception'
    ? getFertileWindow(mockPreconceptionUser.lastPeriodDate, mockPreconceptionUser.cycleLength)
    : null
  const babyAge  = stage === 'postpartum' ? getBabyAge(mockPostpartumUser.deliveryDate) : null
  const daysInMonth   = getDaysInMonth(currentYear, currentMonth)
  const firstDay      = getFirstDayOfMonth(currentYear, currentMonth)

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) }
    else setCurrentMonth(m => m - 1)
  }

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) }
    else setCurrentMonth(m => m + 1)
  }

  const handleDateClick = (day) => {
    const dateStr = formatDate(currentYear, currentMonth, day)
    setSelectedDate(dateStr)
    setShowViewModal(true)
  }

  const handleEditOpen = () => {
    const existing = logs[selectedDate]
    setLogMood(existing?.mood || '')
    setLogSymptoms(existing?.symptoms || [])
    setLogNotes(existing?.notes || '')
    setShowViewModal(false)
    setShowEditModal(true)
  }

  const handleSaveLog = () => {
    setLogs(prev => ({
      ...prev,
      [selectedDate]: { mood: logMood, symptoms: logSymptoms, notes: logNotes }
    }))
    setShowEditModal(false)
    setShowViewModal(true)
  }

  const toggleSymptom = (s) => {
    if (s === 'None') { setLogSymptoms(['None']); return }
    setLogSymptoms(prev => {
      const without = prev.filter(x => x !== 'None')
      return without.includes(s) ? without.filter(x => x !== s) : [...without, s]
    })
  }

  const selectedLog = selectedDate ? logs[selectedDate] : null
  const isFuture    = selectedDate ? new Date(selectedDate) > today : false
  const formattedSelectedDate = selectedDate
    ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      })
    : ''

  return (
    <div className="dashboard-layout">
      <Navbar />
      <Sidebar />

      <main className="dashboard-main">
        <div className="calendar-content">

          {/* Header */}
          <div className="insights-header">
            <h1>Calendar</h1>
            <p>Track your journey day by day</p>
          </div>
          {/* Info line */}
          <div className="calendar-info-line">
            {stage === 'pregnancy' && `🤰 You are on Week ${mockUser.weeksPregnant} of your pregnancy`}
            {stage === 'preconception' && fertile && `🌸 Cycle Day ${fertile.cycleDay} — Next period in ${fertile.nextPeriodIn} days`}
            {stage === 'postpartum' && babyAge && `👶 Day ${babyAge.days} postpartum — Your baby is ${babyAge.label} old`}
          </div>

          {/* Legend */}
          <div className="calendar-legend">
            <div className="calendar-legend-item">
              <span className="legend-dot" style={{ background: 'rgba(236,64,122,0.2)', border: '1.5px solid #ec407a' }} />
              <span>Today</span>
            </div>
            <div className="calendar-legend-item">
              <span className="legend-dot legend-logged" />
              <span>Day logged</span>
            </div>
            {stage === 'preconception' && (
              <>
                <div className="calendar-legend-item">
                  <span className="legend-dot" style={{ background: 'rgba(239,68,68,0.15)', border: '1.5px solid #ef4444' }} />
                  <span>Period days</span>
                </div>
                <div className="calendar-legend-item">
                  <span className="legend-dot" style={{ background: 'rgba(96,165,250,0.2)', border: '1.5px solid #60a5fa' }} />
                  <span>Fertile window</span>
                </div>
              </>
            )}
          </div>

          {/* Calendar card */}
          <div className="calendar-card card">

            {/* Month nav */}
            <div className="calendar-nav">
              <button className="calendar-nav-btn" onClick={prevMonth}>←</button>
              <h2>{monthNames[currentMonth]} {currentYear}</h2>
              <button className="calendar-nav-btn" onClick={nextMonth}>→</button>
            </div>

            {/* Grid */}
            <div className="calendar-grid">
              {dayNames.map(d => (
                <div key={d} className="calendar-day-name">{d}</div>
              ))}

              {Array.from({ length: firstDay }, (_, i) => (
                <div key={`empty-${i}`} className="calendar-day-empty" />
              ))}

              {Array.from({ length: daysInMonth }, (_, i) => {
                const day     = i + 1
                const dateStr = formatDate(currentYear, currentMonth, day)
                const isToday = currentMonth === today.getMonth() &&
                                currentYear  === today.getFullYear() &&
                                day          === today.getDate()
                const isLogged  = !!logs[dateStr]
                const isPeriod  = stage === 'preconception' && mockPeriodDays.includes(dateStr)
                const isFertile = stage === 'preconception' && fertileDates.includes(dateStr) && !isPeriod

                return (
                  <div
                    key={day}
                    className={[
                      'calendar-day',
                      isToday   ? 'calendar-day--today'   : '',
                      isPeriod  ? 'calendar-day--period'  : '',
                      isFertile ? 'calendar-day--fertile' : '',
                    ].join(' ')}
                    onClick={() => handleDateClick(day)}
                  >
                    <span className="calendar-day-num">{day}</span>
                    {isLogged && <span className="calendar-day-dot" />}
                  </div>
                )
              })}
            </div>
           
          </div>
        </div>
      </main>

      {/* ── View Modal ── */}
      {showViewModal && selectedDate && (
        <div className="dashboard-modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="dashboard-modal" onClick={e => e.stopPropagation()}>

            <h3>{formattedSelectedDate}</h3>

            {/* Preconception badges */}
            {stage === 'preconception' && (
              <div className="calendar-badges">
                {mockPeriodDays.includes(selectedDate) && (
                  <span className="calendar-badge calendar-badge--period">🔴 Period day</span>
                )}
                {fertileDates.includes(selectedDate) && (
                  <span className="calendar-badge calendar-badge--fertile">🔵 Fertile window</span>
                )}
              </div>
            )}

            {/* Log content */}
            {selectedLog ? (
              <div className="calendar-view-log">
                <div className="calendar-view-row">
                  <span className="calendar-view-label">Mood</span>
                  <span className="calendar-view-value">{selectedLog.mood}</span>
                </div>
                <div className="calendar-view-row">
                  <span className="calendar-view-label">Symptoms</span>
                  <div className="calendar-log-symptoms">
                    {selectedLog.symptoms.map((s, i) => (
                      <span key={i} className="calendar-symptom-tag">{s}</span>
                    ))}
                  </div>
                </div>
                {selectedLog.notes && (
                  <div className="calendar-view-row">
                    <span className="calendar-view-label">Notes</span>
                    <span className="calendar-view-notes">"{selectedLog.notes}"</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="calendar-no-log">
                {isFuture ? "You can't log future dates 🌸" : 'Nothing logged for this day yet.'}
              </p>
            )}

            <div className="dashboard-modal-btns">
              <button className="register-btn-back" onClick={() => setShowViewModal(false)}>
                Close
              </button>
              {!isFuture && (
                <button className="dashboard-log-submit" onClick={handleEditOpen}>
                  {selectedLog ? '✏️ Edit Log' : '✏️ Log This Day'}
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ── Edit Modal ── */}
      {showEditModal && selectedDate && (
        <div className="dashboard-modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="dashboard-modal" onClick={e => e.stopPropagation()}>

            <h3>Log for {formattedSelectedDate} 🌸</h3>
            <p style={{ color: '#bbb', fontSize: '0.85rem', marginBottom: '20px' }}>
              How were you feeling?
            </p>

            <div className="form-group">
              <label>Mood</label>
              <select value={logMood} onChange={e => setLogMood(e.target.value)}>
                <option value="">Select mood</option>
                <option>😊 Great</option>
                <option>🙂 Good</option>
                <option>😐 Okay</option>
                <option>😔 Low</option>
                <option>😢 Struggling</option>
              </select>
            </div>

            {stage === 'preconception' && (
              <div className="form-group">
                <label>Period Status</label>
                <div className="symptom-pills">
                  {['Just started 🔴', 'Ongoing', 'Just ended', 'Not on period'].map(s => (
                    <button
                      key={s}
                      type="button"
                      className={`symptom-pill ${logSymptoms.includes(s) ? 'active' : ''}`}
                      onClick={() => toggleSymptom(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Symptoms</label>
              <div className="symptom-pills">
                {symptomOptions[stage].map(s => (
                  <button
                    key={s}
                    type="button"
                    className={`symptom-pill ${logSymptoms.includes(s) ? 'active' : ''}`}
                    onClick={() => toggleSymptom(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Notes (optional)</label>
              <textarea
                rows={2}
                placeholder="Anything else to note..."
                value={logNotes}
                onChange={e => setLogNotes(e.target.value)}
              />
            </div>

            <div className="dashboard-modal-btns">
              <button className="register-btn-back" onClick={() => {
                setShowEditModal(false)
                setShowViewModal(true)
              }}>
                ← Back
              </button>
              <button className="dashboard-log-submit" onClick={handleSaveLog}>
                Save Log 🌸
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}