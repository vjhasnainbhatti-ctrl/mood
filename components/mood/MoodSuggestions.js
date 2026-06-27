'use client'

import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import Button from '@/components/ui/Button'
import { moodThemes } from '@/lib/mood-themes'
import { BookOpen, Share2, Target, Camera, Music, Video, Users, Footprints, Wind, Droplets, Lightbulb, Trees } from 'lucide-react'

const iconMap = { book: BookOpen, share: Share2, target: Target, camera: Camera, music: Music, video: Video, users: Users, walk: Footprints, wind: Wind, droplet: Droplets, lightbulb: Lightbulb, tree: Trees, meditation: Wind }

export default function MoodSuggestions({ currentMood, onSelectActivity }) {
  const theme = moodThemes[currentMood] || moodThemes.calm

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="text-6xl mb-3">{theme.emoji}</div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Feeling {theme.name}</h2>
        <p className="text-gray-600 dark:text-gray-400">Here are some activities that might help</p>
      </motion.div>
      <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="show" className="space-y-4">
        {theme.suggestions.map((suggestion) => {
          const IconComponent = iconMap[suggestion.icon] || BookOpen
          return (
            <motion.div key={suggestion.id} variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
              <GlassCard onClick={() => onSelectActivity(suggestion)} className={`p-5 bg-gradient-to-r ${theme.bgCard} hover:scale-[1.02]`}>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/30"><IconComponent size={24} className="text-gray-700 dark:text-gray-200" /></div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{suggestion.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{suggestion.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-500">{suggestion.duration}</span>
                    <div className="mt-2"><Button size="sm" variant="secondary">Start</Button></div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )
        })}
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 text-center">
        <div className={`inline-block p-6 rounded-2xl bg-gradient-to-r ${theme.bgCard} backdrop-blur-xl`}>
          <p className="text-gray-700 dark:text-gray-300 italic text-lg">&ldquo;{theme.quotes[Math.floor(Math.random() * theme.quotes.length)]}&rdquo;</p>
        </div>
      </motion.div>
    </div>
  )
}
