'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { moodThemes } from '@/lib/mood-themes'

const ThemeContext = createContext({})
export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }) {
  const [currentMood, setCurrentMood] = useState('calm')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedMood = localStorage.getItem('currentMood')
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedMood && moodThemes[savedMood]) setCurrentMood(savedMood)
    if (savedDarkMode !== null) setDarkMode(savedDarkMode === 'true')
  }, [])

  useEffect(() => { localStorage.setItem('currentMood', currentMood) }, [currentMood])

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString())
    if (darkMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [darkMode])

  const theme = moodThemes[currentMood]
  return <ThemeContext.Provider value={{ currentMood, setCurrentMood, theme, darkMode, setDarkMode, getMoodTheme: (mood) => moodThemes[mood] || moodThemes.calm }}>{children}</ThemeContext.Provider>
}
