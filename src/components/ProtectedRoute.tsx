'use client'

import { Navigate, Outlet, useLocation } from 'react-router-dom'

interface Props {
  isAuthenticated: boolean
  redirectTo?: string
}

export default function ProtectedRoute({ isAuthenticated, redirectTo = '/auth' }: Props) {
  const location = useLocation()
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />
  }
  return <Outlet />
}
