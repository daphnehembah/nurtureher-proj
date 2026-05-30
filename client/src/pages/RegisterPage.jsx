import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './RegisterPage.css'
import api from '../services/api'


const stages = [
  { id: 'preconception', icon: '🌸', title: 'Preconception', desc: 'Planning and preparing for pregnancy' },
  { id: 'pregnancy', icon: '🤰', title: 'Pregnancy', desc: 'Currently pregnant and tracking my journey' },
  { id: 'postpartum', icon: '👶', title: 'Postpartum', desc: 'Recently gave birth and recovering' }
]

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '', stage: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const nextStep = () => {
    setError('')
    if (step === 1) {
      if (!form.name || !form.email) return setError('Please fill in all fields.')
    }
    if (step === 2) {
      if (!form.password || !form.confirmPassword) return setError('Please fill in all fields.')
      if (form.password !== form.confirmPassword) return setError('Passwords do not match.')
      if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    }
    setStep(prev => prev + 1)
  }

  const handleSubmit = async () => {
    if (!form.stage) return setError('Please choose your journey stage.')
    try {
      const response = await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        stage: form.stage
      })
      localStorage.setItem('nurture_stage', form.stage)
      localStorage.setItem('nurture_name', form.name)
      login(response.data.user, response.data.token)
      navigate('/onboarding')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    }
}

  return (
    <div className="register-page">

      {/* Background decorative SVG */}
      <svg className="register-bg-svg" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="400" cy="400" rx="500" ry="420" fill="rgba(255,255,255,0.06)" />
        <ellipse cx="150" cy="200" rx="200" ry="180" fill="rgba(255,255,255,0.06)" />
        <ellipse cx="650" cy="600" rx="220" ry="200" fill="rgba(255,255,255,0.06)" />
        <circle cx="120" cy="160" r="40" fill="rgba(255,255,255,0.1)" />
        <circle cx="140" cy="140" r="28" fill="rgba(255,255,255,0.08)" />
        <circle cx="100" cy="180" r="28" fill="rgba(255,255,255,0.08)" />
        <circle cx="160" cy="170" r="22" fill="rgba(255,255,255,0.07)" />
        <circle cx="80"  cy="150" r="22" fill="rgba(255,255,255,0.07)" />
        <circle cx="680" cy="300" r="50" fill="rgba(255,255,255,0.09)" />
        <circle cx="705" cy="275" r="34" fill="rgba(255,255,255,0.08)" />
        <circle cx="655" cy="325" r="34" fill="rgba(255,255,255,0.08)" />
        <circle cx="705" cy="325" r="26" fill="rgba(255,255,255,0.06)" />
        <circle cx="655" cy="275" r="26" fill="rgba(255,255,255,0.06)" />
        <circle cx="180" cy="620" r="44" fill="rgba(255,255,255,0.09)" />
        <circle cx="204" cy="596" r="30" fill="rgba(255,255,255,0.08)" />
        <circle cx="156" cy="644" r="30" fill="rgba(255,255,255,0.08)" />
        <circle cx="204" cy="644" r="24" fill="rgba(255,255,255,0.06)" />
        <circle cx="156" cy="596" r="24" fill="rgba(255,255,255,0.06)" />
        <circle cx="660" cy="680" r="36" fill="rgba(255,255,255,0.09)" />
        <circle cx="680" cy="660" r="24" fill="rgba(255,255,255,0.08)" />
        <circle cx="640" cy="700" r="24" fill="rgba(255,255,255,0.08)" />
        <circle cx="60"  cy="450" r="30" fill="rgba(255,255,255,0.08)" />
        <circle cx="78"  cy="432" r="20" fill="rgba(255,255,255,0.07)" />
        <circle cx="42"  cy="468" r="20" fill="rgba(255,255,255,0.07)" />
        <circle cx="740" cy="150" r="34" fill="rgba(255,255,255,0.08)" />
        <circle cx="760" cy="130" r="22" fill="rgba(255,255,255,0.07)" />
        <circle cx="720" cy="170" r="22" fill="rgba(255,255,255,0.07)" />
      </svg>

      {/* Page content */}
      <div className="register-content">

        {/* Brand */}
        <div className="register-brand">
          <span className="register-brand-icon">🌸</span>
          <span>NurtureHer</span>
        </div>

        {/* Tagline */}
        <div className="register-tagline">
          <h2>Begin your journey</h2>
          <p>A safe space for every stage of your motherhood story</p>
          
        </div>

        {/* Floating card */}
        <div className="register-card">

          {/* Progress */}
          <div className="register-progress">
            {[1, 2, 3].map(s => (
              <div key={s} className="register-progress-step">
                <div className={`register-progress-circle ${step >= s ? 'active' : ''} ${step > s ? 'done' : ''}`}>
                  {step > s ? '✓' : s}
                </div>
                {s < 3 && <div className={`register-progress-line ${step > s ? 'active' : ''}`} />}
              </div>
            ))}
          </div>

          {/* Step labels */}
          <div className="register-step-labels">
            <span className={step === 1 ? 'active' : ''}>Your Info</span>
            <span className={step === 2 ? 'active' : ''}>Password</span>
            <span className={step === 3 ? 'active' : ''}>Your Journey</span>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          {/* Step 1 */}
          {step === 1 && (
            <div className="register-step">
              <h3>Nice to meet you 🌸</h3>
              <p>Let's start with the basics</p>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="e.g. Amara Johnson"
                  value={form.name} onChange={e => update('name', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="you@example.com"
                  value={form.email} onChange={e => update('email', e.target.value)} />
              </div>
              <button className="register-btn" onClick={nextStep}>Continue →</button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="register-step">
              <h3>Create a password 🔒</h3>
              <p>Make it something memorable</p>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="At least 6 characters"
                  value={form.password} onChange={e => update('password', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="Repeat your password"
                  value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} />
              </div>
              <div className="register-btn-row">
                <button className="register-btn-back" onClick={() => setStep(1)}>← Back</button>
                <button className="register-btn" onClick={nextStep}>Continue →</button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="register-step">
              <h3>Choose your journey 💜</h3>
              <p>We'll personalise your experience</p>
              <div className="register-stages">
                {stages.map(s => (
                  <div key={s.id}
                    className={`register-stage-card ${form.stage === s.id ? 'active' : ''}`}
                    onClick={() => update('stage', s.id)}>
                    <span className="register-stage-icon">{s.icon}</span>
                    <div>
                      <p className="register-stage-title">{s.title}</p>
                      <p className="register-stage-desc">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="register-btn-row" style={{ marginTop: '20px' }}>
                <button className="register-btn-back" onClick={() => setStep(2)}>← Back</button>
                <button className="register-btn" onClick={handleSubmit}>Get Started 🌸</button>
              </div>
            </div>
          )}

        </div>

        <p className="register-login-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>

      </div>
    </div>
  )
}