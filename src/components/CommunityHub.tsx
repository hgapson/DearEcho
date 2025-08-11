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
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  Users,
  MessageCircle,
  Heart,
  Share2,
  Search,
  Plus,
  Shield,
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
  Star,
  Lock,
  Globe,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
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
  email: string
  avatar?: string
  userType?: 'user' | 'therapist' | 'admin'
  subscriptionType?: 'free' | 'premium' | 'professional'
}

interface Comment {
  id: string
  userId: string
  userName: string
  content: string
  timestamp: string
  likes: number
}

interface CommunityPost {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  type: 'text' | 'image' | 'poll' | 'milestone' | 'question'
  timestamp: string
  likes: number
  comments: Comment[]
  tags: string[]
  isAnonymous: boolean
  supportGroup?: string
  isPinned: boolean
}

interface SupportGroup {
  id: string
  name: string
  description: string
  category: string
  memberCount: number
  isPrivate: boolean
  moderators: string[]
  rules: string[]
  coverImage?: string
  topics: string[]
  meetingSchedule?: string
}

interface CommunityHubProps {
  user: User | null
  posts: CommunityPost[]
  supportGroups: SupportGroup[]
  onCreatePost: (post: CommunityPost) => void
}

export function CommunityHub({
  user,
  posts,
  supportGroups,
  onCreatePost,
}: CommunityHubProps) {
  const [activeTab, setActiveTab] = useState('feed')
  const [searchQuery, setSearchQuery] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [newPostType, setNewPostType] = useState<
    'text' | 'question' | 'milestone'
  >('text')
  const [selectedGroup, setSelectedGroup] = useState<string>('general')
  const [isAnonymous, setIsAnonymous] = useState(false)

  // Mock data for demonstration
  const mockPosts: CommunityPost[] = [
    {
      id: '1',
      userId: 'user1',
      userName: 'Sarah M.',
      userAvatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b212?w=100&h=100&fit=crop&crop=face',
      content:
        "Just completed my 30-day meditation streak! 🧘‍♀️ The journey wasn't easy, but I've noticed such a positive change in my daily stress levels. For anyone starting out, remember that even 5 minutes counts!",
      type: 'milestone',
      timestamp: '2024-01-15T10:30:00Z',
      likes: 24,
      comments: [
        {
          id: 'c1',
          userId: 'user2',
          userName: 'Alex K.',
          content:
            "Congratulations! That's amazing progress. What meditation style did you find most helpful?",
          timestamp: '2024-01-15T11:00:00Z',
          likes: 5,
        },
      ],
      tags: ['meditation', 'milestone', 'mindfulness'],
      isAnonymous: false,
      supportGroup: 'mindfulness-circle',
      isPinned: false,
    },
    {
      id: '2',
      userId: 'user3',
      userName: 'Anonymous',
      content:
        "I've been struggling with anxiety lately, especially in social situations. Does anyone have tips for managing social anxiety? I'd really appreciate any advice from those who've been through similar experiences.",
      type: 'question',
      timestamp: '2024-01-15T09:15:00Z',
      likes: 18,
      comments: [
        {
          id: 'c2',
          userId: 'user4',
          userName: 'Dr. Jennifer L.',
          content:
            'Breathing exercises can be very helpful. Try the 4-7-8 technique: breathe in for 4, hold for 7, exhale for 8. Also, remember that most people are focused on themselves, not judging you.',
          timestamp: '2024-01-15T09:45:00Z',
          likes: 12,
        },
      ],
      tags: ['anxiety', 'social-anxiety', 'help'],
      isAnonymous: true,
      supportGroup: 'anxiety-support',
      isPinned: false,
    },
  ]

  const mockGroups: SupportGroup[] = [
    {
      id: '1',
      name: 'Anxiety Support Circle',
      description:
        'A safe space for individuals dealing with anxiety disorders to share experiences and coping strategies.',
      category: 'Mental Health',
      memberCount: 1247,
      isPrivate: false,
      moderators: ['mod1', 'mod2'],
      rules: [
        'Be respectful and supportive',
        "No medical advice unless you're a licensed professional",
        'Respect privacy and confidentiality',
        'Report any concerning content to moderators',
      ],
      topics: [
        'Coping Strategies',
        'Daily Check-ins',
        'Success Stories',
        'Resources',
      ],
      meetingSchedule: 'Tuesdays & Thursdays 7:00 PM EST',
    },
    {
      id: '2',
      name: 'Mindfulness & Meditation',
      description:
        'Share your meditation journey, techniques, and find accountability partners for daily practice.',
      category: 'Mindfulness',
      memberCount: 892,
      isPrivate: false,
      moderators: ['mod3'],
      rules: [
        'Share techniques and experiences',
        'Support beginners with patience',
        'No selling or promoting products',
      ],
      topics: ['Daily Practice', 'Techniques', 'Guided Sessions', 'Challenges'],
      meetingSchedule: 'Daily at 8:00 AM EST - Morning Meditation',
    },
    {
      id: '3',
      name: 'Young Adults Mental Health',
      description:
        'Peer support specifically for adults aged 18-30 navigating mental health challenges.',
      category: 'Age-Specific',
      memberCount: 567,
      isPrivate: true,
      moderators: ['mod4', 'mod5'],
      rules: [
        'Age verification required',
        'Confidential discussions only',
        'Professional moderation available',
      ],
      topics: ['Career Stress', 'Relationships', 'Identity', 'Future Planning'],
      meetingSchedule: 'Sundays 6:00 PM EST',
    },
  ]

  const handleCreatePost = () => {
    if (!newPostContent.trim() || !user) return

    const newPost: CommunityPost = {
      id: Date.now().toString(),
      userId: user.id,
      userName: isAnonymous ? 'Anonymous' : user.name,
      userAvatar: isAnonymous ? undefined : user.avatar,
      content: newPostContent,
      type: newPostType,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
      tags: [],
      isAnonymous,
      supportGroup: selectedGroup,
      isPinned: false,
    }

    onCreatePost(newPost)
    setNewPostContent('')
    setNewPostType('text')
    setIsAnonymous(false)
  }

  const filteredPosts = mockPosts.filter(
    (post) =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  )

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'milestone':
        return <Star className="w-4 h-4 text-yellow-500" />
      case 'question':
        return <MessageCircle className="w-4 h-4 text-blue-500" />
      default:
        return <MessageCircle className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Hub</h1>
          <p className="text-gray-600 mt-2">
            Connect, share, and support each other on your wellness journey
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search posts and groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Select
                  value={newPostType}
                  onValueChange={(value: any) => setNewPostType(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Post type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">General Post</SelectItem>
                    <SelectItem value="question">Ask Question</SelectItem>
                    <SelectItem value="milestone">Share Milestone</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Community</SelectItem>
                    {mockGroups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Textarea
                  placeholder="Share your thoughts, ask a question, or celebrate a milestone..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={4}
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-600">
                      Post anonymously
                    </span>
                  </label>
                  <Button
                    onClick={handleCreatePost}
                    disabled={!newPostContent.trim()}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feed">Community Feed</TabsTrigger>
          <TabsTrigger value="groups">Support Groups</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="md:col-span-3 space-y-4">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={post.userAvatar} />
                          <AvatarFallback>
                            {post.isAnonymous
                              ? 'A'
                              : post.userName
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{post.userName}</span>
                            {getPostIcon(post.type)}
                            {post.isPinned && (
                              <Badge variant="secondary">Pinned</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {new Date(post.timestamp).toLocaleDateString()} •
                            {post.supportGroup &&
                              ` in ${
                                mockGroups.find(
                                  (g) => g.id === post.supportGroup
                                )?.name || 'Group'
                              }`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{post.content}</p>

                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-red-500"
                        >
                          <Heart className="w-4 h-4 mr-1" />
                          {post.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.comments.length}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500"
                        >
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>

                    {post.comments.length > 0 && (
                      <div className="mt-4 space-y-3 border-t pt-4">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs">
                                {comment.userName
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="font-medium text-sm text-gray-900">
                                  {comment.userName}
                                </p>
                                <p className="text-sm text-gray-700">
                                  {comment.content}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-gray-500 h-auto p-1"
                                >
                                  <Heart className="w-3 h-3 mr-1" />
                                  {comment.likes}
                                </Button>
                                <span className="text-xs text-gray-500">
                                  {new Date(
                                    comment.timestamp
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Trending Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      'mindfulness',
                      'anxiety-support',
                      'self-care',
                      'meditation',
                      'therapy',
                    ].map((topic, index) => (
                      <div
                        key={topic}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium">#{topic}</span>
                        <Badge variant="secondary" className="text-xs">
                          {Math.floor(Math.random() * 100) + 20}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Community Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li>• Be kind and supportive</li>
                    <li>• Respect privacy and confidentiality</li>
                    <li>• No medical advice unless licensed</li>
                    <li>• Report concerning content</li>
                    <li>• Keep discussions constructive</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockGroups.map((group) => (
              <Card
                key={group.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      {group.isPrivate ? (
                        <Lock className="w-4 h-4 text-gray-500" />
                      ) : (
                        <Globe className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <Badge variant="outline">{group.category}</Badge>
                  </div>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-1" />
                        {group.memberCount.toLocaleString()} members
                      </span>
                      <Badge variant="secondary">Active</Badge>
                    </div>

                    {group.meetingSchedule && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {group.meetingSchedule}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {group.topics.slice(0, 3).map((topic, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {topic}
                        </Badge>
                      ))}
                      {group.topics.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{group.topics.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <Button
                      className="w-full mt-4"
                      variant={group.isPrivate ? 'outline' : 'default'}
                    >
                      {group.isPrivate ? 'Request to Join' : 'Join Group'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: 'Weekly Mindfulness Session',
                description:
                  'Join our guided group meditation and mindfulness practice',
                date: '2024-01-20',
                time: '7:00 PM EST',
                type: 'Virtual',
                attendees: 45,
              },
              {
                title: 'Anxiety Support Circle',
                description:
                  'Safe space discussion group for anxiety management',
                date: '2024-01-22',
                time: '6:30 PM EST',
                type: 'Virtual',
                attendees: 23,
              },
              {
                title: 'Mental Health First Aid Workshop',
                description:
                  'Learn how to provide initial support for mental health crises',
                date: '2024-01-25',
                time: '2:00 PM EST',
                type: 'Hybrid',
                attendees: 67,
              },
            ].map((event, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription>{event.description}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        event.type === 'Virtual' ? 'default' : 'secondary'
                      }
                    >
                      {event.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {event.attendees} attending
                    </div>
                    <Button className="w-full mt-4">Join Event</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: 'Crisis Resources',
                description:
                  'Emergency contacts and immediate support resources',
                icon: Shield,
                color: 'text-red-600 bg-red-100',
              },
              {
                title: 'Educational Articles',
                description: 'Expert-written content on mental health topics',
                icon: TrendingUp,
                color: 'text-blue-600 bg-blue-100',
              },
              {
                title: 'Self-Care Guides',
                description: 'Practical guides for daily wellness routines',
                icon: Heart,
                color: 'text-green-600 bg-green-100',
              },
            ].map((resource, index) => {
              const Icon = resource.icon
              return (
                <Card
                  key={index}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg ${resource.color} flex items-center justify-center mb-3`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Explore Resources
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
