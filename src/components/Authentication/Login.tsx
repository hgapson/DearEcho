'use client';

import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';

import type { User as AppUser } from '../../types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../../firebase';

type LocationState = { from?: { pathname?: string } } | null;

function isFirebaseError(err: unknown): err is FirebaseError {
  return typeof err === 'object' && err !== null && 'code' in err;
}

function errorMessage(code: string | undefined, fallback: string) {
  switch (code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please try again.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait and try again.';
    case 'auth/popup-blocked':
      return 'Popup blocked by browser. Allow popups for this site.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed before completion.';
    default:
      return fallback;
  }
}

export default function Login({ onLogin }: { onLogin: (user: AppUser) => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const from = state?.from?.pathname ?? '/';

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });

  const onField =
    (key: 'email' | 'password') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      if (fieldErrors[key]) setFieldErrors((p) => ({ ...p, [key]: '' }));
    };

  const validate = () => {
    const next = { email: '', password: '' };
    let ok = true;
    if (!form.email.trim()) {
      next.email = 'Email is required';
      ok = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      next.email = 'Please enter a valid email address';
      ok = false;
    }
    if (!form.password.trim()) {
      next.password = 'Password is required';
      ok = false;
    }
    setFieldErrors(next);
    return ok;
  };

  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, form.email, form.password);
      const safeEmail = user.email ?? '';
      const friendly = user.displayName || (safeEmail ? safeEmail.split('@')[0] : 'User');

      const normalized: AppUser = { id: user.uid, name: friendly, email: safeEmail };
      onLogin(normalized);
      toast.success('Welcome back to DearEcho! 💙');
      navigate(from, { replace: true });
    } catch (err: unknown) {
      if (isFirebaseError(err)) {
        const msg = errorMessage(err.code, 'Login failed. Please try again.');
        toast.error(msg);
        if (err.code === 'auth/user-not-found') setFieldErrors((p) => ({ ...p, email: 'No account with this email' }));
        if (err.code === 'auth/wrong-password') setFieldErrors((p) => ({ ...p, password: 'Incorrect password' }));
      } else {
        toast.error('Unexpected error during login.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setIsGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const { user } = await signInWithPopup(auth, provider);

      const safeEmail = user.email ?? '';
      const friendly = user.displayName || (safeEmail ? safeEmail.split('@')[0] : 'User');
      const normalized: AppUser = { id: user.uid, name: friendly, email: safeEmail };

      onLogin(normalized);
      toast.success('Signed in with Google! ✨');
      navigate(from, { replace: true });
    } catch (err: unknown) {
      if (isFirebaseError(err)) toast.error(errorMessage(err.code, 'Google sign-in failed.'));
      else toast.error('Unexpected error during Google sign-in.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Heading */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-3 shadow-lg">
          <LogIn className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-semibold">Sign in to continue</h2>
      </div>

      <form onSubmit={handleEmailLogin} className="space-y-4">
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
          {fieldErrors.email && <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>}
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
          {fieldErrors.password && <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Signing In…' : 'Sign In to DearEcho'}
        </Button>
      </form>

      {/* Or Divider */}
      <div className="my-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-800" />
        <span className="text-xs text-gray-500">or</span>
        <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-800" />
      </div>

      {/* Google */}
      <Button
        type="button"
        variant="outline"
        disabled={isGoogleLoading}
        className="w-full flex items-center justify-center gap-2"
        onClick={handleGoogle}
      >
        {isGoogleLoading ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-800" />
            Signing in with Google…
          </>
        ) : (
          <>
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </>
        )}
      </Button>
    </div>
  );
}
