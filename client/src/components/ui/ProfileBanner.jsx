import { useNavigate } from 'react-router-dom'
import './ProfileBanner.css'

export default function ProfileBanner() {
  const navigate = useNavigate()

  return (
    <div className="profile-banner">
      <div className="profile-banner-left">
        <span className="profile-banner-icon">🌸</span>
        <div>
          <p className="profile-banner-title">Your profile is incomplete</p>
          <p className="profile-banner-sub">Complete your profile to see personalised insights, risk assessment and more</p>
        </div>
      </div>
      <button
        className="profile-banner-btn"
        onClick={() => navigate('/onboarding')}
      >
        Complete Profile →
      </button>
    </div>
  )
}