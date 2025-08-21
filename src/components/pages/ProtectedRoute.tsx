'use client';

import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute({
  isAuthenticated,
  redirectTo = '/auth',
}: {
  isAuthenticated: boolean;
  redirectTo?: string;
}) {
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }
  return <Outlet />;
}
