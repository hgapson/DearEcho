'use client'

import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Heart, Menu, X, LogIn, LogOut, Moon, Sun } from 'lucide-react'
import type { User } from '../types'

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(' ')
}

const NAV = [
  { to: '/', label: 'Welcome' },
  { to: '/mood', label: 'Mood' },
  { to: '/journal', label: 'Journal' },
  { to: '/letter', label: 'Letters' },
]

interface Props {
  isAuthenticated: boolean
  user: User | null
  onLogout?: () => void
  onToggleDarkMode?: () => void
  darkMode?: boolean
}

export function Navigation({
  isAuthenticated,
  user,
  onLogout,
  onToggleDarkMode,
  darkMode,
}: Props) {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 select-none">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-600 shadow">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-semibold">DearEcho</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2 rounded-md text-sm hover:bg-accent',
                    isActive && 'bg-secondary/60 font-medium'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            {onToggleDarkMode && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleDarkMode}
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}

            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground hidden lg:inline">
                  {user?.name}
                </span>
                <Button variant="outline" onClick={onLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button asChild>
                <Link to="/auth">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign in
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-3 pt-2 border-t">
            <nav className="flex flex-col">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'w-full text-left px-3 py-2 rounded-md',
                      isActive ? 'bg-secondary/60 font-medium' : 'hover:bg-accent'
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="mt-2 flex items-center gap-2 px-3">
                {onToggleDarkMode && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      onToggleDarkMode()
                      setOpen(false)
                    }}
                  >
                    {darkMode ? (
                      <>
                        <Sun className="h-4 w-4 mr-2" /> Light
                      </>
                    ) : (
                      <>
                        <Moon className="h-4 w-4 mr-2" /> Dark
                      </>
                    )}
                  </Button>
                )}

                {isAuthenticated ? (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      onLogout?.()
                      setOpen(false)
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <Button asChild className="flex-1" onClick={() => setOpen(false)}>
                    <Link to="/auth">
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign in
                    </Link>
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
