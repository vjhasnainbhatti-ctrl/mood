'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import Button from '@/components/ui/Button'

const icons = { book: '📖', share: '💬', target: '🎯', camera: '📷', music: '🎵', video: '🎬', users: '👥', walk: '🚶', wind: '💨', droplet: '💧', lightbulb: '💡', tree: '🌳', meditation: '🧘' }

export function ActivityDetail({ activity, mood, onComplete }) {
  const [started, setStarted] = useState(false)
  const [completed, setCompleted] = useState(false)

  if (completed) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg mx-auto text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Activity Completed!</h2>
        <p className="text-gray-600 dark:text-gray-400">Great job completing the activity</p>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg mx-auto">
      <GlassCard className="p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">{icons[activity.icon] || '✨'}</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{activity.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{activity.description}</p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
            <span>Duration:</span><span className="font-medium">{activity.duration}</span>
          </div>
          {!started ? (
            <Button onClick={() => setStarted(true)} size="lg" className="w-full">Start Activity</Button>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/30">
                <p className="text-indigo-700 dark:text-indigo-300 text-center">Take your time with this activity. When done, click below.</p>
              </div>
              <Button onClick={() => { setCompleted(true); onComplete() }} size="lg" variant="success" className="w-full">I Done This Activity</Button>
            </motion.div>
          )}
        </div>
      </GlassCard>
    </motion.div>
  )
}

export function ActivityFeedback({ activity, mood, onFeedback }) {
  const options = [
    { id: 'yes', emoji: '😊', label: 'Yes, I feel better', desc: 'The activity really helped!' },
    { id: 'a_little', emoji: '😐', label: 'A little better', desc: 'It helped somewhat' },
    { id: 'no', emoji: '😔', label: 'Not really', desc: "I don't feel much different" },
  ]
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg mx-auto">
      <GlassCard className="p-8">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">💭</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">How did it go?</h2>
          <p className="text-gray-600 dark:text-gray-400">Did this activity help you feel better?</p>
        </div>
        <div className="space-y-3">
          {options.map((opt, i) => (
            <motion.button key={opt.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              onClick={() => onFeedback(opt.id)} className="w-full p-4 rounded-xl bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20 border border-white/30 hover:border-white/50 transition-all text-left">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{opt.emoji}</div>
                <div><div className="font-semibold text-gray-800 dark:text-white">{opt.label}</div><div className="text-sm text-gray-600 dark:text-gray-400">{opt.desc}</div></div>
              </div>
            </motion.button>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}

export function MoodRecheck({ previousMood, onMoodSelect, onSkip }) {
  const moods = Object.entries({ happy: { name: 'Happy', emoji: '😊', bgCard: 'bg-gradient-to-br from-yellow-200/80 to-orange-200/80' }, sad: { name: 'Sad', emoji: '😔', bgCard: 'bg-gradient-to-br from-blue-200/80 to-purple-200/80' }, calm: { name: 'Calm', emoji: '😌', bgCard: 'bg-gradient-to-br from-emerald-200/80 to-teal-200/80' }, angry: { name: 'Angry', emoji: '😡', bgCard: 'bg-gradient-to-br from-slate-300/80 to-gray-300/80' } }).map(([k, v]) => ({ id: k, ...v }))

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg mx-auto">
      <GlassCard className="p-8">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">🌟</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">How are you feeling now?</h2>
          <p className="text-gray-600 dark:text-gray-400">Select the mood that best describes you</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {moods.map((mood) => (
            <motion.button key={mood.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => onMoodSelect(mood.id)}
              className={`p-4 rounded-xl ${mood.bgCard} hover:shadow-lg transition-all ${mood.id === previousMood ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}`}>
              <div className="text-3xl mb-2">{mood.emoji}</div>
              <div className="font-medium text-gray-800 dark:text-white">{mood.name}</div>
            </motion.button>
          ))}
        </div>
        <button onClick={onSkip} className="w-full text-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm">Skip this step</button>
      </GlassCard>
    </motion.div>
  )
}

export function DailyChallenge({ currentMood, challenge, completed, onCompleteChallenge }) {
  const moodThemes = { happy: { bgCard: 'bg-gradient-to-br from-yellow-200/60 to-orange-200/60' }, sad: { bgCard: 'bg-gradient-to-br from-blue-200/60 to-purple-200/60' }, calm: { bgCard: 'bg-gradient-to-br from-emerald-200/60 to-teal-200/60' }, angry: { bgCard: 'bg-gradient-to-br from-slate-200/60 to-gray-200/60' } }
  const theme = moodThemes[currentMood] || moodThemes.calm

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      <GlassCard className={`p-6 ${completed ? 'bg-gradient-to-br from-emerald-200/60 to-teal-200/60' : theme.bgCard}`}>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-white/30"><span className="text-2xl">🎯</span></div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Daily Challenge</h3>
              {completed && <span className="px-2 py-0.5 text-xs font-medium bg-emerald-500 text-white rounded-full">Completed</span>}
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">{challenge.title}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{challenge.description}</p>
          </div>
          {!completed && <Button size="sm" onClick={onCompleteChallenge}>Complete</Button>}
        </div>
      </GlassCard>
    </motion.div>
  )
}
