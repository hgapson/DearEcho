'use client'

import { Button } from './ui/button'
import { Switch } from './ui/switch'
import {
  Home,
  Heart,
  PenTool,
  BookOpen,
  Palette,
  Music,
  User,
  LogOut,
  LogIn,
  Image,
  Quote,
  BarChart3,
  Settings,
  Moon,
  Sun,
  UserCircle,
} from 'lucide-react'
import { AppPage } from '../App'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface User {
  id: string
  name: string
  email: string
}

interface NavigationMenuProps {
  currentPage: AppPage
  onNavigate: (page: AppPage) => void
  user: User | null
  onLogout: () => void
  isAuthenticated: boolean
  darkMode: boolean
  onToggleDarkMode: () => void
}

export function NavigationMenu({
  currentPage,
  onNavigate,
  user,
  onLogout,
  isAuthenticated,
  darkMode,
  onToggleDarkMode,
}: NavigationMenuProps) {
  const navItems = [
    {
      id: 'welcome' as AppPage,
      icon: Home,
      label: 'Home',
      requiresAuth: false,
    },
    { id: 'mood' as AppPage, icon: Heart, label: 'Mood', requiresAuth: true },
    {
      id: 'letter' as AppPage,
      icon: PenTool,
      label: 'Letter',
      requiresAuth: true,
    },
    {
      id: 'journal' as AppPage,
      icon: BookOpen,
      label: 'Journal',
      requiresAuth: true,
    },
    {
      id: 'draw' as AppPage,
      icon: Palette,
      label: 'Draw',
      requiresAuth: false,
    },
  ]

  const secondaryItems = [
    {
      id: 'music' as AppPage,
      icon: Music,
      label: 'Music',
      requiresAuth: false,
    },
    {
      id: 'quotes' as AppPage,
      icon: Quote,
      label: 'Quotes',
      requiresAuth: false,
    },
    {
      id: 'gallery' as AppPage,
      icon: Image,
      label: 'Gallery',
      requiresAuth: true,
    },
    {
      id: 'analytics' as AppPage,
      icon: BarChart3,
      label: 'Analytics',
      requiresAuth: true,
    },
    {
      id: 'therapist' as AppPage,
      icon: UserCircle,
      label: 'Therapy',
      requiresAuth: false,
    },
  ]

  const handleNavigate = (pageId: AppPage, requiresAuth: boolean) => {
    if (requiresAuth && !isAuthenticated) {
      onNavigate('auth')
    } else {
      onNavigate(pageId)
    }
  }

  // Hide navigation for letter writing page and welcome page to keep them clean
  if (currentPage === 'letter' || currentPage === 'welcome') {
    return null
  }

  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50 transition-colors duration-300">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <div
              className="text-xl font-bold text-gray-900 cursor-pointer"
              onClick={() => onNavigate('welcome')}
            >
              DearEcho
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4 text-gray-600" />
              <Switch
                checked={darkMode}
                onCheckedChange={onToggleDarkMode}
                className="data-[state=checked]:bg-blue-600"
              />
              <Moon className="w-4 h-4 text-gray-600" />
            </div>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 hover:bg-gray-100"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem disabled>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user?.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {user?.email}
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {secondaryItems.map((item) => {
                    const Icon = item.icon
                    const isDisabled = item.requiresAuth && !isAuthenticated
                    return (
                      <DropdownMenuItem
                        key={item.id}
                        onClick={() =>
                          handleNavigate(item.id, item.requiresAuth)
                        }
                        disabled={isDisabled}
                        className="cursor-pointer"
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        <span>{item.label}</span>
                        {isDisabled && (
                          <div className="ml-auto w-2 h-2 bg-yellow-500 rounded-full"></div>
                        )}
                      </DropdownMenuItem>
                    )
                  })}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onNavigate('profile')}
                    className="cursor-pointer"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={onLogout}
                    className="cursor-pointer text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('auth')}
                className="flex items-center space-x-2 hover:bg-gray-100"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 z-50 transition-colors duration-300">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            const isDisabled = item.requiresAuth && !isAuthenticated

            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                disabled={isDisabled}
                className={`flex flex-col items-center space-y-1 py-3 px-4 relative transition-all duration-200 ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                } ${isDisabled ? 'opacity-50' : ''}`}
                onClick={() => handleNavigate(item.id, item.requiresAuth)}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'fill-current' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
                {item.requiresAuth && !isAuthenticated && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full shadow-sm"></div>
                )}
                {isActive && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </Button>
            )
          })}
        </div>
      </div>
    </>
  )
}
