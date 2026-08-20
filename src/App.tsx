import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from '@/components/ui/sonner'
import Home from '@/pages/Home'
import LoginForm from '@/components/auth/LoginForm'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import Dashboard from '@/pages/Dashboard'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Portfolio */}
          <Route path="/" element={<Home />} />

          {/* Authentication */}
          <Route path="/login" element={<LoginForm />} />

          {/* Protected Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Toaster position="top-right" richColors />
    </AuthProvider>
  )
}
