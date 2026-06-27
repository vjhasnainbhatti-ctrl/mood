'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Mail, Lock, User, Eye, EyeOff, Sparkles, Heart, Brain, TrendingUp, Trophy, ChevronDown, Star, Quote, ArrowRight, Check } from 'lucide-react'

const features = [
  {
    icon: Heart,
    title: 'Mood Tracking',
    description: 'Track your daily moods and see how they change over time with beautiful visualizations'
  },
  {
    icon: Brain,
    title: 'AI Mood Detection',
    description: 'Our AI analyzes your feelings and suggests personalized activities to improve your mood'
  },
  {
    icon: TrendingUp,
    title: 'Progress Analytics',
    description: 'See your mood improvement journey with detailed charts and statistics'
  },
  {
    icon: Trophy,
    title: 'Achievements',
    description: 'Earn badges and rewards as you maintain your emotional wellness journey'
  }
]

const moods = [
  { emoji: '😊', name: 'Happy', color: 'from-yellow-400 to-orange-400' },
  { emoji: '😔', name: 'Sad', color: 'from-blue-400 to-purple-400' },
  { emoji: '😌', name: 'Calm', color: 'from-emerald-400 to-teal-400' },
  { emoji: '😡', name: 'Angry', color: 'from-slate-400 to-gray-500' }
]

const testimonials = [
  { name: 'Sarah M.', text: 'Moodify helped me understand my emotions better. I feel more in control now!', rating: 5 },
  { name: 'David K.', text: 'The AI suggestions are amazing! It always knows what I need.', rating: 5 },
  { name: 'Emily R.', text: 'Beautiful design and really helpful for tracking my mental health.', rating: 5 }
]

