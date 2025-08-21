'use client'

import { Outlet } from 'react-router-dom'
import { Navigation } from './Navigation'
import { Footer } from './Footer'
import type { User } from '../../types'

type Props = {
  isAuthenticated: boolean
  user: User | null
  darkMode: boolean
  onToggleDarkMode: () => void
  onLogout: () => void
}

export function Layout({
  isAuthenticated,
  user,
  darkMode,
  onToggleDarkMode,
  onLogout,
}: Props) {
  return (
    <div className={`flex min-h-screen flex-col ${darkMode ? 'dark' : ''}`}>
      <Navigation
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={onLogout}
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
      />
      <main className="flex-1 pt-16 pb-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
