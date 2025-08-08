import { WELLNESS_METRICS, MOCK_WELLNESS_ENTRIES } from "../constants/wellness";
import { WellnessEntry } from "../types/wellness";

export const getMetricProgress = (metricId: string): number => {
  const metric = WELLNESS_METRICS.find(m => m.id === metricId);
  if (!metric) return 0;
  return Math.min((metric.current / metric.target) * 100, 100);
};

export const getStreakCount = (type: WellnessEntry['type']): number => {
  // Mock streak calculation - in real app, this would calculate actual streaks
  return Math.floor(Math.random() * 14) + 1;
};

export const getTodayEntries = (): WellnessEntry[] => {
  const today = new Date().toISOString().split('T')[0];
  return MOCK_WELLNESS_ENTRIES.filter(entry => entry.date === today);
};

export const getWellnessScore = (): number => {
  // Mock wellness score calculation - in real app, this would be computed from actual data
  return 78;
};

export const findMetricByType = (type: WellnessEntry['type']) => {
  return WELLNESS_METRICS.find(m => m.type === type);
};