export default function AuthPage() {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showAuth, setShowAuth] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await signIn(email, password)
      } else {
        if (password.length < 6) throw new Error('Password must be at least 6 characters')
        await signUp(email, password, fullName)
        setSuccess(true)
      }
    } catch (err) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="backdrop-blur-xl bg-white/30 dark:bg-white/10 border border-white/40 dark:border-white/20 rounded-3xl shadow-2xl p-8 text-center max-w-md"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Check your email</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">We sent a confirmation link to <span className="font-semibold">{email}</span></p>
          <Button onClick={() => { setSuccess(false); setMode('login') }} variant="secondary" className="w-full">Back to Sign In</Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-40 right-20 w-60 h-60 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-40 left-20 w-64 h-64 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🌈</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">Moodify</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            {!showAuth && (
              <Button onClick={() => setShowAuth(true)}>
                Get Started
                <ArrowRight size={18} />
              </Button>
            )}
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-10 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-6">
                <Sparkles size={18} />
                <span className="text-sm font-medium">Your Personal Mood Assistant</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
                Transform Your <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Mood</span>, Transform Your Life
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Track your emotions, get AI-powered suggestions, and embark on a journey to better mental wellness. Your feelings matter, and we are here to help.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAuth(true)}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  Start Your Journey
                  <ArrowRight size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white/30 dark:bg-white/10 backdrop-blur-xl text-gray-700 dark:text-white font-semibold rounded-xl border border-white/30 hover:bg-white/40 transition-all"
                >
                  Learn More
                </motion.button>
              </div>

              {/* Mood Preview */}
              <div className="flex items-center gap-6">
                <span className="text-gray-500 dark:text-gray-400 text-sm">Track your moods:</span>
                <div className="flex gap-3">
                  {moods.map((mood, i) => (
                    <motion.div
                      key={mood.name}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      whileHover={{ scale: 1.2, y: -5 }}
                      className="w-12 h-12 bg-gradient-to-r rounded-xl flex items-center justify-center shadow-lg cursor-pointer"
                    >
                      <span className="text-2xl">{mood.emoji}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Auth Form or Hero Image */}
            <AnimatePresence mode="wait">
              {showAuth ? (
                <motion.div
                  key="auth"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <div className="backdrop-blur-xl bg-white/30 dark:bg-white/10 border border-white/40 dark:border-white/20 rounded-3xl shadow-2xl p-8">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {mode === 'login' ? 'Welcome Back!' : 'Join Moodify'}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {mode === 'login' ? 'Sign in to continue your journey' : 'Start your wellness journey today'}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {mode === 'signup' && (
                        <Input
                          label="Full Name"
                          placeholder="John Doe"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          icon={<User size={18} />}
                          required
                        />
                      )}
                      <Input
                        label="Email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={<Mail size={18} />}
                        required
                      />
                      <div className="relative">
                        <Input
                          label="Password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          icon={<Lock size={18} />}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>

                      {error && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg"
                        >
                          {error}
                        </motion.p>
                      )}

                      <Button type="submit" className="w-full" size="lg" isLoading={loading}>
                        {mode === 'login' ? 'Sign In' : 'Create Account'}
                      </Button>
                    </form>

                    <div className="mt-6 text-center">
                      <button
                        type="button"
                        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                        className="text-indigo-500 hover:text-indigo-600 text-sm font-medium"
                      >
                        {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                      </button>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
                      <button
                        onClick={() => setShowAuth(false)}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
                      >
                        ← Back to home
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="hero-visual"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="relative"
                >
                  {/* Dashboard Preview Card */}
                  <div className="backdrop-blur-xl bg-white/20 dark:bg-white/5 border border-white/30 dark:border-white/10 rounded-3xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="space-y-4">
                      <div className="text-center py-6">
                        <p className="text-gray-600 dark:text-gray-400 mb-3">How are you feeling?</p>
                        <div className="flex justify-center gap-4">
                          {moods.map((mood) => (
                            <motion.div
                              key={mood.name}
                              whileHover={{ scale: 1.2 }}
                              className="w-14 h-14 bg-gradient-to-br from-white/60 to-white/20 rounded-xl flex items-center justify-center shadow cursor-pointer"
                            >
                              <span className="text-3xl">{mood.emoji}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl p-4">
                          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">12</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Check-ins</div>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl p-4">
                          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">85%</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Improved</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-8 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-xl"
                  >
                    <span className="text-4xl">😊</span>
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-8 -left-4 w-16 h-16 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-2xl flex items-center justify-center shadow-xl"
                  >
                    <Trophy className="w-8 h-8 text-white" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      {!showAuth && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="relative z-10 flex justify-center pb-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ChevronDown size={32} className="text-gray-400" />
          </motion.div>
        </motion.div>
      )}

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20 bg-white/30 dark:bg-gray-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Everything You Need for <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Emotional Wellness</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to help you understand and improve your mood
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              How It <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Simple steps to a better you</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Check Your Mood', desc: 'Select how you are feeling from four mood types', icon: '😊' },
              { step: '02', title: 'Get Suggestions', desc: 'Receive personalized activities based on your mood', icon: '💡' },
              { step: '03', title: 'Track Progress', desc: 'Monitor your improvement over time', icon: '📈' }
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: i === 0 ? -30 : i === 2 ? 30 : 0, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative text-center"
              >
                <div className="text-6xl font-bold text-indigo-100 dark:text-indigo-900/30 absolute -top-10 left-1/2 -translate-x-1/2">
                  {item.step}
                </div>
                <div className="backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/10 rounded-2xl p-8 pt-12 shadow-xl relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 px-6 py-20 bg-white/30 dark:bg-gray-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Loved by <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Thousands</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">See what our users are saying</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/10 rounded-2xl p-6 shadow-xl"
              >
                <Quote className="w-8 h-8 text-indigo-300 dark:text-indigo-700 mb-4" />
                <p className="text-gray-700 dark:text-gray-300 mb-4">{t.text}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {t.name[0]}
                    </div>
                    <span className="font-semibold text-gray-800 dark:text-white">{t.name}</span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
              Ready to Start Your <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Journey</span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Join thousands of users who have improved their emotional wellness with Moodify
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAuth(true)}
              className="px-12 py-5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight size={20} />
            </motion.button>
            <div className="flex items-center justify-center gap-6 mt-8 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Check size={18} className="text-emerald-500" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={18} className="text-emerald-500" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={18} className="text-emerald-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-white/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌈</span>
            <span className="font-bold text-gray-800 dark:text-white">Moodify</span>
          </div>
          <p className="text-gray-500 text-sm">© 2024 Moodify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
