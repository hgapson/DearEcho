'use client'

import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Smartphone, Heart, BookOpen, LogIn, ArrowRight } from 'lucide-react'
import type { User } from '../types'

interface Props { user: User | null }

export function WelcomeScreen({ user }: Props) {
  const navigate = useNavigate()

  const features = [
    { icon: Smartphone, title: 'Welcome', desc: 'Start your journey.', to: '/' },
    { icon: Heart, title: 'Mood Check-In', desc: 'Track your emotional state.', to: '/mood' },
    { icon: BookOpen, title: 'Guided Journal', desc: 'Write with structure.', to: '/journal' },
    { icon: LogIn, title: 'Login / Sign Up', desc: 'Create an account or login.', to: '/auth' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">DearEcho</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your companion for emotional clarity and connection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((f) => {
            const Icon = f.icon
            if (f.to === '/auth' && user) return null
            return (
              <Card
                key={f.title}
                onClick={() => navigate(f.to)}
                className="bg-white border-0 shadow-sm hover:shadow-md transition cursor-pointer group"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition">
                    <Icon className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{f.title}</h3>
                  <p className="text-gray-600">{f.desc}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {user && (
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md mx-auto">
              <h3 className="text-2xl font-semibold mb-4">Welcome back, {user.name}!</h3>
              <p className="text-gray-600 mb-6">Continue your wellness journey</p>
              <Button onClick={() => navigate('/mood')} className="bg-blue-600 text-white px-8 py-3 rounded-full inline-flex items-center gap-2">
                Start Today&apos;s Check-in
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
