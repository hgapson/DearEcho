"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Lightbulb,
  Activity,
  Heart,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  BarChart3,
  MessageSquare,
  Star
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

interface User {
  id: string;
  name: string;
  subscriptionType?: 'free' | 'premium' | 'professional';
}

interface MoodEntry {
  id: string;
  date: string;
  mood: number;
  emotion: string;
  note?: string;
  triggers?: string[];
  energy: number;
  sleep: number;
  stress: number;
  activities?: string[];
}

interface WellnessEntry {
  id: string;
  date: string;
  type: 'exercise' | 'sleep' | 'water' | 'meditation' | 'nutrition';
  value: number;
  unit: string;
  notes?: string;
  duration?: number;
}

interface AIInsight {
  id: string;
  type: 'pattern' | 'recommendation' | 'warning' | 'achievement' | 'prediction';
  title: string;
  description: string;
  confidence: number;
  priority: 'low' | 'medium' | 'high';
  actionable: boolean;
  category: string;
  timestamp: string;
}

interface AIInsightsProps {
  user: User | null;
  moodEntries: MoodEntry[];
  wellnessEntries: WellnessEntry[];
}

export function AIInsights({ user, moodEntries, wellnessEntries }: AIInsightsProps) {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);

  // Generate mock AI insights based on user data
  useEffect(() => {
    generateInsights();
  }, [moodEntries, wellnessEntries]);

  const generateInsights = () => {
    setIsLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const generatedInsights: AIInsight[] = [
        {
          id: '1',
          type: 'pattern',
          title: 'Weekly Mood Pattern Detected',
          description: 'Your mood tends to dip on Mondays and improve throughout the week. Consider implementing a Sunday evening routine to prepare for Monday.',
          confidence: 87,
          priority: 'medium',
          actionable: true,
          category: 'Mood Patterns',
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          type: 'recommendation',
          title: 'Meditation Impact',
          description: 'Days when you meditate show 23% higher mood scores. Your optimal meditation time appears to be 15-20 minutes in the morning.',
          confidence: 92,
          priority: 'high',
          actionable: true,
          category: 'Wellness Activities',
          timestamp: new Date().toISOString()
        },
        {
          id: '3',
          type: 'achievement',
          title: 'Stress Management Improvement',
          description: 'Your average stress levels have decreased by 18% over the past month. Keep up the great work with your current strategies!',
          confidence: 95,
          priority: 'low',
          actionable: false,
          category: 'Progress',
          timestamp: new Date().toISOString()
        },
        {
          id: '4',
          type: 'warning',
          title: 'Sleep Pattern Concern',
          description: 'Your sleep quality has been declining for 5 consecutive days. Poor sleep is strongly correlated with lower mood scores in your data.',
          confidence: 84,
          priority: 'high',
          actionable: true,
          category: 'Sleep Health',
          timestamp: new Date().toISOString()
        },
        {
          id: '5',
          type: 'prediction',
          title: 'Weekend Mood Forecast',
          description: 'Based on your patterns, you\'re likely to experience improved mood this weekend. Perfect time for social activities or outdoor exercise.',
          confidence: 76,
          priority: 'medium',
          actionable: true,
          category: 'Predictions',
          timestamp: new Date().toISOString()
        }
      ];
      
      setInsights(generatedInsights);
      setIsLoading(false);
    }, 1500);
  };

  // Mock data for charts
  const moodTrendData = [
    { date: '2024-01-01', mood: 6, energy: 7, stress: 4 },
    { date: '2024-01-02', mood: 7, energy: 8, stress: 3 },
    { date: '2024-01-03', mood: 5, energy: 6, stress: 6 },
    { date: '2024-01-04', mood: 8, energy: 9, stress: 2 },
    { date: '2024-01-05', mood: 7, energy: 7, stress: 4 },
    { date: '2024-01-06', mood: 9, energy: 9, stress: 2 },
    { date: '2024-01-07', mood: 8, energy: 8, stress: 3 }
  ];

  const emotionDistribution = [
    { name: 'Happy', value: 35, color: '#10B981' },
    { name: 'Calm', value: 25, color: '#3B82F6' },
    { name: 'Anxious', value: 20, color: '#F59E0B' },
    { name: 'Sad', value: 10, color: '#EF4444' },
    { name: 'Excited', value: 10, color: '#8B5CF6' }
  ];

  const wellnessRadarData = [
    { subject: 'Sleep', A: 80, fullMark: 100 },
    { subject: 'Exercise', A: 65, fullMark: 100 },
    { subject: 'Nutrition', A: 75, fullMark: 100 },
    { subject: 'Meditation', A: 90, fullMark: 100 },
    { subject: 'Social', A: 60, fullMark: 100 },
    { subject: 'Work-Life', A: 70, fullMark: 100 }
  ];

  const correlationData = [
    { factor: 'Sleep Quality', correlation: 0.78, impact: 'Strong Positive' },
    { factor: 'Exercise', correlation: 0.65, impact: 'Moderate Positive' },
    { factor: 'Meditation', correlation: 0.72, impact: 'Strong Positive' },
    { factor: 'Social Activities', correlation: 0.55, impact: 'Moderate Positive' },
    { factor: 'Work Stress', correlation: -0.68, impact: 'Strong Negative' },
    { factor: 'Screen Time', correlation: -0.42, impact: 'Moderate Negative' }
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'pattern': return <BarChart3 className="w-5 h-5" />;
      case 'recommendation': return <Lightbulb className="w-5 h-5" />;
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'achievement': return <CheckCircle className="w-5 h-5" />;
      case 'prediction': return <TrendingUp className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'pattern': return 'text-blue-600 bg-blue-100';
      case 'recommendation': return 'text-yellow-600 bg-yellow-100';
      case 'warning': return 'text-red-600 bg-red-100';
      case 'achievement': return 'text-green-600 bg-green-100';
      case 'prediction': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive">High Priority</Badge>;
      case 'medium': return <Badge variant="default">Medium Priority</Badge>;
      case 'low': return <Badge variant="secondary">Low Priority</Badge>;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Insights</h1>
          <p className="text-gray-600 mt-2">Personalized mental health analytics powered by artificial intelligence</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            onClick={generateInsights} 
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Brain className="w-4 h-4 mr-2" />
            {isLoading ? 'Analyzing...' : 'Refresh Insights'}
          </Button>
          {user?.subscriptionType === 'free' && (
            <Button variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50">
              <Star className="w-4 h-4 mr-2" />
              Upgrade for More Insights
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="correlations">Correlations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mood Score</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">7.4</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline w-3 h-3 mr-1" />
                  +0.8 from last week
                </p>
                <Progress value={74} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Wellness Score</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">8.1</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline w-3 h-3 mr-1" />
                  +1.2 from last month
                </p>
                <Progress value={81} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Insights Generated</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{insights.length}</div>
                <p className="text-xs text-muted-foreground">
                  <Clock className="inline w-3 h-3 mr-1" />
                  Updated just now
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mood Trends</CardTitle>
                <CardDescription>Your emotional patterns over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={moodTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="mood" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="energy" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="stress" stroke="#EF4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emotion Distribution</CardTitle>
                <CardDescription>Breakdown of your emotional states</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={emotionDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {emotionDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
              <CardDescription>AI-generated insights from your data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.slice(0, 3).map((insight) => (
                  <div key={insight.id} className="flex items-start space-x-4 p-4 rounded-lg border bg-gray-50">
                    <div className={`p-2 rounded-lg ${getInsightColor(insight.type)}`}>
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{insight.title}</h4>
                        <div className="flex items-center space-x-2">
                          {getPriorityBadge(insight.priority)}
                          <Badge variant="outline">{insight.confidence}% confidence</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{insight.description}</p>
                      {insight.actionable && (
                        <Button variant="link" className="p-0 h-auto font-normal text-blue-600">
                          View Recommendations →
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Wellness Balance</CardTitle>
                <CardDescription>Your overall wellness across different dimensions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={wellnessRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Wellness" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Patterns</CardTitle>
                <CardDescription>How your mood varies throughout the week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => {
                    const score = Math.floor(Math.random() * 40) + 60; // Mock data
                    return (
                      <div key={day} className="flex items-center justify-between">
                        <span className="text-sm font-medium w-20">{day}</span>
                        <div className="flex-1 mx-4">
                          <Progress value={score} className="h-2" />
                        </div>
                        <span className="text-sm text-gray-600 w-12">{score}%</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pattern Insights</CardTitle>
              <CardDescription>Detected patterns in your mental health data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.filter(i => i.type === 'pattern').map((insight) => (
                  <div key={insight.id} className="flex items-start space-x-4 p-4 rounded-lg border">
                    <div className={`p-2 rounded-lg ${getInsightColor(insight.type)}`}>
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{insight.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                      <div className="flex items-center space-x-4 mt-3">
                        <Badge variant="outline">{insight.confidence}% confidence</Badge>
                        <Badge variant="secondary">{insight.category}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid gap-4">
            {insights.filter(i => i.type === 'recommendation').map((insight) => (
              <Card key={insight.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getInsightColor(insight.type)}`}>
                        {getInsightIcon(insight.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                        <CardDescription>{insight.category}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getPriorityBadge(insight.priority)}
                      <Badge variant="outline">{insight.confidence}% confidence</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{insight.description}</p>
                  <div className="flex space-x-3">
                    <Button size="sm">
                      <Target className="w-4 h-4 mr-2" />
                      Create Goal
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Reminder
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mood Forecast</CardTitle>
              <CardDescription>AI predictions for your upcoming mental health trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.filter(i => i.type === 'prediction').map((insight) => (
                  <div key={insight.id} className="flex items-start space-x-4 p-4 rounded-lg border bg-purple-50">
                    <div className={`p-2 rounded-lg ${getInsightColor(insight.type)}`}>
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{insight.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                      <div className="flex items-center space-x-4 mt-3">
                        <Badge variant="outline">{insight.confidence}% confidence</Badge>
                        <span className="text-xs text-gray-500">
                          Based on {Math.floor(Math.random() * 30) + 30} days of data
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="correlations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Factor Correlations</CardTitle>
              <CardDescription>How different activities and factors affect your mood</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {correlationData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        item.correlation > 0 ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <span className="font-medium">{item.factor}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">{item.impact}</span>
                      <Badge variant={Math.abs(item.correlation) > 0.6 ? 'default' : 'secondary'}>
                        {Math.abs(item.correlation).toFixed(2)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}