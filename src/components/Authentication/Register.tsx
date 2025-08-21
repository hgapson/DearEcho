'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../../firebase';

// Optional Firestore profile write (remove if not used)
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

interface PasswordRequirements {
  hasMinLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

function checkPassword(password: string): PasswordRequirements {
  return {
    hasMinLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]/.test(password),
  };
}

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {met ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <AlertCircle className="h-4 w-4 text-gray-400" />}
      <span className={met ? 'text-green-600' : 'text-gray-500'}>{text}</span>
    </div>
  );
}

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onField =
    (k: 'name' | 'email' | 'password' | 'confirm') =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const req = useMemo(() => checkPassword(form.password), [form.password]);
  const isPasswordValid = useMemo(() => Object.values(req).every(Boolean), [req]);
  const passwordsMatch = form.password.length > 0 && form.password === form.confirm;

  const canSubmit =
    !!form.name.trim() &&
    /\S+@\S+\.\S+/.test(form.email) &&
    isPasswordValid &&
    passwordsMatch &&
    !loading;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) {
      toast.error('Please complete all fields correctly.');
      return;
    }
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(cred.user, { displayName: form.name });

      // Optional profile doc
      try {
        await setDoc(doc(db, 'users', cred.user.uid), {
          name: form.name,
          email: cred.user.email,
          createdAt: serverTimestamp(),
          role: 'user',
        });
      } catch (err) {
        console.warn('Firestore write skipped/blocked:', err);
      }

      // Important: sign out, then go to /auth with login tab
      await auth.signOut();
      toast.success('Account created! Please sign in.');
      navigate('/auth', { replace: true, state: { justRegistered: true } });
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'code' in err) {
        const fb = err as FirebaseError;
        const msg =
          fb.code === 'auth/email-already-in-use'
            ? 'An account with this email already exists.'
            : 'Registration failed. Please try again.';
        toast.error(msg);
      } else {
        toast.error('Unexpected error during registration.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Heading */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-3 shadow-lg">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-semibold">Create your account</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="reg-name">Full Name</Label>
          <Input
            id="reg-name"
            type="text"
            placeholder="Your full name"
            value={form.name}
            onChange={onField('name')}
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="reg-email">Email Address</Label>
          <Input
            id="reg-email"
            type="email"
            placeholder="your.email@example.com"
            value={form.email}
            onChange={onField('email')}
            autoComplete="email"
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="reg-password">Password</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="reg-password"
              type={showPw ? 'text' : 'password'}
              placeholder="Choose a strong password"
              value={form.password}
              onChange={onField('password')}
              className="pl-10 pr-10"
              autoComplete="new-password"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
              onClick={() => setShowPw((s) => !s)}
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>

          {/* Password requirements */}
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200 space-y-1">
            <p className="text-sm font-medium text-gray-700">Password must contain:</p>
            <PasswordRequirement met={req.hasMinLength} text="At least 8 characters" />
            <PasswordRequirement met={req.hasUpperCase} text="One uppercase letter" />
            <PasswordRequirement met={req.hasLowerCase} text="One lowercase letter" />
            <PasswordRequirement met={req.hasNumber} text="One number" />
            <PasswordRequirement met={req.hasSpecialChar} text="One special character" />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="reg-confirm">Confirm Password</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="reg-confirm"
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={form.confirm}
              onChange={onField('confirm')}
              className="pl-10 pr-10"
              autoComplete="new-password"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
              onClick={() => setShowConfirm((s) => !s)}
              aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          {form.confirm.length > 0 && !passwordsMatch && (
            <p className="text-red-500 text-sm">Passwords do not match</p>
          )}
        </div>

        <Button type="submit" disabled={!canSubmit} className="w-full">
          {loading ? 'Creating…' : 'Create Account'}
        </Button>
      </form>
    </div>
  );
}
