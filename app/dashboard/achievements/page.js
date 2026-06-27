'use client'

import { motion } from 'framer-motion'
import AchievementsDisplay from '@/components/achievements/AchievementsDisplay'
import { useMoodData } from '@/hooks/useMoodData'

export default function AchievementsPage() {
  const { achievements } = useMoodData()

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Achievements</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Earn badges by tracking your mood journey</p>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <AchievementsDisplay achievements={achievements} />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-center text-gray-500 dark:text-gray-400 mt-8">
        <p>Keep checking in and completing activities to unlock more achievements!</p>
      </motion.div>
    </div>
  )
}
