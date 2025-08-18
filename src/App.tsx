'use client'

import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthPage } from './components/AuthPage'
import { WelcomeScreen } from './components/WelcomeScreen'
import { MoodCheckIn } from './components/MoodCheckIn'
import { LetterWriter } from './components/LetterWriter'
import { GuidedJournal } from './components/GuidedJournal'
import type { User, MoodEntry, Letter, AppPage } from './types'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
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
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <Routes>
      {/* Layout wraps all pages */}
      <Route
        element={
          <Layout
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={handleLogout}
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode((v) => !v)}
          />
        }
      >
        {/* Public */}
        <Route index element={<WelcomeScreen user={user} onNavigate={function (page: AppPage): void {
          throw new Error('Function not implemented.')
        } } />} />
        <Route path="/auth" element={<AuthPage onLogin={handleLogin} />} />

        {/* Protected group */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route
            path="/mood"
            element={
              <MoodCheckIn
                user={user}
                onMoodEntry={(entry) => setMoodEntries((p) => [...p, entry])}
              />
            }
          />
          <Route
            path="/letter"
            element={
              <LetterWriter
                user={user}
                onSaveLetter={(letter) => setLetters((p) => [...p, letter])}
              />
            }
          />
          <Route path="/journal" element={<GuidedJournal user={user} />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<div className="p-6">Not Found</div>} />
      </Route>
    </Routes>
  )
}
