'use client';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';
import { Button } from '../ui/button';
import { LogIn, UserPlus } from 'lucide-react';
import type { User as AppUser } from '../../types';

type Tab = 'login' | 'register';
type LocationState = { justRegistered?: boolean } | null;

export function AuthPage({ onLogin }: { onLogin: (user: AppUser) => void }) {
  const location = useLocation();
  const state = location.state as LocationState;
  const [tab, setTab] = useState<Tab>('login');

  useEffect(() => {
    if (state?.justRegistered) {
      setTab('login');
      // Remove the flag so it doesn't persist on back/forward
      window.history.replaceState({}, document.title);
    }
  }, [state?.justRegistered]);

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-gray-200 dark:border-neutral-800 overflow-hidden">
        <div className="px-6 pt-6 pb-4 text-center">
          <h1 className="text-2xl font-semibold">DearEcho</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {tab === 'login' ? 'Sign in to continue your journey' : 'Create your account to get started'}
          </p>
        </div>

        <div className="px-6">
          <div className="grid grid-cols-2 gap-2 bg-gray-100 dark:bg-neutral-800 p-1 rounded-lg">
            <Button
              type="button"
              variant={tab === 'login' ? 'default' : 'ghost'}
              className={`w-full ${tab === 'login' ? '' : 'bg-transparent'}`}
              onClick={() => setTab('login')}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button
              type="button"
              variant={tab === 'register' ? 'default' : 'ghost'}
              className={`w-full ${tab === 'register' ? '' : 'bg-transparent'}`}
              onClick={() => setTab('register')}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Register
            </Button>
          </div>
        </div>

        <div className="px-6 py-6">
          {tab === 'login' ? <Login onLogin={onLogin} /> : <Register />}
        </div>
      </div>
    </div>
  );
}
