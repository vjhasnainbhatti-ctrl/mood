'use client'

import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'

const badgeInfo = {
  '7_day_happy_streak': { name: '7 Day Happy Streak', description: 'Checked in as happy for 7 consecutive days', icon: '🌟', color: 'from-yellow-400 to-amber-500' },
  'calm_master': { name: 'Calm Master', description: 'Completed 20 meditation activities', icon: '🧘', color: 'from-teal-400 to-emerald-500' },
  'mood_explorer': { name: 'Mood Explorer', description: 'Logged all four different moods', icon: '🗺️', color: 'from-purple-400 to-indigo-500' },
  'consistency_champion': { name: 'Consistency Champion', description: 'Checked in for 30 consecutive days', icon: '🏆', color: 'from-rose-400 to-pink-500' },
  'first_checkin': { name: 'First Check-in', description: 'Completed your first mood check-in', icon: '🎉', color: 'from-indigo-400 to-purple-500' },
  'week_warrior': { name: 'Week Warrior', description: 'Checked in for 7 consecutive days', icon: '⚔️', color: 'from-slate-400 to-gray-500' },
  'mood_improver': { name: 'Mood Improver', description: 'Improved your mood after an activity', icon: '✨', color: 'from-emerald-400 to-teal-500' },
  'challenge_completer': { name: 'Challenge Completer', description: 'Completed 10 daily challenges', icon: '🎯', color: 'from-orange-400 to-red-500' },
}

export default function AchievementsDisplay({ achievements }) {
  const allBadges = Object.entries(badgeInfo).map(([key, info]) => ({
    id: key, ...info,
    earned: achievements?.some((a) => a.badge_type === key),
    earnedAt: achievements?.find((a) => a.badge_type === key)?.earned_at,
  }))

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {allBadges.map((badge, i) => (
        <motion.div key={badge.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
          <GlassCard className={`p-6 text-center ${badge.earned ? `bg-gradient-to-br ${badge.color}` : 'bg-gray-200/50 dark:bg-gray-800/50'}`}>
            <div className={`text-5xl mb-3 ${!badge.earned && 'grayscale opacity-50'}`}>{badge.icon}</div>
            <h3 className={`font-semibold mb-1 ${badge.earned ? 'text-white' : 'text-gray-500'}`}>{badge.name}</h3>
            <p className={`text-sm ${badge.earned ? 'text-white/80' : 'text-gray-400'}`}>{badge.description}</p>
            {badge.earned && badge.earnedAt && <p className="text-xs text-white/60 mt-2">Earned {new Date(badge.earnedAt).toLocaleDateString()}</p>}
            {!badge.earned && <div className="mt-2"><span className="px-2 py-1 text-xs bg-gray-300/50 dark:bg-gray-700/50 rounded-full text-gray-500">Not Earned</span></div>}
          </GlassCard>
        </motion.div>
      ))}
    </div>
  )
}
