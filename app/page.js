'use client'

import { Providers } from './providers'
import AuthPage from '@/components/auth/AuthPage'
import Dashboard from './dashboard/page'
import { useAuth } from '@/context/AuthContext'

function HomeContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🌈</div>
          <p className="text-gray-600 dark:text-gray-400">Loading Moodify...</p>
        </div>
      </div>
    )
  }

  return user ? <Dashboard /> : <AuthPage />
}

export default function Home() {
  return (
    <Providers>
      <HomeContent />
    </Providers>
  )
}
