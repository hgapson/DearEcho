"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  BookOpen, 
  Video, 
  Headphones, 
  Star,
  Clock,
  Users,
  Search,
  Filter,
  Play,
  Download,
  Bookmark,
  CheckCircle,
  Award,
  Zap,
  Heart,
  Brain,
  Moon,
  Target
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface User {
  id: string;
  name: string;
  subscriptionType?: 'free' | 'premium' | 'professional';
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  rating: number;
  enrollCount: number;
  price: number;
  isPremium: boolean;
  modules: CourseModule[];
  thumbnail: string;
  tags: string[];
  completionRate?: number;
  isEnrolled?: boolean;
}

interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: number;
  content: string;
  videoUrl?: string;
  audioUrl?: string;
  resources: string[];
  isCompleted: boolean;
  isLocked?: boolean;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: number;
  category: string;
  tags: string[];
  publishedAt: string;
  rating: number;
  isPremium: boolean;
  thumbnail: string;
  isBookmarked?: boolean;
}

interface AudioContent {
  id: string;
  title: string;
  description: string;
  creator: string;
  duration: number;
  category: string;
  type: 'meditation' | 'podcast' | 'audiobook' | 'soundscape';
  rating: number;
  playCount: number;
  isPremium: boolean;
  thumbnail: string;
  tags: string[];
}

interface ContentLibraryProps {
  user: User | null;
  courses: Course[];
}

