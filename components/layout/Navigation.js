'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import Button from '@/components/ui/Button'
import { Home, BarChart3, Trophy, Brain, Settings, LogOut, Menu, X, Sun, Moon, User } from 'lucide-react'

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/dashboard/stats', icon: BarChart3, label: 'Stats' },
  { href: '/dashboard/achievements', icon: Trophy, label: 'Achievements' },
  { href: '/dashboard/ai-detect', icon: Brain, label: 'AI Mood' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
]

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, profile, signOut } = useAuth()
  const { darkMode, setDarkMode } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌈</span>
              <span className="text-xl font-bold text-gray-800 dark:text-white">Moodify</span>
            </div>
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' : 'text-gray-600 dark:text-gray-300 hover:bg-white/20'}`}>
                    <item.icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>
            <div className="flex items-center gap-2">
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors">
                {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-indigo-500" />}
              </motion.button>
              <div className="hidden md:flex items-center gap-3 ml-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/20">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">{profile?.full_name || 'User'}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-gray-600 dark:text-gray-300">
                  <LogOut size={18} />
                </Button>
              </div>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-xl bg-white/20">
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden backdrop-blur-xl bg-white/20 dark:bg-gray-900/80 border-b border-white/20">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-white/20'}`}>
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
              <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                <LogOut size={20} />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
