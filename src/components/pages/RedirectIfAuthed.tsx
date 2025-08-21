'use client';

import { Navigate, useLocation } from 'react-router-dom';
import type { PropsWithChildren } from 'react';

export default function RedirectIfAuthed({
  isAuthenticated,
  to = '/',
  children,
}: PropsWithChildren<{
  isAuthenticated: boolean;
  to?: string;
}>) {
  const location = useLocation();
  if (isAuthenticated) {
    // If already logged in, bounce away from /auth
    return <Navigate to={to} replace state={{ from: location }} />;
  }
  return <>{children}</>;
}
