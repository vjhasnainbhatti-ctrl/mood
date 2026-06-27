import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'

export function useMoodData() {
  const { user, loading: authLoading } = useAuth()
  const [moodEntries, setMoodEntries] = useState([])
  const [activities, setActivities] = useState([])
  const [challenges, setChallenges] = useState([])
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)

  const fetchMoodEntries = useCallback(async () => {
    if (!user) return
    const { data } = await supabase.from('mood_entries').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(30)
    if (data) setMoodEntries(data)
  }, [user])

  const fetchActivities = useCallback(async () => {
    if (!user) return
    const { data } = await supabase.from('activities').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(50)
    if (data) setActivities(data)
  }, [user])

  const fetchChallenges = useCallback(async () => {
    if (!user) return
    const { data } = await supabase.from('daily_challenges').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    if (data) setChallenges(data)
  }, [user])

  const fetchAchievements = useCallback(async () => {
    if (!user) return
    const { data } = await supabase.from('achievements').select('*').eq('user_id', user.id)
    if (data) setAchievements(data)
  }, [user])

  useEffect(() => {
    if (authLoading) return
    if (user && !initialized) {
      setLoading(true)
      Promise.all([fetchMoodEntries(), fetchActivities(), fetchChallenges(), fetchAchievements()])
        .finally(() => {
          setLoading(false)
          setInitialized(true)
        })
    } else if (!user) {
      setLoading(false)
      setMoodEntries([])
      setActivities([])
      setChallenges([])
      setAchievements([])
    }
  }, [user, authLoading, initialized, fetchMoodEntries, fetchActivities, fetchChallenges, fetchAchievements])

  const saveMoodEntry = async (mood, previousMood = null, moodImproved = null) => {
    if (!user) return null
    const { data } = await supabase.from('mood_entries').insert([{ user_id: user.id, mood, previous_mood: previousMood, mood_improved: moodImproved }]).select().single()
    if (data) setMoodEntries((prev) => [data, ...prev])
    return data
  }

  const saveActivity = async (activityName, mood) => {
    if (!user) return null
    const { data } = await supabase.from('activities').insert([{ user_id: user.id, mood, activity_name: activityName, completed: false }]).select().single()
    if (data) setActivities((prev) => [data, ...prev])
    return data
  }

  const completeActivity = async (activityId, feedback, newMood = null) => {
    if (!user) return
    const { data } = await supabase.from('activities').update({ completed: true, helped_feedback: feedback, new_mood_after: newMood, completed_at: new Date().toISOString() }).eq('id', activityId).select().single()
    if (data) setActivities((prev) => prev.map((a) => (a.id === activityId ? data : a)))
  }

  const completeChallenge = async (challengeId) => {
    if (!user) return
    const { data } = await supabase.from('daily_challenges').update({ completed: true, completed_at: new Date().toISOString() }).eq('id', challengeId).select().single()
    if (data) setChallenges((prev) => prev.map((c) => (c.id === challengeId ? data : c)))
  }

  const createDailyChallenge = async (mood, challenge) => {
    if (!user) return null
    const today = new Date().toISOString().split('T')[0]
    const existing = challenges.find((c) => c.date === today && c.mood === mood)
    if (existing) return existing
    const { data } = await supabase.from('daily_challenges').insert([{ user_id: user.id, mood, challenge_title: challenge.title, challenge_description: challenge.description, date: today }]).select().single()
    if (data) setChallenges((prev) => [data, ...prev])
    return data
  }

  const awardAchievement = async (badgeType, metadata = {}) => {
    if (!user) return null
    if (achievements.find((a) => a.badge_type === badgeType)) return null
    const { data } = await supabase.from('achievements').insert([{ user_id: user.id, badge_type: badgeType, metadata }]).select().single()
    if (data) setAchievements((prev) => [...prev, data])
    return data
  }

  const calculateStats = () => {
    const totalCheckins = moodEntries.length
    const activitiesCompleted = activities.filter((a) => a.completed).length
    const improvedActivities = activities.filter((a) => a.helped_feedback === 'yes' || a.helped_feedback === 'a_little').length
    const improvementRate = activitiesCompleted > 0 ? Math.round((improvedActivities / activitiesCompleted) * 100) : 0
    const currentStreak = moodEntries.length > 0 ? 1 : 0
    const moodCounts = {}
    moodEntries.forEach((e) => { moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1 })
    const mostSelectedMood = Object.entries(moodCounts).reduce((max, [mood, count]) => (count > (moodCounts[max] || 0) ? mood : max), 'happy')
    return { totalCheckins, activitiesCompleted, improvementRate, currentStreak, mostSelectedMood, moodCounts }
  }

  return { moodEntries, activities, challenges, achievements, loading, saveMoodEntry, saveActivity, completeActivity, completeChallenge, createDailyChallenge, awardAchievement, calculateStats }
}
