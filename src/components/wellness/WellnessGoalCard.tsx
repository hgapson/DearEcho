'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { Award } from 'lucide-react'
import { WellnessGoal } from '../../types/wellness'

interface WellnessGoalCardProps {
  goal: WellnessGoal
}

export function WellnessGoalCard({ goal }: WellnessGoalCardProps) {
  const progress = (goal.currentValue / goal.targetValue) * 100
  const isCompleted = goal.currentValue >= goal.targetValue

  return (
    <Card
      className={`border-l-4 ${
        isCompleted ? 'border-l-green-500 bg-green-50' : 'border-l-blue-500'
      }`}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{goal.title}</CardTitle>
            <CardDescription>{goal.description}</CardDescription>
          </div>
          {isCompleted && (
            <Badge className="bg-green-500">
              <Award className="w-3 h-3 mr-1" />
              Completed
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="font-bold">
              {goal.currentValue}/{goal.targetValue} {goal.unit}
            </span>
          </div>
          <Progress value={Math.min(progress, 100)} />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Deadline: {new Date(goal.deadline).toLocaleDateString()}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
