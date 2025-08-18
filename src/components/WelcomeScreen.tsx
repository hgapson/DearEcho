'use client'

import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import {
  Smartphone,
  Heart,
  BookOpen,
  Palette,
  Music,
  LogIn,
  ArrowRight,
} from 'lucide-react'
import type { AppPage, User } from '../types';

interface WelcomeScreenProps {
  user: User | null
  onNavigate: (page: AppPage) => void
}

export function WelcomeScreen({ user, onNavigate }: WelcomeScreenProps) {
  const features = [
    {
      icon: Smartphone,
      title: 'Welcome Screen',
      description:
        'Start your emotional wellness journey with an inviting welcome screen.',
      action: () => onNavigate('welcome'),
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: Heart,
      title: 'Mood Check-In',
      description: 'Track your emotional state in real time.',
      action: () => onNavigate('mood'),
      color: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      icon: BookOpen,
      title: 'Guided Journal',
      description:
        'Write through your thoughts and feelings with structured support.',
      action: () => onNavigate('journal'),
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      icon: Palette,
      title: 'Draw Your Emotions',
      description: 'Visualize how you feel using our drawing tool.',
      action: () => onNavigate('draw'),
      color: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
    },
    {
      icon: Music,
      title: 'Music by Emotion',
      description: 'Listen to curated tracks that resonate with your mood.',
      action: () => onNavigate('music'),
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      icon: LogIn,
      title: 'Login / Sign Up',
      description: 'Get started by creating an account or logging in.',
      action: () => onNavigate('auth'),
      color: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">DearEcho</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your companion for emotional clarity and connection.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon

            // Don't show login card if user is already authenticated
            if (feature.title === 'Login / Sign Up' && user) {
              return null
            }

            return (
              <Card
                key={index}
                className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
                onClick={feature.action}
              >
                <CardContent className="p-8 text-center">
                  {/* Icon/Illustration Area */}
                  <div
                    className={`w-24 h-24 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-200`}
                  >
                    <Icon className={`w-10 h-10 ${feature.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action for Authenticated Users */}
        {user && (
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Welcome back, {user.name}!
              </h3>
              <p className="text-gray-600 mb-6">
                Continue your emotional wellness journey
              </p>
              <Button
                onClick={() => onNavigate('mood')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium inline-flex items-center gap-2"
              >
                Start Today's Check-in
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Footer */}
      </div>
    </div>
  )
}
