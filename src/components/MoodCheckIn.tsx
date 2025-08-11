'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Textarea } from './ui/textarea'
// import { Badge } from './ui/badge'
import { Slider } from './ui/slider'
import {
  Heart,
  Calendar,
  Save,
  Sparkles,
  TrendingUp,
  Brain,
  Smile,
  Moon,
  Sun,
} from 'lucide-react'
import { toast } from 'sonner'
import type { MoodEntry, User } from '../types'   // 👈 fixed

interface MoodCheckInProps {
  user: User | null
  onMoodEntry: (entry: MoodEntry) => void
}

export function MoodCheckIn({ user, onMoodEntry }: MoodCheckInProps) {
  const [moodValue, setMoodValue] = useState<number[]>([5])
  const [selectedEmotion, setSelectedEmotion] = useState<string>('')
  const [note, setNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const emotions = [
    { id: 'happy', label: 'Happy', emoji: '😊', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'excited', label: 'Excited', emoji: '🤩', color: 'bg-orange-100 text-orange-700' },
    { id: 'grateful', label: 'Grateful', emoji: '🙏', color: 'bg-green-100 text-green-700' },
    { id: 'peaceful', label: 'Peaceful', emoji: '😌', color: 'bg-blue-100 text-blue-700' },
    { id: 'content', label: 'Content', emoji: '😊', color: 'bg-teal-100 text-teal-700' },
    { id: 'neutral', label: 'Neutral', emoji: '😐', color: 'bg-gray-100 text-gray-700' },
    { id: 'tired', label: 'Tired', emoji: '😴', color: 'bg-purple-100 text-purple-700' },
    { id: 'stressed', label: 'Stressed', emoji: '😰', color: 'bg-red-100 text-red-700' },
    { id: 'anxious', label: 'Anxious', emoji: '😟', color: 'bg-orange-100 text-orange-700' },
    { id: 'sad', label: 'Sad', emoji: '😢', color: 'bg-blue-100 text-blue-700' },
    { id: 'frustrated', label: 'Frustrated', emoji: '😤', color: 'bg-red-100 text-red-700' },
    { id: 'lonely', label: 'Lonely', emoji: '😔', color: 'bg-gray-100 text-gray-700' },
  ]

  const getMoodDescription = (v: number) =>
    v >= 9 ? 'Absolutely wonderful! ✨'
    : v >= 7 ? 'Really good! 😊'
    : v >= 5 ? 'Pretty okay 👍'
    : v >= 3 ? 'Could be better 😕'
    : 'Having a tough time 💙'

  const getMoodColor = (v: number) =>
    v >= 8 ? 'text-green-600'
    : v >= 6 ? 'text-blue-600'
    : v >= 4 ? 'text-yellow-600'
    : 'text-red-600'

  const handleSubmit = () => {
    if (!selectedEmotion) {
      toast.error("Please select how you're feeling")
      return
    }
    setIsSubmitting(true)

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      mood: moodValue[0],
      emotion: selectedEmotion,
      note: note.trim() || undefined,
    }

    setTimeout(() => {
      onMoodEntry(newEntry)
      toast.success('Mood tracked! Thank you for checking in with yourself 💙')
      setMoodValue([5])
      setSelectedEmotion('')
      setNote('')
      setIsSubmitting(false)
    }, 1000)
  }

  const getCurrentTime = () => {
    const hour = new Date().getHours()
    if (hour < 12) return { greeting: 'Good Morning', icon: Sun }
    if (hour < 17) return { greeting: 'Good Afternoon', icon: Sun }
    return { greeting: 'Good Evening', icon: Moon }
  }

  const { greeting, icon: TimeIcon } = getCurrentTime()

  return (
    <div className="min-h-screen pt-6 pb-20 px-4 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full mb-4 shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <TimeIcon className="w-5 h-5 text-gray-600" />
            <h1 className="text-3xl font-bold text-gray-900">{greeting}!</h1>
          </div>
          <p className="text-lg text-gray-600">
            How are you feeling today, {user?.name || 'friend'}?
          </p>
        </div>

        {/* Mood Slider */}
        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-pink-600" />
              Your Mood Level
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-6xl font-bold mb-2 ${getMoodColor(moodValue[0])}`}>
                {moodValue[0]}
              </div>
              <p className={`text-lg font-medium ${getMoodColor(moodValue[0])}`}>
                {getMoodDescription(moodValue[0])}
              </p>
            </div>

            <div className="px-4">
              <Slider
                value={moodValue}
                onValueChange={setMoodValue}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>1 - Very Low</span>
                <span>10 - Amazing</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emotion Selection */}
        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-600" />
              What emotion best describes your current state?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {emotions.map((emotion) => (
                <Button
                  key={emotion.id}
                  variant={selectedEmotion === emotion.id ? 'default' : 'outline'}
                  onClick={() => setSelectedEmotion(emotion.id)}
                  className={`h-auto p-4 flex flex-col items-center space-y-2 transition-all duration-200 ${
                    selectedEmotion === emotion.id
                      ? `${emotion.color} border-2 border-current shadow-lg transform scale-105`
                      : 'hover:scale-105 border-2 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl">{emotion.emoji}</span>
                  <span className="text-sm font-medium">{emotion.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Optional Note */}
        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
              Anything you'd like to share? (Optional)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="What's on your mind today? Share any thoughts, experiences, or reflections..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="resize-none border-2 border-gray-200 focus:border-blue-400 bg-white/50"
            />
            <p className="text-sm text-gray-500 mt-2">
              This is your private space - write freely and authentically
            </p>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !selectedEmotion}
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-8 py-4 font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:transform-none disabled:shadow-lg"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </div>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Mood Check-in
              </>
            )}
          </Button>
        </div>

        {/* Encouragement */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 max-w-md mx-auto">
            <Heart className="w-8 h-8 text-pink-500 mx-auto mb-3" />
            <p className="text-gray-700 leading-relaxed">
              Thank you for taking time to check in with yourself. Every moment of self-awareness is a step toward wellness.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Calendar className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Check-ins this week</p>
              <p className="text-2xl font-bold text-gray-800">5</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Smile className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Average mood</p>
              <p className="text-2xl font-bold text-gray-800">7.2</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
