'use client'

import Head from 'next/head'
import DashboardLayout from '@/components/layout/DashboardLayout'
import StatsCards from '@/components/dashboard/StatsCards'
import MoodHistory from '@/components/dashboard/MoodHistory'
import { WeeklyMoodChart, MoodPieChart, ImprovementLineChart } from '@/components/dashboard/MoodCharts'
import { useMoodData } from '@/hooks/useMoodData'

export default function StatsPage() {
  const { moodEntries, calculateStats } = useMoodData()
  const stats = calculateStats()

  return (
    <DashboardLayout>
      <Head><title>Stats - Moodify</title></Head>
      <div className="space-y-6">
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Mood Statistics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track your mood patterns over time</p>
        </div>
        <StatsCards stats={stats} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeeklyMoodChart data={moodEntries} />
          <MoodPieChart data={moodEntries} />
        </div>
        <ImprovementLineChart data={moodEntries} />
        <MoodHistory entries={moodEntries} />
      </div>
    </DashboardLayout>
  )
}
