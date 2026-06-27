import '@/styles/globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Moodify - Mood Improvement Assistant',
  description: 'Track your emotions, get AI-powered suggestions, and embark on a journey to better mental wellness',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
