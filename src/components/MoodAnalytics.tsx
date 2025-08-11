'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Heart,
  Smile,
  Target,
  Award,
  Clock,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { MoodEntry, User } from '../App'

interface MoodAnalyticsProps {
  user: User | null
  moodEntries: MoodEntry[]
}

export function MoodAnalytics({ user, moodEntries }: MoodAnalyticsProps) {
  const [timeRange, setTimeRange] = useState('week')

  // Mock data for demo
  const mockMoodData = [
    { date: 'Mon', mood: 7, emotion: 'happy' },
    { date: 'Tue', mood: 5, emotion: 'neutral' },
    { date: 'Wed', mood: 8, emotion: 'excited' },
    { date: 'Thu', mood: 6, emotion: 'calm' },
    { date: 'Fri', mood: 9, emotion: 'grateful' },
    { date: 'Sat', mood: 7, emotion: 'peaceful' },
    { date: 'Sun', mood: 8, emotion: 'content' },
  ]

  const emotionDistribution = [
    { name: 'Happy', value: 35, color: '#FFD700' },
    { name: 'Calm', value: 25, color: '#87CEEB' },
    { name: 'Grateful', value: 20, color: '#98FB98' },
    { name: 'Excited', value: 15, color: '#FF6347' },
    { name: 'Neutral', value: 5, color: '#D3D3D3' },
  ]

  const weeklyTrends = [
    { week: 'Week 1', avgMood: 6.2 },
    { week: 'Week 2', avgMood: 6.8 },
    { week: 'Week 3', avgMood: 7.1 },
    { week: 'Week 4', avgMood: 7.5 },
  ]

  const currentAverage = 7.2
  const lastWeekAverage = 6.8
  const improvementPercent = (
    ((currentAverage - lastWeekAverage) / lastWeekAverage) *
    100
  ).toFixed(1)

  if (!user) {
    return (
      <div className="min-h-screen pt-6 pb-20 px-4 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-gray-600">
            Please sign in to view your mood analytics.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-6 pb-20 px-4 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mood Analytics
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your emotional patterns and discover insights about your
            wellness journey.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {currentAverage}
              </h3>
              <p className="text-sm text-gray-600">Current Average</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-600">
                +{improvementPercent}%
              </h3>
              <p className="text-sm text-gray-600">This Week</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-3">
                <Smile className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Happy</h3>
              <p className="text-sm text-gray-600">Most Common</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">18</h3>
              <p className="text-sm text-gray-600">Day Streak</p>
            </CardContent>
          </Card>
        </div>

        {/* Time Range Filter */}
        <div className="mb-6">
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Time Range
                </h3>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">3 Months</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="daily" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm shadow-lg border-0">
            <TabsTrigger
              value="daily"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              Daily Mood
            </TabsTrigger>
            <TabsTrigger
              value="trends"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              Trends
            </TabsTrigger>
            <TabsTrigger
              value="distribution"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              Emotions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-4">
            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Daily Mood Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockMoodData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Bar
                        dataKey="mood"
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Mood Trends Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="avgMood"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-4">
            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-pink-600" />
                  Emotion Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={emotionDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name} ${value}%`}
                        >
                          {emotionDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3">
                    {emotionDistribution.map((emotion) => (
                      <div
                        key={emotion.name}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: emotion.color }}
                          ></div>
                          <span className="font-medium">{emotion.name}</span>
                        </div>
                        <Badge variant="secondary">{emotion.value}%</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Insights & Recommendations */}
        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-600" />
              Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">
                  Great Progress!
                </h4>
                <p className="text-sm text-green-700">
                  Your mood has improved by {improvementPercent}% this week.
                  Keep up the great work with your wellness routine!
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Pattern Detected
                </h4>
                <p className="text-sm text-blue-700">
                  You tend to feel happiest on Fridays. Consider what makes
                  Fridays special and try to incorporate those elements into
                  other days.
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">
                  Consistency Streak
                </h4>
                <p className="text-sm text-purple-700">
                  You've been tracking your mood for 18 days straight!
                  Consistency is key to understanding your emotional patterns.
                </p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">
                  Next Goal
                </h4>
                <p className="text-sm text-orange-700">
                  Try writing a letter to your future self about your current
                  progress. It can help maintain motivation!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
