'use client';

import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation, type Location } from 'react-router-dom';
import { signInWithEmailAndPassword, type AuthError } from 'firebase/auth';
import { auth } from '../../firebase';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import type { User } from '../../types';

type LocationState = { from?: Location } | null;
const isAuthError = (e: unknown): e is AuthError => !!e && typeof e === 'object' && 'code' in e;

export function Login({ onLogin }: { onLogin: (user: User) => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const from = state?.from?.pathname ?? '/';

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, form.email, form.password);
      const safeEmail = user.email ?? '';
      const normalized: User = {
        id: user.uid,
        name: user.displayName ?? (safeEmail ? safeEmail.split('@')[0] : 'User'),
        email: safeEmail,
      };
      onLogin(normalized);
      toast.success('Welcome back! 💙');
      navigate(from, { replace: true });
    } catch (err) {
      if (isAuthError(err)) {
        toast.error(err.message);
      } else {
        toast.error('Login failed, please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email Address</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            id="login-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            className="pl-10 pr-10"
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
        {isLoading ? 'Signing in…' : 'Sign In'}
      </Button>
    </form>
  );
}
