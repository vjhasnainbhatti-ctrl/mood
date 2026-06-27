'use client'

import { motion } from 'framer-motion'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import GlassCard from '@/components/ui/GlassCard'

const moodColors = { happy: { color: '#f59e0b', name: 'Happy' }, sad: { color: '#6366f1', name: 'Sad' }, calm: { color: '#14b8a6', name: 'Calm' }, angry: { color: '#475569', name: 'Angry' } }

export function WeeklyMoodChart({ data }) {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const chartData = weekDays.map((day, i) => {
    const dayData = { day }
    Object.keys(moodColors).forEach((mood) => { dayData[mood] = data?.filter((e) => new Date(e.created_at).getDay() === i && e.mood === mood).length || 0 })
    return dayData
  })
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Weekly Mood Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
              <Legend />
              {Object.entries(moodColors).map(([mood, { color, name }]) => <Area key={mood} type="monotone" dataKey={mood} name={name} stroke={color} fill={color} fillOpacity={0.3} />)}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </motion.div>
  )
}

export function MoodPieChart({ data }) {
  const pieData = Object.keys(moodColors).map((mood) => ({ name: moodColors[mood].name, value: data?.filter((e) => e.mood === mood).length || 0, color: moodColors[mood].color })).filter((d) => d.value > 0)
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Overall Mood Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {pieData.map((entry, i) => <Cell key={`cell-${i}`} fill={entry.color} />)}
              </Pie>
              <Tooltip /><Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </motion.div>
  )
}

export function ImprovementLineChart({ data }) {
  const chartData = (data || []).sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).slice(-20).map((e) => ({ date: new Date(e.created_at).toLocaleDateString(), improved: e.mood_improved ? 1 : 0 }))
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Mood Improvement Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" domain={[0, 1]} ticks={[0, 1]} />
              <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '8px' }} formatter={(v) => v === 1 ? 'Improved' : 'Not Improved'} />
              <Line type="monotone" dataKey="improved" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </motion.div>
  )
}
