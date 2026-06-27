'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import Button from '@/components/ui/Button'
import { Send, Sparkles } from 'lucide-react'
import { moodThemes } from '@/lib/mood-themes'

const moodKeywords = {
  happy: ['happy', 'great', 'amazing', 'wonderful', 'fantastic', 'excited', 'joy', 'love', 'blessed', 'grateful', 'awesome', 'perfect', 'smile', 'laugh', 'celebrate', 'win', 'success'],
  sad: ['sad', 'depressed', 'down', 'unhappy', 'cry', 'tears', 'lonely', 'hurt', 'pain', 'miss', 'loss', 'grief', 'failed', 'fail', 'exam', 'worst', 'terrible', 'awful', 'disappointed'],
  calm: ['calm', 'relaxed', 'peaceful', 'serene', 'content', 'mindful', 'meditation', 'quiet', 'tranquil', 'balance', 'harmony'],
  angry: ['angry', 'mad', 'furious', 'rage', 'hate', 'annoyed', 'frustrated', 'irritated', 'upset', 'pissed', 'betrayed', 'unfair'],
}

function detectMood(text) {
  const lowerText = text.toLowerCase()
  const scores = { happy: 0, sad: 0, calm: 0, angry: 0 }
  Object.entries(moodKeywords).forEach(([mood, keywords]) => {
    keywords.forEach((keyword) => { if (lowerText.includes(keyword)) scores[mood] += 1 })
  })
  const maxScore = Math.max(...Object.values(scores))
  if (maxScore === 0) return { mood: 'calm', confidence: 0.5, detected: false }
  const detectedMood = Object.entries(scores).find(([_, score]) => score === maxScore)[0]
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
  return { mood: detectedMood, confidence: Math.min(maxScore / totalScore + 0.3, 0.95), detected: true }
}

export default function AIMoodDetection({ onDetectMood }) {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleDetect = () => {
    if (!text.trim()) return
    setLoading(true)
    setTimeout(() => {
      const detection = detectMood(text)
      setResult({ ...detection, moodTheme: moodThemes[detection.mood] })
      setLoading(false)
    }, 500)
  }

  const handleAccept = () => { if (result) onDetectMood(result.mood) }

  return (
    <div className="w-full max-w-xl mx-auto">
      <GlassCard className="p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
            <Sparkles size={18} /><span className="font-medium">AI Mood Detection</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">How are you really feeling?</h2>
          <p className="text-gray-600 dark:text-gray-400">Tell us about your day and we will detect your mood</p>
        </div>
        <div className="space-y-4">
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="I failed my exam today..."
            className="w-full h-32 p-4 bg-white/20 dark:bg-white/5 border border-white/30 dark:border-white/10 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-xl resize-none" />
          <Button onClick={handleDetect} isLoading={loading} disabled={!text.trim()} className="w-full">
            <Send size={18} />Analyze My Mood
          </Button>
        </div>
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
            <div className={`p-6 rounded-xl bg-gradient-to-br ${result.moodTheme.bgCard} text-center`}>
              <div className="text-5xl mb-3">{result.moodTheme.emoji}</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Detected Mood: {result.moodTheme.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Confidence: {Math.round(result.confidence * 100)}%</p>
              {result.detected && (
                <>
                  <p className="text-gray-700 dark:text-gray-300 text-sm italic mb-4">&ldquo;{result.moodTheme.quotes[0]}&rdquo;</p>
                  <Button onClick={handleAccept} variant="success">Accept Suggestion</Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </GlassCard>
    </div>
  )
}
