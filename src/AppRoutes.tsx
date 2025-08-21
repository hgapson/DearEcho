// src/AppRoutes.tsx
'use client';

import { Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/pages/ProtectedRoute';
import RedirectIfAuthed from './components/pages/RedirectIfAuthed';
import { Layout } from './components/pages/Layout';

import { AuthPage } from './components/pages/AuthPage';
import { WelcomeScreen } from './components/pages/WelcomeScreen';
import { MoodCheckIn } from './components/pages/MoodCheckIn';
import { LetterWriter } from './components/pages/LetterWriter';
import { GuidedJournal } from './components/pages/GuidedJournal';

import type { User, MoodEntry, Letter } from './types';

type Props = {
  isAuthenticated: boolean;
  user: User | null;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
  onLogin: (u: User) => void;
  onAddMood: (m: MoodEntry) => void;
  onAddLetter: (l: Letter) => void;
};

function Home({ user }: { user: User | null }) {
  const navigate = useNavigate();
  return (
    <WelcomeScreen
      user={user}
      onNavigate={(page) => {
        switch (page) {
          case 'welcome':
            navigate('/');
            break;
          case 'mood':
            navigate('/mood');
            break;
          case 'letter':
            navigate('/letter');
            break;
          case 'journal':
            navigate('/journal');
            break;
          case 'auth':
            navigate('/auth');
            break;
          default:
            navigate('/');
        }
      }}
    />
  );
}

export default function AppRoutes({
  isAuthenticated,
  user,
  darkMode,
  onToggleDarkMode,
  onLogout,
  onLogin,
  onAddMood,
  onAddLetter,
}: Props) {
  return (
    <Routes>
      <Route
        element={
          <Layout
            isAuthenticated={isAuthenticated}
            user={user}
            darkMode={darkMode}
            onToggleDarkMode={onToggleDarkMode}
            onLogout={onLogout}
          />
        }
      >
        <Route index element={<Home user={user} />} />

        <Route
          path="/auth"
          element={
            <RedirectIfAuthed isAuthenticated={isAuthenticated} to="/">
              <AuthPage onLogin={onLogin} />
            </RedirectIfAuthed>
          }
        />

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/mood" element={<MoodCheckIn user={user} onMoodEntry={onAddMood} />} />
          <Route path="/letter" element={<LetterWriter user={user} onSaveLetter={onAddLetter} />} />
          <Route path="/journal" element={<GuidedJournal user={user} />} />
        </Route>

        <Route path="*" element={<div className="p-6">Not Found</div>} />
      </Route>
    </Routes>
  );
}
