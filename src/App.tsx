'use client'

import { useState, useEffect } from 'react'
import { AuthPage } from './components/AuthPage'
import { WelcomeScreen } from './components/WelcomeScreen'
import { MoodCheckIn } from './components/MoodCheckIn'
import { LetterWriter } from './components/LetterWriter'
import { GuidedJournal } from './components/GuidedJournal'

// ⬇️ Import types with `import type`
import type { AppPage, User, MoodEntry, Letter } from './types'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [currentPage, setCurrentPage] = useState<AppPage>('welcome')
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
  const [letters, setLetters] = useState<Letter[]>([])
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode))
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const handleLogin = (userData: User) => {
    setUser(userData)
    setIsAuthenticated(true)
    setCurrentPage('welcome')
  }

  const protectedPages: AppPage[] = ['mood', 'letter', 'journal']
  if (protectedPages.includes(currentPage) && !isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomeScreen user={user} onNavigate={setCurrentPage} />
      case 'mood':
        return (
          <MoodCheckIn
            user={user}
            onMoodEntry={(entry) => setMoodEntries([...moodEntries, entry])}
          />
        )
      case 'letter':
        return (
          <LetterWriter
            user={user}
            onSaveLetter={(letter) => setLetters([...letters, letter])}
          />
        )
      case 'journal':
        return <GuidedJournal user={user} />
      case 'auth':
        return <AuthPage onLogin={handleLogin} />
      default:
        return <WelcomeScreen user={user} onNavigate={setCurrentPage} />
    }
  }

  return (
    <div
      className={`min-h-screen bg-background transition-colors duration-300 ${
        darkMode ? 'dark' : ''
      }`}
    >
      <main className="pb-20 pt-20">{renderCurrentPage()}</main>
    </div>
  )
}
