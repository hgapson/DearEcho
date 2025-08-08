export interface WellnessGoal {
  id: string;
  title: string;
  description: string;
  category: 'mood' | 'exercise' | 'sleep' | 'meditation' | 'journaling' | 'social';
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  isCompleted: boolean;
  createdAt: string;
}

export interface WellnessEntry {
  id: string;
  date: string;
  type: 'exercise' | 'sleep' | 'water' | 'meditation' | 'nutrition';
  value: number;
  unit: string;
  notes?: string;
  duration?: number;
}

export interface WellnessMetric {
  id: string;
  name: string;
  icon: any;
  color: string;
  unit: string;
  target: number;
  current: number;
  dailyTarget: number;
  description: string;
  type: WellnessEntry['type'];
}

export interface WeeklyProgressData {
  day: string;
  exercise: number;
  sleep: number;
  meditation: number;
  water: number;
  nutrition: number;
}