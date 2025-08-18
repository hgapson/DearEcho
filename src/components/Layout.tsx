// src/components/Layout.tsx
'use client'

import { Outlet } from 'react-router-dom'
import { Navigation } from './Navigation'
import { Footer } from './Footer'            // ✅ keep this import
import type { User } from '../types'

interface Props {
  isAuthenticated: boolean
  user: User | null
  onLogout: () => void
  darkMode: boolean
  onToggleDarkMode: () => void
}

export function Layout({
  isAuthenticated,
  user,
  onLogout,
  darkMode,
  onToggleDarkMode,
}: Props) {
  return (
    <div className={`min-h-screen bg-background ${darkMode ? 'dark' : ''}`}>
      <Navigation
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={onLogout}
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
      />
      <main className="pt-16 pb-8">
        <Outlet />
      </main>
      <Footer />                               {/* ✅ use the imported Footer */}
    </div>
  )
}
