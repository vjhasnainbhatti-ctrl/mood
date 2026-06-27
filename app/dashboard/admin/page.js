'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AdminPanel from '@/components/admin/AdminPanel'
import GlassCard from '@/components/ui/GlassCard'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const { user, profile } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (profile?.is_admin) fetchAdminStats()
  }, [profile])

  const fetchAdminStats = async () => {
    setLoading(true)
    const { count: totalUsers } = await supabase.from('profiles').select('*', { count: 'exact', head: true })
    const { data: moodEntries } = await supabase.from('mood_entries').select('mood')
    const { data: todayMoodEntries } = await supabase.from('mood_entries').select('user_id').gte('created_at', new Date().toISOString().split('T')[0])
    const dailyActiveUsers = new Set(todayMoodEntries?.map(e => e.user_id) || []).size
    const moodCounts = {}
    moodEntries?.forEach(e => { moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1 })
    const mostSelectedMood = Object.entries(moodCounts).reduce((max, [mood, count]) => (count > (moodCounts[max] || 0) ? mood : max), 'happy')
    const { data: activities } = await supabase.from('activities').select('helped_feedback')
    const improvedCount = activities?.filter(a => a.helped_feedback === 'yes').length || 0
    const noChangeCount = activities?.filter(a => a.helped_feedback === 'a_little').length || 0
    const worseCount = activities?.filter(a => a.helped_feedback === 'no').length || 0
    setStats({ totalUsers: totalUsers || 0, totalMoodEntries: moodEntries?.length || 0, dailyActiveUsers, mostSelectedMood: mostSelectedMood.charAt(0).toUpperCase() + mostSelectedMood.slice(1), improvedCount, noChangeCount, worseCount })
    setLoading(false)
  }

  if (profile && !profile.is_admin) {
    return (
      <div className="max-w-xl mx-auto">
        <GlassCard className="p-8 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-400">You do not have permission to access the admin panel.</p>
        </GlassCard>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">View platform statistics and trends</p>
      </div>
      {loading ? (
        <div className="text-center py-12">
          <div className="text-4xl animate-spin">⚙️</div>
          <p className="text-gray-500 mt-4">Loading statistics...</p>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <AdminPanel stats={stats} />
        </motion.div>
      )}
    </div>
  )
}
