'use client'

import { Card, CardContent, CardHeader } from '../ui/card'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { WellnessMetric } from '../../types/wellness'
import { getMetricProgress, getStreakCount } from '../../utils/wellness-helpers'

interface WellnessMetricCardProps {
  metric: WellnessMetric
}

export function WellnessMetricCard({ metric }: WellnessMetricCardProps) {
  const Icon = metric.icon
  const progress = getMetricProgress(metric.id)
  const streak = getStreakCount(metric.type)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-lg ${metric.color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <Badge variant="outline">{streak} day streak</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <h3 className="font-medium">{metric.name}</h3>
            <p className="text-sm text-gray-600">{metric.description}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>
                {metric.current}/{metric.target} {metric.unit}
              </span>
            </div>
            <Progress value={progress} />
          </div>

          <div className="text-xs text-gray-500">
            {progress >= 100
              ? '🎉 Goal achieved!'
              : `${Math.round(progress)}% complete`}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
