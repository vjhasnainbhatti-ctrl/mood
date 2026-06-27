'use client'

import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import { moodThemes } from '@/lib/mood-themes'

export default function MoodSelection({ onSelectMood }) {
  const moods = Object.entries(moodThemes).map(([key, theme]) => ({ id: key, ...theme }))

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">How are you feeling?</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Select your current mood to get personalized suggestions</p>
      </motion.div>
      <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {moods.map((mood) => (
          <motion.div key={mood.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
            <GlassCard onClick={() => onSelectMood(mood.id)} className={`p-6 flex flex-col items-center justify-center h-48 bg-gradient-to-br ${mood.bgCard} hover:scale-105`}>
              <motion.div whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }} transition={{ duration: 0.3 }} className="text-6xl mb-3">{mood.emoji}</motion.div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{mood.name}</h3>
              <div className={`mt-2 w-12 h-1 rounded-full bg-gradient-to-r ${mood.gradient}`} />
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
