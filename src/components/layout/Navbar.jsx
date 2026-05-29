import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const displayName = user?.name || localStorage.getItem('nurture_name') || 'User'
  const initials = displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-brand-icon">🌸</span>
        <span className="navbar-brand-text">NurtureHer</span>
      </div>

      <div className="navbar-right">
        <div className="navbar-user">
          <div className="navbar-avatar">{initials}</div>
          <span className="navbar-username" onClick={() => navigate('/profile')}>{displayName}</span>
        </div>
        <button className="navbar-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}