import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './LoginPage.css'

const slides = [
  {
    image: 'public/images/1120ce0d5f218737ab3b0d04d6ef1b31.jpg',
    caption: 'Your journey to motherhood starts here'
  },
  {
    image: 'public/images/ba128a48ed0250643b7707079ba129c6.jpg',
    caption: 'Track every milestone with care'
  },
  {
    image: 'public/images/34e6d3b30ef4f6061f227ee87dc92b92.jpg',
    caption: 'Expert insights at your fingertips'
  }
]

export default function LoginPage() {
  const [current, setCurrent] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    if (email && password) {
      login({ name: 'User', email }, 'mock-jwt-token')
      navigate('/dashboard')
    } else {
      setError('Please enter your email and password.')
    }
    setLoading(false)
  }

  return (
    <div className="login-page">
      <div className="login-card">

        {/* Left — Slideshow */}
        <div className="login-slideshow">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`login-slide ${i === current ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <p className="login-slide-caption">{slide.caption}</p>
            </div>
          ))}

          <div className="login-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`login-dot ${i === current ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>

          <div className="login-brand">
            <span>🌸</span>
            <span>NurtureHer</span>
          </div>
        </div>

        {/* Right — Form */}
        <div className="login-form-side">
          <div className="login-form-box">

            <div className="login-welcome">
              <h1>Welcome to NurtureHer 🌸</h1>
              <p>Sign in to continue your journey</p>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="login-forgot">
                <Link to="/forgot-password">Forgot password?</Link>
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="login-register-link">
              Don't have an account?{' '}
              <Link to="/register">Sign up here</Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  )
}