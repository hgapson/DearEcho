// src/App.tsx
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import AppRoutes from './AppRoutes';
import type { User, MoodEntry, Letter } from './types';

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [letters, setLetters] = useState<Letter[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) setDarkMode(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setUser({
          id: fbUser.uid,
          name: fbUser.displayName ?? fbUser.email?.split('@')[0] ?? 'User',
          email: fbUser.email ?? '',
        });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setInitializing(false);
    });
    return () => unsub();
  }, []);

  if (initializing) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-sm text-gray-500">Loading…</div>
      </div>
    );
  }

  return (
    <AppRoutes
      isAuthenticated={isAuthenticated}
      user={user}
      darkMode={darkMode}
      onToggleDarkMode={() => setDarkMode((d) => !d)}
      onLogout={() => auth.signOut()}
      onLogin={(u) => {
        // if you still call onLogin from AuthPage, keep this
        setUser(u);
        setIsAuthenticated(true);
      }}
      onAddMood={(m) => setMoodEntries((prev) => [m, ...prev])}
      onAddLetter={(l) => setLetters((prev) => [l, ...prev])}
    />
  );
}
