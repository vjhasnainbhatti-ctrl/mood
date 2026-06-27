'use client'

import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'

export default function StatsCards({ stats }) {
  const cards = [
    { title: 'Total Check-ins', value: stats.totalCheckins || 0, icon: '📊', color: 'from-indigo-500 to-purple-500' },
    { title: 'Activities Completed', value: stats.activitiesCompleted || 0, icon: '✅', color: 'from-emerald-500 to-teal-500' },
    { title: 'Mood Improved', value: `${stats.improvementRate || 0}%`, icon: '📈', color: 'from-amber-500 to-orange-500' },
    { title: 'Current Streak', value: `${stats.currentStreak || 0} days`, icon: '🔥', color: 'from-rose-500 to-pink-500' },
  ]
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, i) => (
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
  )
}
