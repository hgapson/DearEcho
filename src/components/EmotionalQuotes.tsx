'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Quote, Heart, RefreshCw, Share2, Copy, Sparkles } from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import { User } from '../App'

interface EmotionalQuotesProps {
  user: User | null
}

export function EmotionalQuotes({ user }: EmotionalQuotesProps) {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [selectedMood, setSelectedMood] = useState<string>('all')

  const quotes = [
    {
      text: 'You are worthy of the same kindness you give to others.',
      author: 'Unknown',
      mood: 'loving',
      category: 'Self-Compassion',
    },
    {
      text: "Healing isn't about forgetting the past, but about creating a better future.",
      author: 'Maya Angelou',
      mood: 'hopeful',
      category: 'Growth',
    },
    {
      text: "Your feelings are valid, even when they're difficult to understand.",
      author: 'Unknown',
      mood: 'anxious',
      category: 'Validation',
    },
    {
      text: "Progress is not linear. Some days you'll move forward, some days you'll rest.",
      author: 'Unknown',
      mood: 'peaceful',
      category: 'Progress',
    },
    {
      text: 'You have been assigned this mountain to show others it can be moved.',
      author: 'Mel Robbins',
      mood: 'determined',
      category: 'Strength',
    },
  ]

  const moods = [
    { id: 'all', label: 'All', color: 'bg-gray-100 text-gray-700' },
    { id: 'loving', label: 'Loving', color: 'bg-pink-100 text-pink-700' },
    { id: 'hopeful', label: 'Hopeful', color: 'bg-blue-100 text-blue-700' },
    { id: 'anxious', label: 'Anxious', color: 'bg-purple-100 text-purple-700' },
    { id: 'peaceful', label: 'Peaceful', color: 'bg-teal-100 text-teal-700' },
    {
      id: 'determined',
      label: 'Determined',
      color: 'bg-orange-100 text-orange-700',
    },
  ]

  const filteredQuotes =
    selectedMood === 'all'
      ? quotes
      : quotes.filter((q) => q.mood === selectedMood)
  const currentQuote = filteredQuotes[currentQuoteIndex] || filteredQuotes[0]

  const getNextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % filteredQuotes.length)
  }

  const copyQuote = () => {
    navigator.clipboard.writeText(
      `"${currentQuote.text}" - ${currentQuote.author}`
    )
    toast.success('Quote copied to clipboard!')
  }

  return (
    <div className="min-h-screen pt-6 pb-20 px-4 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-green-600 rounded-full mb-4 shadow-lg">
            <Quote className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Emotional Quotes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find inspiration and comfort in words that resonate with your
            emotional journey.
          </p>
        </div>

        {/* Mood Filter */}
        <div className="mb-8">
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {moods.map((mood) => (
                  <Button
                    key={mood.id}
                    variant={selectedMood === mood.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setSelectedMood(mood.id)
                      setCurrentQuoteIndex(0)
                    }}
                    className={`${
                      selectedMood === mood.id
                        ? mood.color
                        : 'hover:' + mood.color
                    } transition-all duration-200`}
                  >
                    <Heart className="w-3 h-3 mr-1" />
                    {mood.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quote Display */}
        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-8">
          <CardContent className="p-12 text-center">
            <div className="mb-6">
              <Quote className="w-12 h-12 text-teal-500 mx-auto mb-4 opacity-50" />
              <p className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed mb-6">
                "{currentQuote.text}"
              </p>
              <p className="text-lg text-gray-600 font-medium">
                — {currentQuote.author}
              </p>
            </div>

            <div className="flex justify-center mb-6">
              <Badge className="bg-teal-100 text-teal-700 border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                {currentQuote.category}
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={getNextQuote}
                className="bg-gradient-to-r from-teal-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                New Quote
              </Button>
              <Button
                variant="outline"
                onClick={copyQuote}
                className="px-6 py-3 rounded-xl font-semibold border-2 border-teal-200 hover:bg-teal-50"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Quote
              </Button>
              <Button
                variant="outline"
                className="px-6 py-3 rounded-xl font-semibold border-2 border-teal-200 hover:bg-teal-50"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quote Collection */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              More Quotes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredQuotes.slice(0, 4).map((quote, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    index === currentQuoteIndex
                      ? 'border-teal-300 bg-teal-50'
                      : 'border-gray-200 hover:border-teal-200 hover:bg-teal-25'
                  }`}
                  onClick={() => setCurrentQuoteIndex(index)}
                >
                  <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                    "{quote.text}"
                  </p>
                  <p className="text-xs text-gray-500">— {quote.author}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
