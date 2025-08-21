'use client'

import { useState, type FormEvent } from 'react'
import { useNavigate, useLocation, type Location } from 'react-router-dom'
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from '../../firebase'
import { Button, Input, Label } from '../ui/Ui' // ⬅️ change to your actual paths
import { toast } from 'sonner'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import type { User } from '../../types' // ⬅️ use your types

type LocationState = { from?: Location } | null

export function Login({ onLogin }: { onLogin: (user: User) => void }) {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState
  // Where to go after login (defaults to home)
  const from = state?.from?.pathname ?? '/'

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const ENABLE_GOOGLE = true

  const onField = (key: 'email' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const errorMessage = (code: string, fallback: string) => {
    switch (code) {
      case 'auth/invalid-email':
        return 'Please enter a valid email address.'
      case 'auth/user-disabled':
        return 'This account has been disabled.'
      case 'auth/user-not-found':
        return 'No account found with that email.'
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.'
      case 'auth/too-many-requests':
        return 'Too many attempts. Please wait a moment and try again.'
      default:
        return fallback
    }
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.email.trim() || !form.password.trim()) {
      toast.error('Please fill in all fields')
      return
    }
    setIsLoading(true)
    try {
      const { user } = await signInWithEmailAndPassword(auth, form.email, form.password)

      const safeEmail = user.email ?? ''
      const friendlyName = user.displayName || (safeEmail ? safeEmail.split('@')[0] : 'User')

      const normalizedUser: User = {
        id: user.uid,
        name: friendlyName,
        email: safeEmail,
        // if your User type doesn’t include these, remove them:
        // joinDate: user.metadata?.creationTime ?? new Date().toISOString(),
        // userType: 'user' as const,
      }

      onLogin(normalizedUser)
      toast.success('Welcome back to DearEcho! 💙')
      navigate(from, { replace: true })
    } catch (err: any) {
      const msg = errorMessage(err?.code, err?.message || 'Login failed')
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogle = async () => {
    setIsLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const { user } = await signInWithPopup(auth, provider)

      const safeEmail = user.email ?? ''
      const friendlyName = user.displayName || (safeEmail ? safeEmail.split('@')[0] : 'User')

      const normalizedUser: User = {
        id: user.uid,
        name: friendlyName,
        email: safeEmail,
      }

      onLogin(normalizedUser)
      toast.success('Signed in with Google! ✨')
      navigate(from, { replace: true })
    } catch (err: any) {
      const msg = errorMessage(err?.code, err?.message || 'Google sign-in failed')
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="login-email">Email Address</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            id="login-email"
            type="email"
            placeholder="your.email@example.com"
            value={form.email}
            onChange={onField('email')}
            className="pl-10"
            autoComplete="email"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={form.password}
            onChange={onField('password')}
            className="pl-10 pr-10"
            autoComplete="current-password"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Signing In...' : 'Sign In to DearEcho'}
      </Button>

      {ENABLE_GOOGLE && (
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          className="w-full"
          onClick={handleGoogle}
        >
          Continue with Google
        </Button>
      )}
    </form>
  )
}