export function ContentLibrary({ user, courses }: ContentLibraryProps) {
  const [activeTab, setActiveTab] = useState('courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Mock data for demonstration
  const mockCourses: Course[] = [
    {
      id: '1',
      title: 'Mindfulness for Beginners',
      description: 'Learn the fundamentals of mindfulness meditation and how to integrate it into your daily life.',
      instructor: 'Dr. Sarah Wilson',
      duration: 480, // 8 hours
      difficulty: 'beginner',
      category: 'Mindfulness',
      rating: 4.8,
      enrollCount: 2847,
      price: 49,
      isPremium: false,
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop',
      tags: ['meditation', 'stress-relief', 'mindfulness'],
      completionRate: 65,
      isEnrolled: true,
      modules: [
        {
          id: 'm1',
          title: 'Introduction to Mindfulness',
          description: 'Understanding what mindfulness is and its benefits',
          duration: 45,
          content: 'Comprehensive introduction to mindfulness principles...',
          videoUrl: '/videos/intro-mindfulness.mp4',
          resources: ['Mindfulness Guide PDF', 'Practice Schedule'],
          isCompleted: true
        },
        {
          id: 'm2',
          title: 'Basic Breathing Techniques',
          description: 'Learn fundamental breathing exercises for calm and focus',
          duration: 60,
          content: 'Step-by-step breathing techniques...',
          videoUrl: '/videos/breathing-techniques.mp4',
          resources: ['Breathing Exercise Audio', 'Timer App'],
          isCompleted: true
        },
        {
          id: 'm3',
          title: 'Body Scan Meditation',
          description: 'Progressive relaxation and body awareness practice',
          duration: 75,
          content: 'Guided body scan meditation techniques...',
          videoUrl: '/videos/body-scan.mp4',
          resources: ['Body Scan Audio Guide', 'Practice Log'],
          isCompleted: false
        }
      ]
    },
    {
      id: '2',
      title: 'Cognitive Behavioral Therapy Essentials',
      description: 'Understand CBT principles and learn practical techniques for managing thoughts and emotions.',
      instructor: 'Dr. Michael Chen',
      duration: 720, // 12 hours
      difficulty: 'intermediate',
      category: 'Therapy',
      rating: 4.9,
      enrollCount: 1423,
      price: 89,
      isPremium: true,
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=225&fit=crop',
      tags: ['cbt', 'therapy', 'mental-health'],
      completionRate: 0,
      isEnrolled: false,
      modules: []
    },
    {
      id: '3',
      title: 'Sleep Hygiene & Better Rest',
      description: 'Comprehensive guide to improving sleep quality and establishing healthy sleep patterns.',
      instructor: 'Dr. Lisa Rodriguez',
      duration: 300, // 5 hours
      difficulty: 'beginner',
      category: 'Sleep',
      rating: 4.7,
      enrollCount: 3241,
      price: 39,
      isPremium: false,
      thumbnail: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=225&fit=crop',
      tags: ['sleep', 'wellness', 'health'],
      completionRate: 0,
      isEnrolled: false,
      modules: []
    }
  ];

  const mockArticles: Article[] = [
    {
      id: '1',
      title: 'Understanding Anxiety: Signs, Symptoms, and Solutions',
      excerpt: 'A comprehensive guide to recognizing anxiety disorders and evidence-based treatment approaches.',
      author: 'Dr. Emma Thompson',
      readTime: 12,
      category: 'Mental Health',
      tags: ['anxiety', 'symptoms', 'treatment'],
      publishedAt: '2024-01-10',
      rating: 4.6,
      isPremium: false,
      thumbnail: 'https://images.unsplash.com/photo-1559757174-f716246fbb21?w=400&h=225&fit=crop',
      isBookmarked: true
    },
    {
      id: '2',
      title: 'The Science of Gratitude and Mental Well-being',
      excerpt: 'Research-backed insights into how practicing gratitude can transform your mental health.',
      author: 'Prof. James Miller',
      readTime: 8,
      category: 'Research',
      tags: ['gratitude', 'research', 'wellbeing'],
      publishedAt: '2024-01-08',
      rating: 4.8,
      isPremium: true,
      thumbnail: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&h=225&fit=crop',
      isBookmarked: false
    },
    {
      id: '3',
      title: 'Building Resilience in Times of Change',
      excerpt: 'Practical strategies for developing emotional resilience and adapting to life transitions.',
      author: 'Dr. Rachel Green',
      readTime: 15,
      category: 'Personal Growth',
      tags: ['resilience', 'change', 'adaptation'],
      publishedAt: '2024-01-05',
      rating: 4.7,
      isPremium: false,
      thumbnail: 'https://images.unsplash.com/photo-1494059980473-813e73ee784b?w=400&h=225&fit=crop',
      isBookmarked: false
    }
  ];

  const mockAudioContent: AudioContent[] = [
    {
      id: '1',
      title: '10-Minute Morning Meditation',
      description: 'Start your day with clarity and focus through this guided meditation session.',
      creator: 'Meditation Master',
      duration: 600, // 10 minutes
      category: 'Meditation',
      type: 'meditation',
      rating: 4.9,
      playCount: 15420,
      isPremium: false,
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop',
      tags: ['morning', 'meditation', 'focus']
    },
    {
      id: '2',
      title: 'Sleep Stories: Ocean Waves',
      description: 'Drift off to peaceful sleep with calming ocean sounds and gentle narration.',
      creator: 'Sleep Stories Co.',
      duration: 1800, // 30 minutes
      category: 'Sleep',
      type: 'soundscape',
      rating: 4.8,
      playCount: 8932,
      isPremium: true,
      thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=225&fit=crop',
      tags: ['sleep', 'ocean', 'relaxation']
    },
    {
      id: '3',
      title: 'The Mental Health Podcast: Episode 45',
      description: 'Expert discussion on managing workplace stress and maintaining work-life balance.',
      creator: 'Mental Health Experts',
      duration: 2100, // 35 minutes
      category: 'Podcast',
      type: 'podcast',
      rating: 4.7,
      playCount: 5621,
      isPremium: false,
      thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=225&fit=crop',
      tags: ['workplace', 'stress', 'balance']
    }
  ];

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'all' || course.difficulty === difficultyFilter;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'mindfulness': return <Brain className="w-4 h-4" />;
      case 'therapy': return <Heart className="w-4 h-4" />;
      case 'sleep': return <Moon className="w-4 h-4" />;
      case 'meditation': return <Target className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Library</h1>
          <p className="text-gray-600 mt-2">Comprehensive mental health education and resources</p>
        </div>
        {user?.subscriptionType === 'free' && (
          <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600">
            <Award className="w-4 h-4 mr-2" />
            Upgrade for Premium Content
          </Button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search courses, articles, and audio content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Mindfulness">Mindfulness</SelectItem>
              <SelectItem value="Therapy">Therapy</SelectItem>
              <SelectItem value="Sleep">Sleep</SelectItem>
              <SelectItem value="Mental Health">Mental Health</SelectItem>
              <SelectItem value="Personal Growth">Personal Growth</SelectItem>
            </SelectContent>
          </Select>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="audio">Audio Content</TabsTrigger>
          <TabsTrigger value="my-learning">My Learning</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="relative">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {course.isPremium && (
                    <Badge className="absolute top-3 right-3 bg-yellow-500 text-yellow-900">
                      Premium
                    </Badge>
                  )}
                  {course.isEnrolled && (
                    <Badge className="absolute top-3 left-3 bg-green-500">
                      Enrolled
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-t-lg flex items-center justify-center">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setSelectedCourse(course)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(course.category)}
                      <Badge variant="outline">{course.category}</Badge>
                    </div>
                    <Badge className={getDifficultyColor(course.difficulty)}>
                      {course.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>By {course.instructor}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-current text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatDuration(course.duration)}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {course.enrollCount.toLocaleString()}
                        </span>
                      </div>
                      <span className="font-medium text-lg">
                        {course.price === 0 ? 'Free' : `$${course.price}`}
                      </span>
                    </div>

                    {course.isEnrolled && course.completionRate !== undefined && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.completionRate}%</span>
                        </div>
                        <Progress value={course.completionRate} />
                      </div>
                    )}

                    <div className="flex space-x-2">
                      {course.isEnrolled ? (
                        <Button className="flex-1">
                          Continue Learning
                        </Button>
                      ) : (
                        <Button className="flex-1">
                          {course.price === 0 ? 'Enroll Free' : `Enroll - $${course.price}`}
                        </Button>
                      )}
                      <Button variant="outline" size="icon">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="articles" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img 
                    src={article.thumbnail} 
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {article.isPremium && (
                    <Badge className="absolute top-3 right-3 bg-yellow-500 text-yellow-900">
                      Premium
                    </Badge>
                  )}
                  {article.isBookmarked && (
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="absolute top-3 left-3"
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </Button>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{article.category}</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span className="text-sm">{article.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription>{article.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>By {article.author}</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime} min read</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {article.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button className="w-full">
                      Read Article
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audio" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAudioContent.map((audio) => (
              <Card key={audio.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={audio.thumbnail} 
                    alt={audio.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {audio.isPremium && (
                    <Badge className="absolute top-3 right-3 bg-yellow-500 text-yellow-900">
                      Premium
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-t-lg flex items-center justify-center">
                    <Button size="lg" className="rounded-full">
                      <Play className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{audio.category}</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span className="text-sm">{audio.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{audio.title}</CardTitle>
                  <CardDescription>{audio.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>By {audio.creator}</span>
                      <div className="flex items-center space-x-1">
                        <Headphones className="w-4 h-4" />
                        <span>{audio.playCount.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatDuration(Math.floor(audio.duration / 60))}
                      </span>
                      <Badge variant="secondary">{audio.type}</Badge>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button className="flex-1">
                        <Play className="w-4 h-4 mr-2" />
                        Play
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-learning" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Your overall learning statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Courses Enrolled</span>
                    <span className="font-bold">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Courses Completed</span>
                    <span className="font-bold">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Articles Read</span>
                    <span className="font-bold">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Audio Hours</span>
                    <span className="font-bold">15.5h</span>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <span>Overall Progress</span>
                      <span>67%</span>
                    </div>
                    <Progress value={67} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Milestones you've unlocked</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: 'First Course', description: 'Completed your first course', earned: true },
                    { title: 'Avid Reader', description: 'Read 20+ articles', earned: true },
                    { title: 'Meditation Master', description: 'Complete 10 meditation sessions', earned: false },
                    { title: 'Knowledge Seeker', description: 'Enroll in 5 courses', earned: false }
                  ].map((achievement, index) => (
                    <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg border ${
                      achievement.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className={`p-2 rounded-full ${
                        achievement.earned ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {achievement.earned ? <CheckCircle className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
              <CardDescription>Pick up where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCourses.filter(c => c.isEnrolled).map((course) => (
                  <div key={course.id} className="flex items-center space-x-4 p-4 rounded-lg border hover:shadow-md transition-shadow">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{course.title}</h4>
                      <p className="text-sm text-gray-600">By {course.instructor}</p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{course.completionRate}%</span>
                        </div>
                        <Progress value={course.completionRate} className="h-2" />
                      </div>
                    </div>
                    <Button>Continue</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Course Preview Dialog */}
      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedCourse?.title}</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <div className="space-y-6">
              <img 
                src={selectedCourse.thumbnail} 
                alt={selectedCourse.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Course Overview</h3>
                  <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Instructor:</span>
                      <span>{selectedCourse.instructor}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Duration:</span>
                      <span>{formatDuration(selectedCourse.duration)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Difficulty:</span>
                      <Badge className={getDifficultyColor(selectedCourse.difficulty)}>
                        {selectedCourse.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Course Modules</h3>
                  <div className="space-y-2">
                    {selectedCourse.modules.map((module, index) => (
                      <div key={module.id} className="flex items-start space-x-3 p-3 rounded border">
                        <div className={`p-1 rounded-full ${
                          module.isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {module.isCompleted ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{module.title}</h4>
                          <p className="text-xs text-gray-600">{formatDuration(module.duration)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-2xl font-bold">
                  {selectedCourse.price === 0 ? 'Free' : `$${selectedCourse.price}`}
                </span>
                <div className="space-x-2">
                  <Button variant="outline">Preview First Module</Button>
                  <Button>
                    {selectedCourse.isEnrolled ? 'Continue Learning' : 'Enroll Now'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}