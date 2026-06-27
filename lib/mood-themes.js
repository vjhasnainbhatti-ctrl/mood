export const moodThemes = {
  happy: {
    name: 'Happy', emoji: '😊',
    gradient: 'from-yellow-400 via-orange-400 to-amber-500',
    bgGradient: 'from-yellow-50 via-orange-50 to-amber-100',
    primary: '#f59e0b', secondary: '#fb923c',
    bgCard: 'bg-gradient-to-br from-yellow-200/80 to-orange-200/80',
    suggestions: [
      { id: 1, title: 'Gratitude Journal', description: 'Write 3 things you are grateful for', icon: 'book', duration: '5 min' },
      { id: 2, title: 'Share Happiness', description: 'Send a positive message to someone', icon: 'share', duration: '2 min' },
      { id: 3, title: 'Set Goals', description: 'Plan something exciting for the future', icon: 'target', duration: '10 min' },
      { id: 4, title: 'Capture the Moment', description: 'Take a photo of something beautiful', icon: 'camera', duration: '1 min' },
    ],
    challenge: { title: 'Help Someone Today', description: 'Perform a random act of kindness' },
    quotes: ['Happiness is not something ready made. It comes from your own actions.', 'The purpose of our lives is to be happy.'],
  },
  sad: {
    name: 'Sad', emoji: '😔',
    gradient: 'from-blue-400 via-indigo-400 to-purple-500',
    bgGradient: 'from-blue-50 via-indigo-50 to-purple-100',
    primary: '#6366f1', secondary: '#8b5cf6',
    bgCard: 'bg-gradient-to-br from-blue-200/80 to-purple-200/80',
    suggestions: [
      { id: 1, title: 'Listen to Music', description: 'Play your favorite uplifting songs', icon: 'music', duration: '10 min' },
      { id: 2, title: 'Watch Funny Videos', description: 'Enjoy some comedy content', icon: 'video', duration: '15 min' },
      { id: 3, title: 'Talk to a Friend', description: 'Reach out to someone you trust', icon: 'users', duration: '20 min' },
      { id: 4, title: 'Take a Walk', description: 'Get some fresh air and movement', icon: 'walk', duration: '15 min' },
    ],
    challenge: { title: 'Write 3 Positive Things', description: 'List 3 good things that happened today' },
    quotes: ['Every storm runs out of rain. Keep going.', 'The sun will rise and we will try again.'],
  },
  calm: {
    name: 'Calm', emoji: '😌',
    gradient: 'from-emerald-400 via-teal-400 to-cyan-500',
    bgGradient: 'from-emerald-50 via-teal-50 to-cyan-100',
    primary: '#14b8a6', secondary: '#22c55e',
    bgCard: 'bg-gradient-to-br from-emerald-200/80 to-teal-200/80',
    suggestions: [
      { id: 1, title: 'Meditation', description: 'Practice mindfulness and breathing', icon: 'wind', duration: '10 min' },
      { id: 2, title: 'Reading', description: 'Enjoy a good book or article', icon: 'book', duration: '20 min' },
      { id: 3, title: 'Learn a New Skill', description: 'Explore something you have always wanted to learn', icon: 'lightbulb', duration: '30 min' },
      { id: 4, title: 'Nature Walk', description: 'Connect with nature outdoors', icon: 'tree', duration: '15 min' },
    ],
    challenge: { title: 'Read 10 Pages', description: 'Start a book or continue reading' },
    quotes: ['Peace comes from within. Do not seek it without.', 'The quieter you become, the more you can hear.'],
  },
  angry: {
    name: 'Angry', emoji: '😡',
    gradient: 'from-slate-600 via-slate-700 to-gray-800',
    bgGradient: 'from-slate-100 via-slate-50 to-gray-100',
    primary: '#475569', secondary: '#64748b',
    bgCard: 'bg-gradient-to-br from-slate-300/80 to-gray-300/80',
    suggestions: [
      { id: 1, title: 'Deep Breathing', description: 'Practice 4-7-8 breathing technique', icon: 'wind', duration: '5 min' },
      { id: 2, title: 'Relaxing Music', description: 'Listen to calm, soothing melodies', icon: 'music', duration: '10 min' },
      { id: 3, title: 'Drink Water', description: 'Hydrate and take a moment', icon: 'droplet', duration: '1 min' },
      { id: 4, title: 'Take a Short Walk', description: 'Step away and cool down', icon: 'walk', duration: '10 min' },
    ],
    challenge: { title: 'Take 10 Deep Breaths', description: 'Focus on each breath in and out' },
    quotes: ['For every minute you remain angry, you give up sixty seconds of peace of mind.', 'Anger is an acid that does more harm to the vessel in which it is stored.'],
  },
}

export const getMoodTheme = (mood) => moodThemes[mood] || moodThemes.calm
