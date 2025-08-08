import { 
  Activity,
  Droplets, 
  Moon, 
  Utensils,
  Brain
} from "lucide-react";
import { WellnessMetric, WellnessEntry, WellnessGoal, WeeklyProgressData } from "../types/wellness";

export const WELLNESS_METRICS: WellnessMetric[] = [
  {
    id: 'exercise',
    name: 'Exercise',
    icon: Activity,
    color: 'text-blue-600 bg-blue-100',
    unit: 'minutes',
    target: 150, // weekly target
    current: 180,
    dailyTarget: 30,
    description: 'Weekly exercise goal',
    type: 'exercise'
  },
  {
    id: 'water',
    name: 'Hydration',
    icon: Droplets,
    color: 'text-cyan-600 bg-cyan-100',
    unit: 'glasses',
    target: 8, // daily target
    current: 6,
    dailyTarget: 8,
    description: 'Daily water intake',
    type: 'water'
  },
  {
    id: 'sleep',
    name: 'Sleep',
    icon: Moon,
    color: 'text-purple-600 bg-purple-100',
    unit: 'hours',
    target: 8, // daily target
    current: 7.5,
    dailyTarget: 8,
    description: 'Daily sleep goal',
    type: 'sleep'
  },
  {
    id: 'meditation',
    name: 'Meditation',
    icon: Brain,
    color: 'text-green-600 bg-green-100',
    unit: 'minutes',
    target: 140, // weekly target
    current: 100,
    dailyTarget: 20,
    description: 'Weekly meditation goal',
    type: 'meditation'
  },
  {
    id: 'nutrition',
    name: 'Nutrition',
    icon: Utensils,
    color: 'text-orange-600 bg-orange-100',
    unit: 'score',
    target: 80, // daily score
    current: 75,
    dailyTarget: 80,
    description: 'Daily nutrition score',
    type: 'nutrition'
  }
];

export const MOCK_WELLNESS_ENTRIES: WellnessEntry[] = [
  { id: '1', date: '2024-01-15', type: 'exercise', value: 45, unit: 'minutes', duration: 45, notes: 'Morning jog in the park' },
  { id: '2', date: '2024-01-15', type: 'water', value: 8, unit: 'glasses', notes: 'Staying hydrated' },
  { id: '3', date: '2024-01-15', type: 'sleep', value: 7.5, unit: 'hours', notes: 'Good quality sleep' },
  { id: '4', date: '2024-01-14', type: 'meditation', value: 20, unit: 'minutes', duration: 20, notes: 'Evening mindfulness session' },
  { id: '5', date: '2024-01-14', type: 'nutrition', value: 85, unit: 'score', notes: 'Balanced meals throughout the day' }
];

export const WEEKLY_PROGRESS_DATA: WeeklyProgressData[] = [
  { day: 'Mon', exercise: 30, sleep: 7, meditation: 15, water: 8, nutrition: 80 },
  { day: 'Tue', exercise: 45, sleep: 7.5, meditation: 20, water: 7, nutrition: 85 },
  { day: 'Wed', exercise: 0, sleep: 6, meditation: 10, water: 6, nutrition: 70 },
  { day: 'Thu', exercise: 60, sleep: 8, meditation: 25, water: 8, nutrition: 90 },
  { day: 'Fri', exercise: 30, sleep: 7, meditation: 20, water: 7, nutrition: 75 },
  { day: 'Sat', exercise: 90, sleep: 9, meditation: 30, water: 9, nutrition: 85 },
  { day: 'Sun', exercise: 45, sleep: 8.5, meditation: 25, water: 8, nutrition: 80 }
];

export const MOCK_WELLNESS_GOALS: WellnessGoal[] = [
  {
    id: '1',
    title: 'Exercise 5 days a week',
    description: 'Maintain regular physical activity for better health',
    category: 'exercise',
    targetValue: 5,
    currentValue: 4,
    unit: 'days',
    deadline: '2024-02-15',
    isCompleted: false,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    title: 'Drink 8 glasses of water daily',
    description: 'Stay properly hydrated throughout the day',
    category: 'exercise',
    targetValue: 8,
    currentValue: 7,
    unit: 'glasses',
    deadline: '2024-02-01',
    isCompleted: false,
    createdAt: '2024-01-01'
  },
  {
    id: '3',
    title: 'Meditate for 20 minutes daily',
    description: 'Build a consistent mindfulness practice',
    category: 'meditation',
    targetValue: 20,
    currentValue: 15,
    unit: 'minutes',
    deadline: '2024-01-31',
    isCompleted: false,
    createdAt: '2024-01-01'
  }
];