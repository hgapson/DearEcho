'use client'

import { NavLink, Link } from 'react-router-dom'
import type { User } from '../types'

type Props = {
  isAuthenticated: boolean
  user: User | null
  darkMode: boolean
  onToggleDarkMode: () => void
  onLogout: () => void
}

export function Navigation({
  isAuthenticated,
  user,
  darkMode,
  onToggleDarkMode,
  onLogout,
}: Props) {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
    }`

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="font-semibold text-lg">
          DearEcho
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/journal" className={linkClass}>
            Journal
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink to="/mood" className={linkClass}>
                Mood
              </NavLink>
              <NavLink to="/letter" className={linkClass}>
                Letters
              </NavLink>
              <button
                onClick={onLogout}
                className="ml-2 px-3 py-2 rounded-md text-sm bg-gray-200 hover:bg-gray-300"
              >
                Logout {user ? `(${user.name})` : ''}
              </button>
            </>
          ) : (
            <NavLink to="/auth" className={linkClass}>
              Login
            </NavLink>
          )}

          <button
            onClick={onToggleDarkMode}
            className="ml-2 px-3 py-2 rounded-md text-sm border"
            aria-label="Toggle dark mode"
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </nav>
      </div>
    </header>
  )
}
