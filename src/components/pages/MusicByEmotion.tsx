'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import {
  Music,
  Play,
  Pause,
  Heart,
  Shuffle,
  SkipForward,
  SkipBack,
  Volume2,
  ExternalLink,
  Headphones,
  Radio,
} from 'lucide-react'
import { User } from '../App'

interface MusicByEmotionProps {
  user: User | null
}

export function MusicByEmotion({ user }: MusicByEmotionProps) {
  const [selectedMood, setSelectedMood] = useState('calm')
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)

  const moods = [
    {
      id: 'calm',
      label: 'Calm & Peaceful',
      emoji: '😌',
      color: 'from-blue-400 to-teal-500',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'happy',
      label: 'Happy & Upbeat',
      emoji: '😊',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50',
    },
    {
      id: 'energetic',
      label: 'Energetic & Motivated',
      emoji: '⚡',
      color: 'from-red-400 to-pink-500',
      bgColor: 'bg-red-50',
    },
    {
      id: 'sad',
      label: 'Sad & Reflective',
      emoji: '😢',
      color: 'from-gray-400 to-blue-500',
      bgColor: 'bg-gray-50',
    },
    {
      id: 'anxious',
      label: 'Anxious & Need Comfort',
      emoji: '😰',
      color: 'from-purple-400 to-indigo-500',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'focused',
      label: 'Need Focus',
      emoji: '🎯',
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
    },
  ]

  const playlists = {
    calm: [
      {
        id: 'c1',
        title: 'Weightless',
        artist: 'Marconi Union',
        album: 'Weightless',
        duration: '8:10',
        description: 'Scientifically designed to reduce anxiety by 65%',
      },
      {
        id: 'c2',
        title: 'River',
        artist: 'Joni Mitchell',
        album: 'Blue',
        duration: '4:00',
        description: 'Gentle and introspective',
      },
      {
        id: 'c3',
        title: 'Clair de Lune',
        artist: 'Claude Debussy',
        album: 'Suite Bergamasque',
        duration: '5:00',
        description: 'Classic peaceful composition',
      },
      {
        id: 'c4',
        title: 'Mad World',
        artist: 'Gary Jules',
        album: 'Donnie Darko Soundtrack',
        duration: '3:07',
        description: 'Contemplative and soothing',
      },
    ],
    happy: [
      {
        id: 'h1',
        title: 'Good as Hell',
        artist: 'Lizzo',
        album: 'Cuz I Love You',
        duration: '2:39',
        description: 'Feel-good anthem for self-love',
      },
      {
        id: 'h2',
        title: 'Walking on Sunshine',
        artist: 'Katrina and the Waves',
        album: 'Walking on Sunshine',
        duration: '3:59',
        description: 'Instant mood booster',
      },
      {
        id: 'h3',
        title: 'Happy',
        artist: 'Pharrell Williams',
        album: 'G I R L',
        duration: '3:53',
        description: 'Pure joy in musical form',
      },
      {
        id: 'h4',
        title: 'Three Little Birds',
        artist: 'Bob Marley',
        album: 'Exodus',
        duration: '3:00',
        description: "Don't worry about a thing",
      },
    ],
    energetic: [
      {
        id: 'e1',
        title: "Can't Stop the Feeling!",
        artist: 'Justin Timberlake',
        album: 'Trolls Soundtrack',
        duration: '3:56',
        description: 'High-energy motivation',
      },
      {
        id: 'e2',
        title: 'Stronger',
        artist: 'Kelly Clarkson',
        album: 'Stronger',
        duration: '3:42',
        description: 'Empowering and uplifting',
      },
      {
        id: 'e3',
        title: 'Eye of the Tiger',
        artist: 'Survivor',
        album: 'Eye of the Tiger',
        duration: '4:05',
        description: 'Classic motivational anthem',
      },
      {
        id: 'e4',
        title: 'Roar',
        artist: 'Katy Perry',
        album: 'Prism',
        duration: '3:43',
        description: 'Find your inner strength',
      },
    ],
    sad: [
      {
        id: 's1',
        title: 'The Sound of Silence',
        artist: 'Simon & Garfunkel',
        album: 'Sounds of Silence',
        duration: '3:05',
        description: 'Embrace the quiet moments',
      },
      {
        id: 's2',
        title: 'Hurt',
        artist: 'Johnny Cash',
        album: 'American IV',
        duration: '3:38',
        description: 'Raw and healing',
      },
      {
        id: 's3',
        title: 'Black',
        artist: 'Pearl Jam',
        album: 'Ten',
        duration: '5:43',
        description: 'Process deep emotions',
      },
      {
        id: 's4',
        title: 'Mad About You',
        artist: 'Joni Mitchell',
        album: 'Turbulent Indigo',
        duration: '4:41',
        description: 'Beautiful melancholy',
      },
    ],
    anxious: [
      {
        id: 'a1',
        title: 'Breathe',
        artist: 'Telepopmusik',
        album: 'Genetic World',
        duration: '4:07',
        description: 'Focus on breathing',
      },
      {
        id: 'a2',
        title: 'Let It Be',
        artist: 'The Beatles',
        album: 'Let It Be',
        duration: '3:48',
        description: 'Comforting and reassuring',
      },
      {
        id: 'a3',
        title: 'The Night We Met',
        artist: 'Lord Huron',
        album: 'Strange Trails',
        duration: '3:28',
        description: 'Gentle and soothing',
      },
      {
        id: 'a4',
        title: 'Holocene',
        artist: 'Bon Iver',
        album: 'Bon Iver, Bon Iver',
        duration: '5:36',
        description: 'Peaceful introspection',
      },
    ],
    focused: [
      {
        id: 'f1',
        title: 'Entrance',
        artist: 'Dmitri Shostakovich',
        album: 'The Gadfly Suite',
        duration: '3:20',
        description: 'Concentration enhancer',
      },
      {
        id: 'f2',
        title: 'Metamorphosis Two',
        artist: 'Philip Glass',
        album: 'Solo Piano',
        duration: '5:27',
        description: 'Minimalist focus music',
      },
      {
        id: 'f3',
        title: 'Experience',
        artist: 'Ludovico Einaudi',
        album: 'In a Time Lapse',
        duration: '5:15',
        description: 'Modern classical for focus',
      },
      {
        id: 'f4',
        title: 'Samsara',
        artist: 'Audiomachine',
        album: 'Chronicles',
        duration: '2:58',
        description: 'Cinematic concentration',
      },
    ],
  }

  const currentPlaylist =
    playlists[selectedMood as keyof typeof playlists] || playlists.calm
  const selectedMoodInfo = moods.find((m) => m.id === selectedMood)

  const togglePlay = (songId: string) => {
    if (currentlyPlaying === songId) {
      setCurrentlyPlaying(null)
    } else {
      setCurrentlyPlaying(songId)
    }
  }

  return (
    <div className="min-h-screen pt-6 pb-20 px-4 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full mb-4 shadow-lg">
            <Music className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Music for Your Mood
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let music be your companion in healing. Choose your current mood and
            discover curated songs to support your emotional journey.
          </p>
        </div>

        {/* Mood Selection */}
        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="w-5 h-5 mr-2 text-pink-600" />
              How are you feeling right now?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {moods.map((mood) => (
                <Button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  variant={selectedMood === mood.id ? 'default' : 'outline'}
                  className={`h-auto p-4 flex flex-col items-center space-y-2 transition-all duration-200 ${
                    selectedMood === mood.id
                      ? `bg-gradient-to-br ${mood.color} text-white border-0 shadow-lg transform scale-105`
                      : 'hover:scale-105 border-2 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl">{mood.emoji}</span>
                  <span className="text-sm font-medium text-center">
                    {mood.label}
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Mood Playlist */}
        {selectedMoodInfo && (
          <Card
            className={`shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-8 ${selectedMoodInfo.bgColor} border-l-4 border-l-current`}
          >
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${selectedMoodInfo.color} rounded-full shadow-lg`}
                >
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-800">
                    {selectedMoodInfo.label} Playlist
                  </CardTitle>
                  <p className="text-gray-600">
                    Curated songs to match your current mood
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentPlaylist.map((song, index) => (
                  <div
                    key={song.id}
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 ${
                      currentlyPlaying === song.id
                        ? 'bg-white/80 shadow-md border-2 border-blue-300'
                        : 'bg-white/40 hover:bg-white/60 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <Button
                        onClick={() => togglePlay(song.id)}
                        size="sm"
                        className={`w-10 h-10 rounded-full ${
                          currentlyPlaying === song.id
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-gray-600 hover:bg-gray-700'
                        }`}
                      >
                        {currentlyPlaying === song.id ? (
                          <Pause className="w-4 h-4 text-white" />
                        ) : (
                          <Play className="w-4 h-4 text-white ml-0.5" />
                        )}
                      </Button>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-semibold text-gray-800 truncate">
                        {song.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {song.artist} • {song.album}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {song.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <p className="text-sm text-gray-500">{song.duration}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-blue-600 p-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center space-x-4">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 border-2 border-gray-200 hover:bg-gray-50"
                >
                  <Shuffle className="w-4 h-4" />
                  <span>Shuffle</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center space-x-2 border-2 border-gray-200 hover:bg-gray-50"
                >
                  <Radio className="w-4 h-4" />
                  <span>Play All</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Music Therapy Benefits */}
        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              How Music Supports Emotional Wellness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-3 h-3 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Reduces Stress
                    </h4>
                    <p className="text-sm text-gray-600">
                      Listening to music can lower cortisol levels and reduce
                      anxiety.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Improves Mood
                    </h4>
                    <p className="text-sm text-gray-600">
                      Music releases dopamine, creating feelings of pleasure and
                      happiness.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-3 h-3 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Enhances Focus
                    </h4>
                    <p className="text-sm text-gray-600">
                      Certain music can improve concentration and cognitive
                      performance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-3 h-3 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Supports Sleep
                    </h4>
                    <p className="text-sm text-gray-600">
                      Calming music can help regulate sleep patterns and improve
                      rest quality.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-3 h-3 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Emotional Expression
                    </h4>
                    <p className="text-sm text-gray-600">
                      Music helps us process and express complex emotions
                      safely.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-3 h-3 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Social Connection
                    </h4>
                    <p className="text-sm text-gray-600">
                      Shared musical experiences create bonds and reduce
                      feelings of isolation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Listening Tips */}
        <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              💡 Tips for Mindful Listening
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>• Use good quality headphones or speakers</div>
              <div>• Find a comfortable, quiet space</div>
              <div>• Close your eyes and focus on the music</div>
              <div>• Notice how the music makes you feel</div>
              <div>• Breathe deeply and let the music wash over you</div>
              <div>• Don't judge your emotional response</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
