"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Activity } from "lucide-react";
import { getTodayEntries, findMetricByType } from "../../utils/wellness-helpers";

export function TodayActivities() {
  const todayEntries = getTodayEntries();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Activities</CardTitle>
        <CardDescription>What you've logged today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {todayEntries.length > 0 ? (
            todayEntries.map((entry) => {
              const metric = findMetricByType(entry.type);
              const Icon = metric?.icon || Activity;
              
              return (
                <div key={entry.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className={`p-2 rounded-lg ${metric?.color || 'text-gray-600 bg-gray-100'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium capitalize">{entry.type}</div>
                    <div className="text-sm text-gray-600">
                      {entry.value} {entry.unit}
                      {entry.duration && ` • ${entry.duration} min`}
                    </div>
                    {entry.notes && (
                      <div className="text-xs text-gray-500 mt-1">{entry.notes}</div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No activities logged today</p>
              <p className="text-sm">Start tracking your wellness journey!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}