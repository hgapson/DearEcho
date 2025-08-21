'use client'

import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import RedirectIfAuthed from './components/RedirectIfAuthed'
import { Layout } from './components/Layout'

import { AuthPage } from './components/AuthPage'
import { WelcomeScreen } from './components/WelcomeScreen'
import { MoodCheckIn } from './components/MoodCheckIn'
import { LetterWriter } from './components/LetterWriter'
import { GuidedJournal } from './components/GuidedJournal'

import type { User, MoodEntry, Letter } from './types'

type Props = {
  isAuthenticated: boolean
  user: User | null
  darkMode: boolean
  onToggleDarkMode: () => void
  onLogout: () => void
  onLogin: (u: User) => void
  onAddMood: (m: MoodEntry) => void
  onAddLetter: (l: Letter) => void
}

export default function AppRoutes({
  isAuthenticated,
  user,
  darkMode,
  onToggleDarkMode,
  onLogout,
  onLogin,
  onAddMood,
  onAddLetter,
}: Props) {
  return (
    <Routes>
      <Route
        element={
          <Layout
            isAuthenticated={isAuthenticated}
            user={user}
            darkMode={darkMode}
            onToggleDarkMode={onToggleDarkMode}
            onLogout={onLogout}
          />
        }
      >
        {/* Public */}
        <Route index element={<WelcomeScreen user={user} onNavigate={() => {}} />} />
        <Route
          path="/auth"
          element={
            <RedirectIfAuthed isAuthenticated={isAuthenticated} to="/">
              <AuthPage onLogin={onLogin} />
            </RedirectIfAuthed>
          }
        />

        {/* Protected */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route
            path="/mood"
            element={<MoodCheckIn user={user} onMoodEntry={onAddMood} />}
          />
          <Route
            path="/letter"
            element={<LetterWriter user={user} onSaveLetter={onAddLetter} />}
          />
          <Route path="/journal" element={<GuidedJournal user={user} />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<div className="p-6">Not Found</div>} />
      </Route>
    </Routes>
  )
}
