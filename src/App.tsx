import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Toaster } from '@/components/ui/sonner'
import PageLoader from '@/components/ui/page-loader'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

// Lazy-loaded routes for optimal bundle splitting
const Home = lazy(() => import('@/pages/Home'))
const LoginForm = lazy(() => import('@/components/auth/LoginForm'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Suspense fallback={<PageLoader />}>
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
          </Suspense>
        </Router>
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </ThemeProvider>
  )
}
