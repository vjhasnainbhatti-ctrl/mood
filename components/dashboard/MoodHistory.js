'use client'

import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import { moodThemes, getMoodTheme } from '@/lib/mood-themes'

export default function MoodHistory({ entries }) {
  if (!entries || entries.length === 0) {
    return (
      <GlassCard className="p-6">
        <div className="text-center text-gray-500">
          <span className="text-4xl">📝</span>
          <p className="mt-2">No mood history yet. Start by checking in!</p>
        </div>
      </GlassCard>
    )
  }
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Mood History</h3>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {entries.slice(0, 10).map((entry, i) => {
            const theme = getMoodTheme(entry.mood)
            return (
              <motion.div key={entry.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className={`p-3 rounded-xl ${theme.bgCard} flex items-center gap-4`}>
                <span className="text-2xl">{theme.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800 dark:text-white">{theme.name}</span>
                    <span className="text-sm text-gray-500">{new Date(entry.created_at).toLocaleDateString()}</span>
                  </div>
                  {entry.previous_mood && <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Changed from {getMoodTheme(entry.previous_mood).name}</div>}
                </div>
                {entry.mood_improved && <span className="px-2 py-1 text-xs font-medium bg-emerald-500 text-white rounded-full">Improved</span>}
              </motion.div>
            )
          })}
        </div>
      </GlassCard>
    </motion.div>
  )
}
