'use client'

import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts'

const moodColors = { happy: '#f59e0b', sad: '#6366f1', calm: '#14b8a6', angry: '#475569' }

export default function AdminPanel({ stats }) {
  const statCards = [
    { title: 'Total Users', value: stats?.totalUsers || 0, icon: '👥', color: 'from-indigo-500 to-purple-500' },
    { title: 'Daily Active Users', value: stats?.dailyActiveUsers || 0, icon: '🟢', color: 'from-emerald-500 to-teal-500' },
    { title: 'Total Mood Entries', value: stats?.totalMoodEntries || 0, icon: '📊', color: 'from-amber-500 to-orange-500' },
    { title: 'Most Selected Mood', value: stats?.mostSelectedMood || 'N/A', icon: '🏆', color: 'from-rose-500 to-pink-500' },
  ]

  const trendData = [
    { day: 'Mon', happy: 12, sad: 5, calm: 8, angry: 3 },
    { day: 'Tue', happy: 15, sad: 4, calm: 10, angry: 2 },
    { day: 'Wed', happy: 10, sad: 8, calm: 6, angry: 5 },
    { day: 'Thu', happy: 18, sad: 3, calm: 12, angry: 1 },
    { day: 'Fri', happy: 20, sad: 2, calm: 15, angry: 2 },
    { day: 'Sat', happy: 25, sad: 1, calm: 18, angry: 1 },
    { day: 'Sun', happy: 22, sad: 3, calm: 14, angry: 2 },
  ]

  const improvementData = [
    { name: 'Improved', value: stats?.improvedCount || 65, color: '#10b981' },
    { name: 'No Change', value: stats?.noChangeCount || 25, color: '#6b7280' },
    { name: 'Worse', value: stats?.worseCount || 10, color: '#ef4444' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <GlassCard className={`p-5 bg-gradient-to-br ${card.color}`}>
              <div className="flex items-start justify-between">
                <div><p className="text-white/80 text-sm font-medium">{card.title}</p><p className="text-white text-2xl font-bold mt-1">{card.value}</p></div>
                <span className="text-3xl">{card.icon}</span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Mood Trends This Week</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '8px' }} />
                <Legend />
                <Line type="monotone" dataKey="happy" stroke={moodColors.happy} strokeWidth={2} />
                <Line type="monotone" dataKey="sad" stroke={moodColors.sad} strokeWidth={2} />
                <Line type="monotone" dataKey="calm" stroke={moodColors.calm} strokeWidth={2} />
                <Line type="monotone" dataKey="angry" stroke={moodColors.angry} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Mood Improvement Statistics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={improvementData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {improvementData.map((entry, i) => <Cell key={`cell-${i}`} fill={entry.color} />)}
                </Pie>
                <Tooltip /><Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
