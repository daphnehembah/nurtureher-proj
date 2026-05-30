import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import { mockRiskData } from '../data/mockData'
import { useState, useEffect } from 'react'
import api from '../services/api'
import './RiskPredictionPage.css'

const riskConfig = {
  low: {
    color: '#15803d',
    bg: '#f0fdf4',
    ring: '#22c55e',
    label: 'LOW RISK',
    emoji: '🟢',
    message: 'Your pregnancy is progressing well. Keep up the great work!'
  },
  medium: {
    color: '#b45309',
    bg: '#fffbeb',
    ring: '#f59e0b',
    label: 'MEDIUM RISK',
    emoji: '🟡',
    message: 'Some risk factors have been detected. Please follow the recommendations below.'
  },
  high: {
    color: '#b91c1c',
    bg: '#fff1f2',
    ring: '#ef4444',
    label: 'HIGH RISK',
    emoji: '🔴',
    message: 'Multiple risk factors detected. Please contact your doctor as soon as possible.'
  },
  critical: {
    color: '#7f1d1d',
    bg: '#fef2f2',
    ring: '#7f1d1d',
    label: 'CRITICAL RISK',
    emoji: '🚨',
    message: 'Critical risk detected. Please seek immediate medical attention.'
  }
}

const historyColors = {
  low:      { bg: '#dcfce7', color: '#15803d' },
  medium:   { bg: '#fef3c7', color: '#b45309' },
  high:     { bg: '#fee2e2', color: '#b91c1c' },
  critical: { bg: '#fecaca', color: '#7f1d1d' },
}

export default function RiskPredictionPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab]   = useState('factors')
  const [riskData,  setRiskData]    = useState(mockRiskData)
  const [loading,   setLoading]     = useState(true)

  useEffect(() => {
    const fetchRisk = async () => {
      try {
        const response = await api.get('/risk')
        setRiskData(response.data)
      } catch (err) {
        console.log('Using mock risk data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchRisk()
  }, [])

  const risk = riskConfig[riskData.riskLevel]
   
  if (loading) return (
    <div className="dashboard-layout">
      <Navbar />
      <Sidebar />
      <main className="dashboard-main">
        <p style={{ color: '#ec407a', fontFamily: 'DM Sans, sans-serif' }}>
          Loading your risk assessment... 🌸
        </p>
      </main>
    </div>
  )
 
  return (
    <div className="dashboard-layout">
      <Navbar />
      <Sidebar />

      <main className="dashboard-main">
        <div className="risk-content">

          {/* ── Page title ── */}
          <div className="risk-header">
            <h1>Risk Assessment</h1>
            <p>Last assessed: {new Date(riskData.lastAssessed).toLocaleDateString('en-GB', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}</p>
          </div>

          {/* ── Risk circle ── */}
          <div className="risk-circle-card" style={{ background: risk.bg }}>
            <div className="risk-circle" style={{ borderColor: risk.ring }}>
              <span className="risk-circle-emoji">{risk.emoji}</span>
              <span className="risk-circle-label" style={{ color: risk.color }}>
                {risk.label}
              </span>
              <span className="risk-circle-score" style={{ color: risk.color }}>
                Score: {riskData.score}/10
              </span>
            </div>
            <p className="risk-circle-message" style={{ color: risk.color }}>
              {risk.message}
            </p>
            <button
              className="risk-reassess-btn"
              onClick={async () => {
                try {
                  setLoading(true)
                  const response = await api.post('/risk/assess')
                  setRiskData(response.data)
                } catch (err) {
                  console.log('Reassess failed:', err)
                } finally {
                  setLoading(false)
                }
              }}
            >
              🔄 Reassess My Risk
            </button>
          </div>

          {/* ── Tabs ── */}
          <div className="risk-tabs">
            {[
                { id: 'factors',         icon: '📋', label: 'Risk Factors' },
                { id: 'recommendations', icon: '✅', label: 'What To Do' },
                { id: 'warnings',        icon: '⚠️', label: 'Watch Out For' },
                { id: 'history',         icon: '📊', label: 'History' },
                ].map(tab => (
                <button
                    key={tab.id}
                    className={`risk-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                >
                    <span className="risk-tab-icon">{tab.icon}</span>
                    <span>{tab.label}</span>
                </button>
           ))}
          </div>

          {/* ── Tab content ── */}
          <div className="risk-tab-content card">

            {/* Risk factors */}
            {activeTab === 'factors' && (
              <div className="risk-list">
                <h3>Why this risk level?</h3>
                <p>These factors from your profile and recent logs contributed to your score:</p>
                <ul>
                  {riskData.riskFactors.map((factor, i) => (
                    <li key={i} className="risk-list-item risk-list-item--danger">
                      <span className="risk-list-icon">⚠️</span>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {activeTab === 'recommendations' && (
              <div className="risk-list">
                <h3>What you should do</h3>
                <p>Follow these recommendations to manage your risk level:</p>
                <ul>
                  {riskData.recommendations.map((rec, i) => (
                    <li key={i} className="risk-list-item risk-list-item--success">
                      <span className="risk-list-icon">✅</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warning symptoms */}
            {activeTab === 'warnings' && (
              <div className="risk-list">
                <h3>Symptoms to watch out for</h3>
                <p>Seek immediate medical attention if you experience any of these:</p>
                <ul>
                  {riskData.warningSymptoms.map((symptom, i) => (
                    <li key={i} className="risk-list-item risk-list-item--warning">
                      <span className="risk-list-icon">🔴</span>
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* History */}
            {activeTab === 'history' && (
              <div className="risk-list">
                <h3>Risk Level History</h3>
                <p>How your risk level has changed over time:</p>
                <div className="risk-history">
                  {riskData.history.map((entry, i) => {
                    const isLast = i === riskData.history.length - 1
                    const config = historyColors[entry.level]
                    return (
                      <div key={i} className="risk-history-item">
                        <div
                          className="risk-history-dot"
                          style={{ background: config.bg, border: `2px solid ${config.color}` }}
                        >
                          <span style={{ color: config.color, fontSize: '0.7rem', fontWeight: 700 }}>
                            {entry.level.toUpperCase()}
                          </span>
                        </div>
                        {!isLast && <div className="risk-history-line" />}
                        <p className="risk-history-date">
                          {new Date(entry.date).toLocaleDateString('en-GB', {
                            day: 'numeric', month: 'short'
                          })}
                          {isLast && ' (today)'}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

          </div>

          {/* ── Emergency note ── */}
          <div className="risk-emergency">
            <span>🚨</span>
            <p>
              If you experience severe symptoms at any time, don't wait —{' '}
              <strong>call your doctor or emergency services immediately.</strong>
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}