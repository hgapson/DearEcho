'use client'

import { useMemo, useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import {
  BookOpen,
  Lightbulb,
  Target,
  Heart,
  RefreshCw,
  Save,
  Sparkles,
  Clock,
  ChevronRight,
} from 'lucide-react'
// at the top with other imports
import type { LucideIcon } from 'lucide-react'
import { toast } from 'sonner'
import type { User } from '../types'

interface GuidedJournalProps {
  user: User | null
}

type PromptCategory =
  | 'Gratitude'
  | 'Self-Reflection'
  | 'Growth'
  | 'Self-Compassion'
  | 'Future Self'

type PromptDef = {
  category: PromptCategory
  icon: LucideIcon                // ← use LucideIcon here
  color: string
  bgColor: string
  question: string
  subtext: string
}


const JOURNAL_PROMPTS: PromptDef[] = [
  {
    category: 'Gratitude',
    icon: Heart,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
    question: "What are three things you're grateful for today?",
    subtext:
      'Even small moments of appreciation can shift our perspective toward positivity.',
  },
  {
    category: 'Self-Reflection',
    icon: Lightbulb,
    color: 'from-yellow-500 to-orange-600',
    bgColor: 'bg-yellow-50',
    question:
      'What emotion did you feel most strongly today, and what might have triggered it?',
    subtext:
      'Understanding our emotional patterns helps us respond more mindfully.',
  },
  {
    category: 'Growth',
    icon: Target,
    color: 'from-green-500 to-teal-600',
    bgColor: 'bg-green-50',
    question:
      "What's one small step you could take tomorrow toward feeling better?",
    subtext:
      'Progress comes from small, consistent actions that build over time.',
  },
  {
    category: 'Self-Compassion',
    icon: Sparkles,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50',
    question:
      'What would you say to comfort a dear friend who was feeling the way you feel right now?',
    subtext:
      'We often have more compassion for others than ourselves. Practice extending that kindness inward.',
  },
  {
    category: 'Future Self',
    icon: Clock,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50',
    question:
      'What do you hope to remember about today when you look back on it?',
    subtext:
      'Creating meaning from our experiences helps us find purpose in both challenges and joys.',
  },
]

export function GuidedJournal({ user }: GuidedJournalProps) {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [responses, setResponses] = useState<Record<number, string>>({})
  const [isCompleted, setIsCompleted] = useState(false)

  const total = JOURNAL_PROMPTS.length
  const currentPrompt = useMemo(
    () => JOURNAL_PROMPTS[currentPromptIndex],
    [currentPromptIndex]
  )
  const Icon = currentPrompt.icon

  const handleResponseChange = (value: string) => {
    setResponses((prev) => ({ ...prev, [currentPromptIndex]: value }))
  }

  const goToNextPrompt = () => {
    if (!responses[currentPromptIndex]?.trim()) {
      toast.message('Take a moment to jot a few words 🙂')
      return
    }
    if (currentPromptIndex < total - 1) {
      setCurrentPromptIndex((prev) => prev + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const goToPreviousPrompt = () => {
    if (currentPromptIndex > 0) setCurrentPromptIndex((prev) => prev - 1)
  }

  const saveJournalEntry = () => {
    const completed = Object.values(responses).filter(Boolean).length
    toast.success(
      `Journal entry saved! You completed ${completed} of ${total} prompts. 💙`
    )
    // TODO: persist to API/localStorage here if desired
    setResponses({})
    setCurrentPromptIndex(0)
    setIsCompleted(false)
  }

  const getRandomPrompt = () => {
    if (total <= 1) return
    let next = Math.floor(Math.random() * total)
    if (next === currentPromptIndex) {
      next = (next + 1) % total
    }
    setCurrentPromptIndex(next)
    setIsCompleted(false)
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen pt-6 pb-20 px-4 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full mb-6 shadow-xl">
            <Sparkles className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Beautiful Work{user ? `, ${user.name}` : ''}!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            You’ve completed your guided journal session. Take a moment to
            appreciate this time you’ve given yourself.
          </p>

          <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-8">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Your Responses Summary
              </h3>
              <div className="space-y-4 text-left">
                {JOURNAL_PROMPTS.map(
                  (prompt, index) =>
                    responses[index]?.trim() && (
                      <div
                        key={index}
                        className="border-l-4 border-blue-300 pl-4"
                      >
                        <p className="font-medium text-gray-700 mb-1">
                          {prompt.question}
                        </p>
                        <p className="text-gray-600 text-sm whitespace-pre-wrap">
                          {responses[index]}
                        </p>
                      </div>
                    )
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Button
              onClick={saveJournalEntry}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-4 font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Journal Entry
            </Button>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  setCurrentPromptIndex(0)
                  setIsCompleted(false)
                }}
                variant="outline"
                className="px-6 py-3 rounded-xl border-2 border-gray-200 hover:bg-gray-50"
              >
                Start Over
              </Button>

              <Button
                onClick={getRandomPrompt}
                variant="outline"
                className="px-6 py-3 rounded-xl border-2 border-gray-200 hover:bg-gray-50"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Random Prompt
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-6 pb-20 px-4 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Guided Journal
          </h1>
          <p className="text-lg text-gray-600">
            Thoughtful prompts to help you explore your inner world
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8" aria-label="progress">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm text-gray-600">
              {currentPromptIndex + 1} of {total}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentPromptIndex + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Prompt */}
        <Card
          className={`shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-6 ${currentPrompt.bgColor} border-l-4 border-l-current`}
        >
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${currentPrompt.color} rounded-full shadow-lg`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <Badge
                  className={`${currentPrompt.bgColor} text-gray-700 border-0 mb-2`}
                >
                  {currentPrompt.category}
                </Badge>
                <CardTitle className="text-xl text-gray-800">
                  {currentPrompt.question}
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {currentPrompt.subtext}
            </p>

            <Textarea
              placeholder="Take your time... there's no right or wrong answer. Write from your heart."
              value={responses[currentPromptIndex] ?? ''}
              onChange={(e) => handleResponseChange(e.target.value)}
              rows={6}
              className="resize-none border-2 border-gray-200 focus:border-indigo-400 bg-white/50 text-base leading-relaxed"
            />

            <p className="text-sm text-gray-500 mt-2">
              💭 Let your thoughts flow naturally — this is your safe space for
              reflection.
            </p>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <Button
            onClick={goToPreviousPrompt}
            disabled={currentPromptIndex === 0}
            variant="outline"
            className="px-6 py-3 rounded-xl border-2 border-gray-200 hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </Button>

          <div className="flex space-x-2">
            <Button
              onClick={getRandomPrompt}
              variant="outline"
              size="sm"
              className="px-4 py-2 rounded-lg border-2 border-gray-200 hover:bg-gray-50"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Random
            </Button>
          </div>

          <Button
            onClick={goToNextPrompt}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            {currentPromptIndex === total - 1 ? 'Complete' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* All Prompts Preview */}
        <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">All Journal Prompts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {JOURNAL_PROMPTS.map((prompt, index) => {
                const PromptIcon = prompt.icon
                const answered = Boolean(responses[index]?.trim())
                const isCurrent = index === currentPromptIndex

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentPromptIndex(index)}
                    className={`w-full text-left flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                      isCurrent
                        ? 'bg-indigo-100 border-2 border-indigo-300'
                        : answered
                        ? 'bg-green-50 border-2 border-green-200'
                        : 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCurrent
                          ? 'bg-indigo-500'
                          : answered
                          ? 'bg-green-500'
                          : 'bg-gray-400'
                      }`}
                    >
                      <PromptIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {prompt.category}
                      </p>
                      <p className="text-xs text-gray-600 line-clamp-1">
                        {prompt.question}
                      </p>
                    </div>
                    {answered && (
                      <Sparkles className="w-4 h-4 text-green-500" />
                    )}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
