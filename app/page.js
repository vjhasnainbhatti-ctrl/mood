'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import AuthPage from '@/components/auth/AuthPage'
import { motion } from 'framer-motion'

function HomeContent() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900">
        <div className="text-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            🌈
          </motion.div>
          <p className="text-gray-600 dark:text-gray-400">Loading Moodify...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900">
        <div className="text-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            🌈
          </motion.div>
          <p className="text-gray-600 dark:text-gray-400">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return <AuthPage />
}

export default function Home() {
  return <HomeContent />
}
