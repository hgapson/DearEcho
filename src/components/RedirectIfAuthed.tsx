'use client'

import type { ReactElement } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function RedirectIfAuthed({
  isAuthenticated,
  to = '/',
  children,
}: {
  isAuthenticated: boolean
  to?: string
  children?: ReactElement
}) {
  const location = useLocation()
  if (isAuthenticated) {
    return <Navigate to={to} replace state={{ from: location }} />
  }
  return children ?? <Outlet />
}
