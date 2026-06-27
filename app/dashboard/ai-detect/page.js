'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import AIMoodDetection from '@/components/mood/AIMoodDetection'
import MoodSuggestions from '@/components/mood/MoodSuggestions'
import { useMoodData } from '@/hooks/useMoodData'
import { useTheme } from '@/context/ThemeContext'

export default function AIDetectPage() {
  const router = useRouter()
  const { setCurrentMood } = useTheme()
  const { saveMoodEntry, saveActivity } = useMoodData()
  const [detectedMood, setDetectedMood] = useState(null)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleDetectMood = async (mood) => {
    setDetectedMood(mood)
    setCurrentMood(mood)
    await saveMoodEntry(mood)
    setShowSuggestions(true)
  }

  const handleSelectActivity = async (activity) => {
    await saveActivity(activity.title, detectedMood)
    router.push('/dashboard')
  }

  return (
    <div className="space-y-6">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">AI Mood Detection</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Let AI analyze your feelings</p>
      </div>
      {showSuggestions ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-4">
            <p className="text-gray-600 dark:text-gray-400">Based on your input, we detected you are feeling <span className="font-semibold text-indigo-500">{detectedMood}</span></p>
          </div>
          <MoodSuggestions currentMood={detectedMood} onSelectActivity={handleSelectActivity} />
        </motion.div>
      ) : (
        <AIMoodDetection onDetectMood={handleDetectMood} />
      )}
    </div>
  )
}
