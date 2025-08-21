'use client'

import { useEffect, useState } from 'react'
import AppRoutes from './AppRoutes'

import type { User, MoodEntry, Letter } from './types'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [darkMode, setDarkMode] = useState(false)

  // Example local state holders for saved data
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
  const [letters, setLetters] = useState<Letter[]>([])

  useEffect(() => {
    const savedDark = localStorage.getItem('darkMode')
    if (savedDark !== null) setDarkMode(JSON.parse(savedDark))
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const handleLogin = (u: User) => {
    setUser(u)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AppRoutes
      isAuthenticated={isAuthenticated}
      user={user}
      darkMode={darkMode}
      onToggleDarkMode={() => setDarkMode((v) => !v)}
      onLogout={handleLogout}
      onLogin={handleLogin}
      onAddMood={(m) => setMoodEntries((prev) => [...prev, m])}
      onAddLetter={(l) => setLetters((prev) => [...prev, l])}
    />
  )
}