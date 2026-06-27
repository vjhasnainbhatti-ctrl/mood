'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { moodThemes } from '@/lib/mood-themes'

const ThemeContext = createContext({})
export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }) {
  const [currentMood, setCurrentMood] = useState('calm')
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedMood = localStorage.getItem('currentMood')
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedMood && moodThemes[savedMood]) setCurrentMood(savedMood)
    if (savedDarkMode !== null) setDarkMode(savedDarkMode === 'true')
  }, [])

  useEffect(() => {
    if (mounted) localStorage.setItem('currentMood', currentMood)
  }, [currentMood, mounted])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('darkMode', darkMode.toString())
      if (darkMode) document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
    }
  }, [darkMode, mounted])

  const theme = moodThemes[currentMood]
  return <ThemeContext.Provider value={{ currentMood, setCurrentMood, theme, darkMode, setDarkMode, getMoodTheme: (mood) => moodThemes[mood] || moodThemes.calm }}>{children}</ThemeContext.Provider>
}
