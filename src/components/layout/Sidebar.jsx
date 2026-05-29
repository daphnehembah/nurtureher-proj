import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const links = [
  { to: '/dashboard',       icon: '🏠', label: 'Dashboard' },
  { to: '/calendar',        icon: '📅', label: 'Calendar' },
  { to: '/risk-assessment', icon: '⚠️', label: 'Risk Prediction' },
  { to: '/insights',        icon: '📊', label: 'Insights' },
  { to: '/profile',         icon: '👤', label: 'Profile' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <button
        className="sidebar-toggle"
        onClick={() => setCollapsed(prev => !prev)}
        title={collapsed ? 'Expand' : 'Collapse'}
      >
        {collapsed ? '▶' : '◀'}
      </button>

      <nav className="sidebar-nav">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="sidebar-icon">{link.icon}</span>
            {!collapsed && <span className="sidebar-label">{link.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}