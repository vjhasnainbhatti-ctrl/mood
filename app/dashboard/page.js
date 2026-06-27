'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MoodSelection from '@/components/mood/MoodSelection'
import MoodSuggestions from '@/components/mood/MoodSuggestions'
import { ActivityDetail, ActivityFeedback, MoodRecheck, DailyChallenge } from '@/components/mood/ActivityFlow'
import StatsCards from '@/components/dashboard/StatsCards'
import MoodHistory from '@/components/dashboard/MoodHistory'
import { useTheme } from '@/context/ThemeContext'
import { useMoodData } from '@/hooks/useMoodData'
import { useAuth } from '@/context/AuthContext'
import { moodThemes } from '@/lib/mood-themes'
import Button from '@/components/ui/Button'
import GlassCard from '@/components/ui/GlassCard'

const STEPS = { SELECTION: 'selection', SUGGESTIONS: 'suggestions', ACTIVITY: 'activity', FEEDBACK: 'feedback', RECHECK: 'recheck', COMPLETE: 'complete' }

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth()
  const { setCurrentMood } = useTheme()
  const { moodEntries, challenges, saveMoodEntry, saveActivity, completeActivity, completeChallenge, createDailyChallenge, awardAchievement, calculateStats, loading: dataLoading } = useMoodData()
  const [step, setStep] = useState(STEPS.SELECTION)
  const [currentMood, setCurrentMoodState] = useState(null)
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [currentActivityId, setCurrentActivityId] = useState(null)
  const [currentChallenge, setCurrentChallenge] = useState(null)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    if (currentMood) {
      createDailyChallenge(currentMood, moodThemes[currentMood]?.challenge || {}).then(setCurrentChallenge)
    }
  }, [currentMood, createDailyChallenge])

  const handleSelectMood = async (mood) => {
    setCurrentMood(mood)
    setCurrentMoodState(mood)
    await saveMoodEntry(mood)
    if (moodEntries.length === 0) awardAchievement('first_checkin')
    setStep(STEPS.SUGGESTIONS)
  }

  const handleSelectActivity = async (activity) => {
    setSelectedActivity(activity)
    const activityId = await saveActivity(activity.title, currentMood)
    setCurrentActivityId(activityId)
    setStep(STEPS.ACTIVITY)
  }

  const handleActivityComplete = () => setStep(STEPS.FEEDBACK)

  const handleFeedback = async (feedbackType) => {
    setFeedback(feedbackType)
    if (currentActivityId) await completeActivity(currentActivityId, feedbackType)
    setStep(STEPS.RECHECK)
  }

  const handleMoodRecheck = async (newMood) => {
    await saveMoodEntry(newMood, currentMood, feedback === 'yes' || feedback === 'a_little')
    if (feedback === 'yes') awardAchievement('mood_improver')
    setStep(STEPS.COMPLETE)
  }

  const handleSkipRecheck = () => setStep(STEPS.COMPLETE)

  const handleCompleteChallenge = async () => {
    if (currentChallenge) await completeChallenge(currentChallenge.id)
  }

  const handleStartOver = () => {
    setStep(STEPS.SELECTION)
    setCurrentMoodState(null)
    setSelectedActivity(null)
    setCurrentActivityId(null)
    setFeedback(null)
  }

  const stats = calculateStats()

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            🌈
          </motion.div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />
      {currentChallenge && step === STEPS.SUGGESTIONS && (
        <DailyChallenge currentMood={currentMood} challenge={{ title: currentChallenge.challenge_title, description: currentChallenge.challenge_description }} completed={currentChallenge.completed} onCompleteChallenge={handleCompleteChallenge} />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <AnimatePresence mode="wait">
            {step === STEPS.SELECTION && <MoodSelection key="selection" onSelectMood={handleSelectMood} />}
            {step === STEPS.SUGGESTIONS && <MoodSuggestions key="suggestions" currentMood={currentMood} onSelectActivity={handleSelectActivity} />}
            {step === STEPS.ACTIVITY && <ActivityDetail key="activity" activity={selectedActivity} mood={currentMood} onComplete={handleActivityComplete} />}
            {step === STEPS.FEEDBACK && <ActivityFeedback key="feedback" activity={selectedActivity} mood={currentMood} onFeedback={handleFeedback} />}
            {step === STEPS.RECHECK && <MoodRecheck key="recheck" previousMood={currentMood} onMoodSelect={handleMoodRecheck} onSkip={handleSkipRecheck} />}
            {step === STEPS.COMPLETE && (
              <motion.div key="complete" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <GlassCard className="p-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Great Job!</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">You completed the mood check-in. Keep tracking your mood!</p>
                  <Button onClick={handleStartOver} size="lg">Start New Check-in</Button>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <MoodHistory entries={moodEntries} />
      </div>
    </div>
  )
}
