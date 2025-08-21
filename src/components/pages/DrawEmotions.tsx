'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import {
  Palette,
  Brush,
  Eraser,
  Download,
  Save,
  RefreshCw,
  Heart,
  Sparkles,
  Trash2,
  Undo,
  Redo,
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import { Drawing, User } from '../App'

interface DrawEmotionsProps {
  user: User | null
  onSaveDrawing: (drawing: Drawing) => void
}

export function DrawEmotions({ user, onSaveDrawing }: DrawEmotionsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [brushSize, setBrushSize] = useState(5)
  const [brushColor, setBrushColor] = useState('#3B82F6')
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush')
  const [title, setTitle] = useState('')
  const [selectedMood, setSelectedMood] = useState('')
  const [description, setDescription] = useState('')

  const colors = [
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#F97316', // Orange
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#6B7280', // Gray
    '#1F2937', // Dark gray
    '#000000', // Black
  ]

  const moods = [
    { id: 'happy', label: 'Happy', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'excited', label: 'Excited', color: 'bg-orange-100 text-orange-700' },
    { id: 'peaceful', label: 'Peaceful', color: 'bg-blue-100 text-blue-700' },
    { id: 'grateful', label: 'Grateful', color: 'bg-green-100 text-green-700' },
    {
      id: 'creative',
      label: 'Creative',
      color: 'bg-purple-100 text-purple-700',
    },
    { id: 'sad', label: 'Sad', color: 'bg-blue-100 text-blue-700' },
    { id: 'anxious', label: 'Anxious', color: 'bg-red-100 text-red-700' },
    { id: 'frustrated', label: 'Frustrated', color: 'bg-red-100 text-red-700' },
    { id: 'confused', label: 'Confused', color: 'bg-gray-100 text-gray-700' },
    { id: 'lonely', label: 'Lonely', color: 'bg-gray-100 text-gray-700' },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        // Set white background
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext('2d')
    if (ctx) {
      setIsDrawing(true)
      ctx.beginPath()
      ctx.moveTo(x, y)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.lineWidth = brushSize

      if (tool === 'brush') {
        ctx.globalCompositeOperation = 'source-over'
        ctx.strokeStyle = brushColor
      } else {
        ctx.globalCompositeOperation = 'destination-out'
      }

      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y)
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }
  }

  const saveDrawing = () => {
    if (!title.trim()) {
      toast.error('Please give your drawing a title')
      return
    }

    if (!selectedMood) {
      toast.error('Please select the mood this drawing represents')
      return
    }

    const canvas = canvasRef.current
    if (canvas) {
      const imageData = canvas.toDataURL('image/png')

      const newDrawing: Drawing = {
        id: Date.now().toString(),
        title: title.trim(),
        imageData,
        mood: selectedMood,
        date: new Date().toISOString(),
        description: description.trim() || undefined,
      }

      onSaveDrawing(newDrawing)
      toast.success('Your drawing has been saved! 🎨')

      // Reset form
      setTitle('')
      setSelectedMood('')
      setDescription('')
      clearCanvas()
    }
  }

  const downloadDrawing = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const link = document.createElement('a')
      link.download = `emotion-drawing-${Date.now()}.png`
      link.href = canvas.toDataURL()
      link.click()
      toast.success('Drawing downloaded! 📥')
    }
  }

  return (
    <div className="min-h-screen pt-6 pb-20 px-4 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mb-4 shadow-lg">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Express Through Art
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let your emotions flow through colors and shapes. Art can be a
            powerful way to process feelings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Drawing Canvas */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Brush className="w-5 h-5 mr-2 text-orange-600" />
                    Canvas
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={clearCanvas}
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={downloadDrawing}
                      size="sm"
                      variant="outline"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-inner">
                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={400}
                    className="w-full h-auto cursor-crosshair"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tools Panel */}
          <div className="space-y-6">
            {/* Drawing Tools */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Tool Selection */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Tool
                  </Label>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setTool('brush')}
                      size="sm"
                      variant={tool === 'brush' ? 'default' : 'outline'}
                      className="flex-1"
                    >
                      <Brush className="w-4 h-4 mr-1" />
                      Brush
                    </Button>
                    <Button
                      onClick={() => setTool('eraser')}
                      size="sm"
                      variant={tool === 'eraser' ? 'default' : 'outline'}
                      className="flex-1"
                    >
                      <Eraser className="w-4 h-4 mr-1" />
                      Eraser
                    </Button>
                  </div>
                </div>

                {/* Brush Size */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Size: {brushSize}px
                  </Label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={brushSize}
                    onChange={(e) => setBrushSize(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Color Palette */}
                {tool === 'brush' && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Colors
                    </Label>
                    <div className="grid grid-cols-4 gap-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setBrushColor(color)}
                          className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
                            brushColor === color
                              ? 'border-gray-800 scale-110 shadow-lg'
                              : 'border-gray-300 hover:scale-105'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Save Drawing */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Save className="w-5 h-5 mr-2 text-green-600" />
                  Save Your Art
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label
                    htmlFor="title"
                    className="text-sm font-medium text-gray-700"
                  >
                    Title *
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your drawing a name..."
                    className="border-2 border-gray-200 focus:border-orange-400"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    What mood does this represent? *
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {moods.map((mood) => (
                      <Button
                        key={mood.id}
                        onClick={() => setSelectedMood(mood.id)}
                        size="sm"
                        variant={
                          selectedMood === mood.id ? 'default' : 'outline'
                        }
                        className={`text-xs ${
                          selectedMood === mood.id
                            ? `${mood.color} border-2 border-current`
                            : 'border-2 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {mood.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-700"
                  >
                    Description (Optional)
                  </Label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us about your drawing..."
                    rows={3}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-400 focus:outline-none resize-none text-sm"
                  />
                </div>

                <Button
                  onClick={saveDrawing}
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Drawing
                </Button>
              </CardContent>
            </Card>

            {/* Inspiration */}
            <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Heart className="w-8 h-8 text-pink-500 mx-auto mb-3" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  "Art washes away from the soul the dust of everyday life." -
                  Pablo Picasso
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Art Prompts */}
        <div className="mt-12">
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                Art Prompts for Emotional Expression
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'Draw how your day felt using only colors and shapes',
                  'Create a visual representation of your safe space',
                  'Illustrate a memory that makes you smile',
                  'Draw your feelings as weather patterns',
                  'Create abstract art representing your hopes',
                  'Draw yourself as a superhero with emotional powers',
                ].map((prompt, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200"
                  >
                    <p className="text-sm text-gray-700">{prompt}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
