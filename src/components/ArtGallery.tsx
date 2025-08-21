'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Input } from './ui/input'
import {
  Image,
  PenTool,
  Search,
  Filter,
  Calendar,
  Heart,
  Eye,
  Download,
  Trash2,
  Edit3,
  Grid,
  List,
  Archive,
} from 'lucide-react'
import Drawing from '../App'
import type { Letter, User } from '../App'

interface ArtGalleryProps {
  user: User | null
  drawings: Drawing[]
  letters: Letter[]
}

export function ArtGallery({ user, drawings, letters }: ArtGalleryProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [moodFilter, setMoodFilter] = useState('all')
  const [selectedItem, setSelectedItem] = useState<Drawing | Letter | null>(
    null
  )

  // Mock data for demo
  const mockDrawings: Drawing[] =
    drawings.length === 0
      ? [
          {
            id: 'd1',
            title: 'Peaceful Morning',
            imageData:
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%2387CEEB'/%3E%3Ccircle cx='250' cy='50' r='30' fill='%23FFD700'/%3E%3Cpath d='M0 150 Q150 100 300 150 L300 200 L0 200 Z' fill='%2332CD32'/%3E%3C/svg%3E",
            mood: 'peaceful',
            date: '2024-01-15T10:30:00Z',
            description:
              'Drew this while feeling calm and centered after my morning meditation.',
          },
          {
            id: 'd2',
            title: 'Storm Inside',
            imageData:
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23404040'/%3E%3Cpath d='M50 100 Q100 50 150 100 T250 100' stroke='%23FFD700' stroke-width='3' fill='none'/%3E%3Ccircle cx='100' cy='60' r='5' fill='%2300BFFF'/%3E%3Ccircle cx='200' cy='70' r='3' fill='%2300BFFF'/%3E%3C/svg%3E",
            mood: 'anxious',
            date: '2024-01-12T14:20:00Z',
            description:
              'Expressing the turbulent feelings I had during a difficult day.',
          },
          {
            id: 'd3',
            title: 'Joy Burst',
            imageData:
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23FFB6C1'/%3E%3Ccircle cx='150' cy='100' r='40' fill='%23FF69B4'/%3E%3Cpolygon points='150,60 160,80 180,80 165,95 170,115 150,105 130,115 135,95 120,80 140,80' fill='%23FFD700'/%3E%3C/svg%3E",
            mood: 'happy',
            date: '2024-01-10T16:45:00Z',
            description:
              'Created this when I felt an overwhelming sense of happiness and gratitude.',
          },
        ]
      : drawings

  const mockLetters: Letter[] =
    letters.length === 0
      ? [
          {
            id: 'l1',
            title: 'Letter to My Anxious Self',
            content:
              "Dear younger me, I know you're scared right now, but I want you to know that everything will be okay...",
            recipient: 'younger',
            mood: 'anxious',
            date: '2024-01-14T09:15:00Z',
            isPrivate: true,
          },
          {
            id: 'l2',
            title: 'Future Dreams',
            content:
              "Dear future me, I hope by the time you read this, you've found the peace you're searching for...",
            recipient: 'future',
            mood: 'hopeful',
            date: '2024-01-11T20:30:00Z',
            isPrivate: true,
          },
          {
            id: 'l3',
            title: 'Grateful Heart',
            content:
              'Dear past me, thank you for not giving up. Your struggles led to the strength I have today...',
            recipient: 'younger',
            mood: 'grateful',
            date: '2024-01-08T11:22:00Z',
            isPrivate: true,
          },
        ]
      : letters

  const allItems = [
    ...mockDrawings.map((d) => ({ ...d, type: 'drawing' as const })),
    ...mockLetters.map((l) => ({ ...l, type: 'letter' as const })),
  ]

  const moods = [
    'all',
    'happy',
    'sad',
    'anxious',
    'peaceful',
    'grateful',
    'hopeful',
    'creative',
  ]

  const filteredItems = allItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.type === 'drawing' &&
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.type === 'letter' &&
        item.content.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesMood = moodFilter === 'all' || item.mood === moodFilter
    return matchesSearch && matchesMood
  })

  const getMoodColor = (mood: string) => {
    const colors: { [key: string]: string } = {
      happy: 'bg-yellow-100 text-yellow-700',
      sad: 'bg-blue-100 text-blue-700',
      anxious: 'bg-red-100 text-red-700',
      peaceful: 'bg-teal-100 text-teal-700',
      grateful: 'bg-green-100 text-green-700',
      hopeful: 'bg-purple-100 text-purple-700',
      creative: 'bg-orange-100 text-orange-700',
    }
    return colors[mood] || 'bg-gray-100 text-gray-700'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-6 pb-20 px-4 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4 shadow-lg">
            <Image className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Personal Gallery
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Please sign in to view your saved drawings and letters.
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4 shadow-lg">
            <Image className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Art Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A collection of your emotional expressions through art and letters.
            Each piece tells part of your healing journey.
          </p>
        </div>

        {/* Controls */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search your creations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2 border-gray-200 focus:border-purple-400"
                  />
                </div>

                <select
                  value={moodFilter}
                  onChange={(e) => setMoodFilter(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none bg-white"
                >
                  <option value="all">All Moods</option>
                  {moods.slice(1).map((mood) => (
                    <option key={mood} value={mood}>
                      {mood.charAt(0).toUpperCase() + mood.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => setViewMode('grid')}
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setViewMode('list')}
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Image className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">
                {mockDrawings.length}
              </h3>
              <p className="text-gray-600">Drawings</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <PenTool className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">
                {mockLetters.length}
              </h3>
              <p className="text-gray-600">Letters</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Heart className="w-8 h-8 text-pink-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">
                {allItems.length}
              </h3>
              <p className="text-gray-600">Total Creations</p>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm shadow-lg border-0">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              All ({allItems.length})
            </TabsTrigger>
            <TabsTrigger
              value="drawings"
              className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              Drawings ({mockDrawings.length})
            </TabsTrigger>
            <TabsTrigger
              value="letters"
              className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              Letters ({mockLetters.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => setSelectedItem(item)}
                  >
                    <CardContent className="p-4">
                      {item.type === 'drawing' ? (
                        <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                          <img
                            src={item.imageData}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                          <PenTool className="w-12 h-12 text-purple-500 opacity-50" />
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-800 truncate">
                            {item.title}
                          </h3>
                          <Badge
                            className={`${getMoodColor(
                              item.mood
                            )} border-0 text-xs`}
                          >
                            {item.mood}
                          </Badge>
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2">
                          {item.type === 'drawing'
                            ? item.description
                            : item.content}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(item.date)}
                          </span>
                          <span className="flex items-center">
                            {item.type === 'drawing' ? (
                              <Image className="w-3 h-3" />
                            ) : (
                              <PenTool className="w-3 h-3" />
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        {item.type === 'drawing' ? (
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.imageData}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <PenTool className="w-6 h-6 text-purple-500" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-800 truncate">
                              {item.title}
                            </h3>
                            <Badge
                              className={`${getMoodColor(item.mood)} border-0`}
                            >
                              {item.mood}
                            </Badge>
                          </div>

                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {item.type === 'drawing'
                              ? item.description
                              : item.content}
                          </p>

                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(item.date)}
                            </span>
                            <span className="capitalize">{item.type}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="drawings">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDrawings
                .filter(
                  (drawing) =>
                    drawing.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) &&
                    (moodFilter === 'all' || drawing.mood === moodFilter)
                )
                .map((drawing) => (
                  <Card
                    key={drawing.id}
                    className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() =>
                      setSelectedItem({ ...drawing, type: 'drawing' })
                    }
                  >
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={drawing.imageData}
                          alt={drawing.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-800 truncate">
                            {drawing.title}
                          </h3>
                          <Badge
                            className={`${getMoodColor(
                              drawing.mood
                            )} border-0 text-xs`}
                          >
                            {drawing.mood}
                          </Badge>
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2">
                          {drawing.description}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(drawing.date)}
                          </span>
                          <Image className="w-3 h-3" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="letters">
            <div className="space-y-4">
              {mockLetters
                .filter(
                  (letter) =>
                    letter.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) &&
                    (moodFilter === 'all' || letter.mood === moodFilter)
                )
                .map((letter) => (
                  <Card
                    key={letter.id}
                    className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() =>
                      setSelectedItem({ ...letter, type: 'letter' })
                    }
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <PenTool className="w-6 h-6 text-purple-500" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-800">
                              {letter.title}
                            </h3>
                            <Badge
                              className={`${getMoodColor(
                                letter.mood
                              )} border-0`}
                            >
                              {letter.mood}
                            </Badge>
                          </div>

                          <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                            {letter.content}
                          </p>

                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(letter.date)}
                            </span>
                            <span className="capitalize">
                              To {letter.recipient} self
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredItems.length === 0 && (
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Archive className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No creations found
              </h3>
              <p className="text-gray-500">
                {searchTerm || moodFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start creating drawings and letters to see them here'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
