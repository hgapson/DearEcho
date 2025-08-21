'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Textarea } from './ui/textarea'
import { ArrowLeft, MoreHorizontal, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

// types
import type { Letter, User as UserType, MoodType } from '../types'

interface LetterWriterProps {
  user: UserType | null
  onSaveLetter: (letter: Letter) => void
}

type Step = 'mood' | 'prompt' | 'writing' | 'journal'

interface MoodOption {
  id: MoodType
  emoji: string
  label: string
  color: string
  bgColor: string
}

const MOOD_META: Record<MoodType, { emoji: string; color: string; label: string }> = {
  happy:   { emoji: '😊', color: 'text-yellow-600', label: 'Happy' },
  sad:     { emoji: '😢', color: 'text-blue-600',   label: 'Sad' },
  angry:   { emoji: '😠', color: 'text-red-600',    label: 'Angry' },
  anxious: { emoji: '😰', color: 'text-purple-600', label: 'Anxious' },
  lonely:  { emoji: '😔', color: 'text-gray-600',   label: 'Lonely' },
}

export function LetterWriter({ user, onSaveLetter }: LetterWriterProps) {
  const [currentStep, setCurrentStep] = useState<Step>('mood')
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null)
  const [letterContent, setLetterContent] = useState('')
  const [, setIsWriting] = useState(false) // only need setter

  // Demo previous letters
  const [previousLetters] = useState<Letter[]>([
    {
      id: '1',
      title: 'Happy',
      content: 'Dear Younger Me, you are amazing!',
      recipient: 'younger',
      mood: 'happy',
      date: '2024-05-03T10:00:00Z',
      isPrivate: true,
    },
    {
      id: '2',
      title: 'Lonely',
      content: 'I know it feels lonely sometimes...',
      recipient: 'younger',
      mood: 'lonely',
      date: '2024-04-17T14:30:00Z',
      isPrivate: true,
    },
    {
      id: '3',
      title: 'Anxious',
      content: 'Those anxious thoughts will pass...',
      recipient: 'younger',
      mood: 'anxious',
      date: '2024-04-17T09:15:00Z',
      isPrivate: true,
    },
    {
      id: '4',
      title: 'Sad',
      content: "It's okay to feel sad sometimes...",
      recipient: 'younger',
      mood: 'sad',
      date: '2024-04-09T16:45:00Z',
      isPrivate: true,
    },
  ])

  const moodOptions = [
    { id: 'happy',   emoji: '😊', label: 'Happy',   color: '#FFC107', bgColor: 'bg-yellow-100' },
    { id: 'sad',     emoji: '😢', label: 'Sad',     color: '#2196F3', bgColor: 'bg-blue-100' },
    { id: 'angry',   emoji: '😠', label: 'Angry',   color: '#F44336', bgColor: 'bg-red-100' },
    { id: 'anxious', emoji: '😰', label: 'Anxious', color: '#9C27B0', bgColor: 'bg-purple-100' },
  ] satisfies ReadonlyArray<MoodOption>

  type PromptMood = Exclude<MoodType, 'lonely'>

const prompts: Record<PromptMood, string> = {
  happy:
    'Write to your younger self about a moment when you felt truly happy. What would you want them to know about joy?',
  sad:
    'Write to your younger self about a time when you felt left out. What would you say to comfort them?',
  angry:
    'Write to your younger self about a time when you felt angry or frustrated. How would you help them handle those feelings?',
  anxious:
    'Write to your younger self about a time when you felt worried or anxious. What reassurance would you give them?',
}

  
  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood)
    setCurrentStep('prompt')
  }

  const handleStartWriting = () => {
    setCurrentStep('writing')
    setIsWriting(true)
  }

  const handleSaveLetter = () => {
    if (!selectedMood || !letterContent.trim()) {
      toast.error('Please write your letter')
      return
    }

    const newLetter: Letter = {
      id: Date.now().toString(),
      title: MOOD_META[selectedMood].label,
      content: letterContent.trim(),
      recipient: 'younger',
      mood: selectedMood,
      date: new Date().toISOString(),
      isPrivate: true,
    }

    onSaveLetter(newLetter)
    setCurrentStep('journal')
    toast.success('Letter saved! 💙')
  }

  const handleBack = () => {
    switch (currentStep) {
      case 'prompt':
        setCurrentStep('mood')
        setSelectedMood(null)
        break
      case 'writing':
        setCurrentStep('prompt')
        setIsWriting(false)
        break
      case 'journal':
        setCurrentStep('mood')
        setSelectedMood(null)
        setLetterContent('')
        setIsWriting(false)
        break
    }
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

  const selectedMoodOption = selectedMood
    ? moodOptions.find((m) => m.id === selectedMood)
    : null

  // Mood Selection
  if (currentStep === 'mood') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-medium text-gray-900">DearEcho</h1>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-medium text-gray-900 mb-12">
              How are you feeling{user ? `, ${user.name}` : ''}?
            </h2>

            <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto">
              {moodOptions.map((mood) => (
                <Button
                  key={mood.id}
                  onClick={() => handleMoodSelect(mood.id)}
                  className={`${mood.bgColor} h-24 w-full rounded-2xl border-0 hover:scale-105 transition-transform duration-200 flex flex-col items-center justify-center space-y-2 shadow-lg`}
                  style={{ backgroundColor: mood.color + '20' }}
                >
                  <span className="text-3xl">{mood.emoji}</span>
                  <span className="text-gray-700 font-medium">{mood.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Prompt
 if (currentStep === 'prompt' && selectedMoodOption) {
  const promptText = prompts[selectedMoodOption.id] 

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center">
          <Button variant="ghost" size="sm" onClick={handleBack} className="mr-4 p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-medium text-gray-900 capitalize">
            {selectedMoodOption.label}
          </h1>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 pb-20">
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto mb-8 bg-gray-200 rounded-full flex items-center justify-center">
              <div className="w-20 h-20 bg-gray-300 rounded-full opacity-60" />
            </div>

            <p className="text-lg text-gray-700 leading-relaxed max-w-md mx-auto mb-12">
              {promptText}
            </p>

            <Button
              onClick={handleStartWriting}
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg"
            >
              Start Writing
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Writing
  if (currentStep === 'writing' && selectedMoodOption) {
    const meta = MOOD_META[selectedMoodOption.id]

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={handleBack} className="mr-4 p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-medium text-gray-900">DearEcho</h1>
          </div>
          <Button variant="ghost" size="sm" className="p-2">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1 p-6 pb-20">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-full">
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">{meta.emoji}</span>
                <span className="text-lg font-medium text-gray-700 capitalize">
                  {meta.label}
                </span>
              </div>

              <Textarea
                value={letterContent}
                onChange={(e) => setLetterContent(e.target.value)}
                placeholder={`Dear Younger Me,\n\nI want you to know that...`}
                className="flex-1 border-0 resize-none text-base leading-relaxed focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                style={{ minHeight: '400px' }}
              />

              <div className="pt-4 border-t border-gray-100">
                <Button
                  onClick={handleSaveLetter}
                  disabled={!letterContent.trim()}
                  size="lg"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium"
                >
                  Save Letter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Journal
  if (currentStep === 'journal') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-4 py-4 flex items={ 'center' } justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={handleBack} className="mr-4 p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-medium text-gray-900">DearEcho</h1>
          </div>
          <Button variant="ghost" size="sm" className="p-2">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>

        <div className="bg-white px-6 py-4 border-b border-gray-100">
          <h2 className="text-2xl font-medium text-gray-900">Journal</h2>
        </div>

        <div className="flex-1 p-6 pb-32">
          <div className="space-y-4">
            {previousLetters.map((letter) => {
              const meta = MOOD_META[letter.mood]

              return (
                <Card key={letter.id} className="bg-white border-gray-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-lg">{meta.emoji}</span>
                        </div>
                        <div>
                          <div className={`font-medium ${meta.color} capitalize`}>
                            {letter.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDate(letter.date)}
                          </div>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${meta.color} bg-gray-50 capitalize`}>
                        {letter.mood}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
            <p className="text-center text-gray-700 leading-relaxed mb-4">
              "You are worthy of the same kindness you give to others."
            </p>
            <div className="flex justify-center">
              <Button
                onClick={() => {
                  setCurrentStep('mood')
                  setSelectedMood(null)
                  setLetterContent('')
                  setIsWriting(false)
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full flex items-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Done</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
