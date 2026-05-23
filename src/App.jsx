import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/layout/ProtectedRoute'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import OnboardingPage from './pages/OnboardingPage'
import RiskPredictionPage from './pages/RiskPredictionPage'
import InsightsPage from './pages/InsightsPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/risk-assessment" element={<RiskPredictionPage />} />
            <Route path="/insights" element={<InsightsPage />} />
          </Route>

          <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App