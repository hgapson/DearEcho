'use client'

import { useState, type FormEvent } from 'react'
import { useNavigate, useLocation, type Location } from 'react-router-dom'
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  type AuthError
} from 'firebase/auth'
import { auth } from '../../firebase'
import { Button } from '../ui/button'
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { toast } from 'sonner'
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react'
import type { User } from '../../types'

type LocationState = { from?: Location } | null

// Type guard to check if error is a Firebase AuthError
function isAuthError(error: unknown): error is AuthError {
  return typeof error === 'object' && error !== null && 'code' in error;
}

// Password requirements type
interface PasswordRequirements {
  hasMinLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export function Login({ onLogin }: { onLogin: (user: User) => void }) {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState
  const from = state?.from?.pathname ?? '/'

  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' })
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)

  const ENABLE_GOOGLE = true

  // Check password against security requirements
  const checkPasswordRequirements = (password: string): PasswordRequirements => {
    return {
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]/.test(password),
    };
  };

  const passwordRequirements = checkPasswordRequirements(form.password);
  const isPasswordValid = Object.values(passwordRequirements).every(req => req);

  const onField = (key: 'email' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
    // Clear field error when user starts typing
    if (fieldErrors[key]) {
      setFieldErrors(prev => ({ ...prev, [key]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = { email: '', password: '' }
    let isValid = true

    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address'
      isValid = false
    }

    if (!form.password.trim()) {
      newErrors.password = 'Password is required'
      isValid = false
    } else if (!isPasswordValid) {
      newErrors.password = 'Password does not meet security requirements'
      isValid = false
    }

    setFieldErrors(newErrors)
    return isValid
  }

  const errorMessage = (code: string | undefined, fallback: string) => {
    switch (code) {
      case 'auth/invalid-email':
        return 'Please enter a valid email address.'
      case 'auth/user-disabled':
        return 'This account has been disabled.'
      case 'auth/user-not-found':
        return 'No account found with this email address.'
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.'
      case 'auth/too-many-requests':
        return 'Too many attempts. Please wait a moment and try again.'
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please try again.'
      case 'auth/popup-blocked':
        return 'Popup blocked by browser. Please allow popups for this site.'
      case 'auth/popup-closed-by-user':
        return 'Sign-in popup was closed before completion.'
      default:
        return fallback
    }
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
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
      }

      onLogin(normalizedUser)
      toast.success('Welcome back to DearEcho! 💙')
      navigate(from, { replace: true })
    } catch (error: unknown) {
      console.error('Login error:', error)
      
      if (isAuthError(error)) {
        const msg = errorMessage(error.code, 'Login failed. Please check your credentials and try again.')
        toast.error(msg)
        
        // Set field-specific errors for better UX
        if (error.code === 'auth/user-not-found') {
          setFieldErrors(prev => ({ ...prev, email: 'No account found with this email' }))
        } else if (error.code === 'auth/wrong-password') {
          setFieldErrors(prev => ({ ...prev, password: 'Incorrect password' }))
        }
      } else {
        toast.error('An unexpected error occurred during login. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      
      // Add custom parameters if needed
      provider.setCustomParameters({
        prompt: 'select_account'
      })
      
      const result = await signInWithPopup(auth, provider)
      const user = result.user

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
    } catch (error: unknown) {
      console.error('Google sign-in error:', error)
      
      if (isAuthError(error)) {
        const msg = errorMessage(error.code, 'Google sign-in failed. Please try again.')
        toast.error(msg)
        
        // Special handling for popup issues
        if (error.code === 'auth/popup-blocked') {
          toast.info('Please allow popups for this site and try again.')
        }
      } else {
        toast.error('An unexpected error occurred during Google sign-in')
      }
    } finally {
      setIsGoogleLoading(false)
    }
  }

  // Password requirement component
  const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
    <div className="flex items-center gap-2">
      {met ? (
        <CheckCircle2 className="h-4 w-4 text-green-500" />
      ) : (
        <AlertCircle className="h-4 w-4 text-gray-400" />
      )}
      <span className={met ? 'text-green-600' : 'text-gray-500'}>{text}</span>
    </div>
  );

  const isSubmitDisabled = isLoading || Boolean(form.password && !isPasswordValid);

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
        {fieldErrors.email && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="login-password">Password</Label>
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-700"
            onClick={() => setShowPasswordRequirements(!showPasswordRequirements)}
          >
            {showPasswordRequirements ? 'Hide requirements' : 'View requirements'}
          </button>
        </div>
        
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={form.password}
            onChange={onField('password')}
            onFocus={() => setShowPasswordRequirements(true)}
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
        
        {/* Password requirements */}
        {showPasswordRequirements && form.password && (
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200 space-y-2">
            <p className="text-sm font-medium text-gray-700">Password must contain:</p>
            <div className="space-y-1">
              <PasswordRequirement 
                met={passwordRequirements.hasMinLength} 
                text="At least 8 characters" 
              />
              <PasswordRequirement 
                met={passwordRequirements.hasUpperCase} 
                text="One uppercase letter" 
              />
              <PasswordRequirement 
                met={passwordRequirements.hasLowerCase} 
                text="One lowercase letter" 
              />
              <PasswordRequirement 
                met={passwordRequirements.hasNumber} 
                text="One number" 
              />
              <PasswordRequirement 
                met={passwordRequirements.hasSpecialChar} 
                text="One special character" 
              />
            </div>
          </div>
        )}
        
        {fieldErrors.password && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
        )}
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitDisabled} 
        className="w-full"
      >
        {isLoading ? 'Signing In...' : 'Sign In to DearEcho'}
      </Button>

      {ENABLE_GOOGLE && (
        <Button
          type="button"
          variant="outline"
          disabled={isGoogleLoading}
          className="w-full flex items-center justify-center gap-2"
          onClick={handleGoogleSignIn}
        >
          {isGoogleLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-800" />
              Signing in with Google...
            </>
          ) : (
            <>
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </>
          )}
        </Button>
      )}
    </form>
  )
}