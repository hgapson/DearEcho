'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Badge } from './ui/badge'
import {
  AlertTriangle,
  Phone,
  MessageCircle,
  Heart,
  Shield,
  Clock,
  MapPin,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Textarea } from './ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface User {
  id: string
  name: string
}

interface Crisis {
  id: string
  userId: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  type: 'anxiety' | 'depression' | 'panic' | 'suicidal_thoughts' | 'other'
  timestamp: string
  location?: string
  contactedHelp: boolean
  resolution?: string
  followUpScheduled?: string
}

interface CrisisSupportProps {
  user: User | null
  onCrisisReport: (crisis: Crisis) => void
}

export function CrisisSupport({ user, onCrisisReport }: CrisisSupportProps) {
  const [reportType, setReportType] = useState<Crisis['type']>('anxiety')
  const [severity, setSeverity] = useState<Crisis['severity']>('medium')
  const [description, setDescription] = useState('')

  const emergencyContacts = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      available: '24/7',
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      available: '24/7',
    },
    {
      name: 'National Alliance on Mental Illness',
      number: '1-800-950-NAMI',
      available: '24/7',
    },
  ]

  const handleCrisisReport = () => {
    if (!user) return

    const crisis: Crisis = {
      id: Date.now().toString(),
      userId: user.id,
      severity,
      type: reportType,
      timestamp: new Date().toISOString(),
      contactedHelp: false,
    }

    onCrisisReport(crisis)
    setDescription('')
  }

  const getSeverityColor = (level: Crisis['severity']) => {
    switch (level) {
      case 'low':
        return 'bg-yellow-100 text-yellow-800'
      case 'medium':
        return 'bg-orange-100 text-orange-800'
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'critical':
        return 'bg-red-500 text-white'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4 bg-red-50 p-6 rounded-lg border border-red-200">
        <div className="flex items-center justify-center space-x-2 text-red-600">
          <Shield className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Crisis Support</h1>
        </div>
        <p className="text-red-700 max-w-2xl mx-auto">
          If you're experiencing a mental health crisis or having thoughts of
          self-harm, please reach out for immediate help. You're not alone.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Button className="bg-red-600 hover:bg-red-700" size="lg">
            <Phone className="w-5 h-5 mr-2" />
            Call 988 Now
          </Button>
          <Button
            variant="outline"
            className="border-red-300 text-red-700"
            size="lg"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Text Crisis Line
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-blue-600" />
              <span>Emergency Contacts</span>
            </CardTitle>
            <CardDescription>Immediate help is available 24/7</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-blue-50 border border-blue-200"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-blue-900">
                        {contact.name}
                      </h3>
                      <p className="text-blue-700 font-mono text-lg">
                        {contact.number}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-blue-300 text-blue-700"
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {contact.available}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-green-600" />
              <span>Immediate Coping Strategies</span>
            </CardTitle>
            <CardDescription>
              Quick techniques to help right now
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                'Take 5 deep breaths: In for 4, hold for 7, out for 8',
                'Ground yourself: Name 5 things you can see, 4 you can touch, 3 you can hear',
                'Call or text someone you trust',
                'Go to a safe, comfortable space',
                'Listen to calming music or nature sounds',
                'Use a crisis chat or text service',
              ].map((strategy, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-green-50 border border-green-200"
                >
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <p className="text-green-800 text-sm">{strategy}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Safety Planning Resources</CardTitle>
          <CardDescription>
            Tools to help you prepare for future crises
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: 'Create Safety Plan',
                description: 'Step-by-step plan for managing crisis moments',
                action: 'Start Planning',
              },
              {
                title: 'Warning Signs Tracker',
                description: 'Identify your personal crisis warning signs',
                action: 'Track Signs',
              },
              {
                title: 'Support Network',
                description: 'Build your personal support contact list',
                action: 'Build Network',
              },
            ].map((resource, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {resource.description}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  {resource.action}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {user && (
        <Card>
          <CardHeader>
            <CardTitle>Anonymous Crisis Report</CardTitle>
            <CardDescription>
              Help us understand community needs (completely confidential)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Crisis Type</label>
                  <Select
                    value={reportType}
                    onValueChange={(value: any) => setReportType(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anxiety">Anxiety/Panic</SelectItem>
                      <SelectItem value="depression">Depression</SelectItem>
                      <SelectItem value="suicidal_thoughts">
                        Suicidal Thoughts
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Severity Level</label>
                  <Select
                    value={severity}
                    onValueChange={(value: any) => setSeverity(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">
                  Description (Optional)
                </label>
                <Textarea
                  placeholder="Share what you're comfortable with to help others..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  All reports are anonymous and help improve our support
                  resources
                </p>
                <Button onClick={handleCrisisReport}>Submit Report</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
