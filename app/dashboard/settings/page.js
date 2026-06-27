'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { Sun, Moon, Save, User, Mail } from 'lucide-react'

export default function SettingsPage() {
  const { user, profile, updateProfile } = useAuth()
  const { darkMode, setDarkMode } = useTheme()
  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      await updateProfile({ full_name: fullName })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account preferences</p>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <GlassCard className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Profile Settings</h2>
          <div className="space-y-4">
            <Input label="Email" value={user?.email || ''} disabled icon={<Mail size={18} />} />
            <Input label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} icon={<User size={18} />} />
            <Button onClick={handleSaveProfile} isLoading={saving}>
              <Save size={18} />{saved ? 'Saved!' : 'Save Changes'}
            </Button>
          </div>
        </GlassCard>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <GlassCard className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Dark Mode</p>
              <p className="text-gray-500 text-sm">Switch between light and dark themes</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-14 h-7 rounded-full transition-colors ${darkMode ? 'bg-indigo-500' : 'bg-gray-300'}`}
            >
              <motion.div
                className="absolute top-1 w-5 h-5 rounded-full bg-white flex items-center justify-center"
                animate={{ left: darkMode ? '32px' : '4px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                {darkMode ? <Moon size={14} className="text-indigo-500" /> : <Sun size={14} className="text-yellow-500" />}
              </motion.div>
            </button>
          </div>
        </GlassCard>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <GlassCard className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">About Moodify</h2>
          <p className="text-gray-600 dark:text-gray-400">Moodify is a mood improvement assistant designed to help you track and improve your emotional well-being. Select your current mood, receive personalized suggestions, and track your progress over time.</p>
          <div className="mt-4 text-sm text-gray-500">Version 1.0.0</div>
        </GlassCard>
      </motion.div>
    </div>
  )
}
