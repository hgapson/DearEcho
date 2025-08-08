"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { 
  Target,
  Plus,
  Flame,
  Award,
  Brain
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

// Import refactored components and utilities
import { WellnessMetricCard } from "./wellness/WellnessMetricCard";
import { TodayActivities } from "./wellness/TodayActivities";
import { WellnessGoalCard } from "./wellness/WellnessGoalCard";
import { WELLNESS_METRICS, WEEKLY_PROGRESS_DATA, MOCK_WELLNESS_GOALS } from "../constants/wellness";
import { getWellnessScore, getMetricProgress, getStreakCount } from "../utils/wellness-helpers";
import { WellnessEntry, WellnessGoal } from "../types/wellness";

interface User {
  id: string;
  name: string;
  wellnessGoals?: WellnessGoal[];
}

interface WellnessTrackerProps {
  user: User | null;
  entries: WellnessEntry[];
  onAddEntry: (entry: WellnessEntry) => void;
}

export function WellnessTracker({ user, entries, onAddEntry }: WellnessTrackerProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [newEntry, setNewEntry] = useState({
    type: 'exercise' as WellnessEntry['type'],
    value: 0,
    duration: 0,
    notes: ''
  });

  const wellnessScore = getWellnessScore();

  const handleAddEntry = () => {
    if (newEntry.value <= 0) return;

    const entry: WellnessEntry = {
      id: Date.now().toString(),
      date: selectedDate.toISOString().split('T')[0],
      type: newEntry.type,
      value: newEntry.value,
      unit: WELLNESS_METRICS.find(m => m.id === newEntry.type)?.unit || '',
      duration: newEntry.duration || undefined,
      notes: newEntry.notes || undefined
    };

    onAddEntry(entry);
    setNewEntry({ type: 'exercise', value: 0, duration: 0, notes: '' });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wellness Tracker</h1>
          <p className="text-gray-600 mt-2">Monitor your holistic health and wellness journey</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{wellnessScore}</div>
            <div className="text-sm text-gray-600">Wellness Score</div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Log Activity
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log Wellness Activity</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Activity Type</Label>
                  <Select value={newEntry.type} onValueChange={(value: any) => setNewEntry({...newEntry, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exercise">Exercise</SelectItem>
                      <SelectItem value="water">Water Intake</SelectItem>
                      <SelectItem value="sleep">Sleep</SelectItem>
                      <SelectItem value="meditation">Meditation</SelectItem>
                      <SelectItem value="nutrition">Nutrition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Value</Label>
                  <Input
                    type="number"
                    placeholder="Enter value"
                    value={newEntry.value || ''}
                    onChange={(e) => setNewEntry({...newEntry, value: Number(e.target.value)})}
                  />
                </div>
                
                {(newEntry.type === 'exercise' || newEntry.type === 'meditation') && (
                  <div>
                    <Label>Duration (minutes)</Label>
                    <Input
                      type="number"
                      placeholder="Enter duration"
                      value={newEntry.duration || ''}
                      onChange={(e) => setNewEntry({...newEntry, duration: Number(e.target.value)})}
                    />
                  </div>
                )}
                
                <div>
                  <Label>Notes (optional)</Label>
                  <Textarea
                    placeholder="Add any notes about this activity..."
                    value={newEntry.notes}
                    onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                  />
                </div>
                
                <Button onClick={handleAddEntry} className="w-full">
                  Log Activity
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-4 gap-4">
            {WELLNESS_METRICS.map((metric) => (
              <WellnessMetricCard key={metric.id} metric={metric} />
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>Your wellness activities this week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={WEEKLY_PROGRESS_DATA}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="exercise" fill="#3B82F6" />
                    <Bar dataKey="meditation" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <TodayActivities />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Your wellness highlights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-blue-50">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-blue-700">Day Streak</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-green-50">
                  <div className="text-2xl font-bold text-green-600">85%</div>
                  <div className="text-sm text-green-700">Goals Met</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-purple-50">
                  <div className="text-2xl font-bold text-purple-600">240</div>
                  <div className="text-sm text-purple-700">Minutes Active</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-orange-50">
                  <div className="text-2xl font-bold text-orange-600">7.8</div>
                  <div className="text-sm text-orange-700">Avg Sleep Hours</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WELLNESS_METRICS.map((metric) => {
              const Icon = metric.icon;
              const progress = getMetricProgress(metric.id);
              
              return (
                <Card key={metric.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${metric.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{metric.name}</CardTitle>
                        <CardDescription>{metric.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Current</span>
                        <span className="font-bold">{metric.current} {metric.unit}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Target</span>
                        <span className="font-bold">{metric.target} {metric.unit}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Streak</span>
                        <Badge variant="outline">
                          <Flame className="w-3 h-3 mr-1" />
                          {getStreakCount(metric.type)} days
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Wellness Goals</h2>
            <Button>
              <Target className="w-4 h-4 mr-2" />
              Create New Goal
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {MOCK_WELLNESS_GOALS.map((goal) => (
              <WellnessGoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>30-Day Trend</CardTitle>
                <CardDescription>Your wellness metrics over the last month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={WEEKLY_PROGRESS_DATA}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="exercise" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="sleep" stroke="#8B5CF6" strokeWidth={2} />
                    <Line type="monotone" dataKey="meditation" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wellness Insights</CardTitle>
                <CardDescription>Key trends and patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                    <div className="p-2 rounded-full bg-green-100 text-green-600">
                      <Brain className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-green-800">Meditation Improving</h4>
                      <p className="text-sm text-green-700">Your meditation consistency has increased by 40% this month</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-800">Exercise Goal Met</h4>
                      <p className="text-sm text-blue-700">You've exceeded your weekly exercise target for 3 weeks running</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Insights</CardTitle>
              <CardDescription>Personalized recommendations based on your wellness data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <h4 className="font-medium text-purple-800 mb-2">Sleep Quality Impact</h4>
                  <p className="text-sm text-purple-700">Your exercise performance is 25% better on days when you sleep 8+ hours. Consider maintaining a consistent bedtime routine.</p>
                </div>
                
                <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                  <h4 className="font-medium text-orange-800 mb-2">Hydration Reminder</h4>
                  <p className="text-sm text-orange-700">You tend to drink less water on busy workdays. Setting hourly reminders could help you reach your daily goal.</p>
                </div>
                
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">Meditation Benefits</h4>
                  <p className="text-sm text-green-700">Your stress levels are 30% lower on days you meditate. Consider extending your morning session by 5 minutes.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}