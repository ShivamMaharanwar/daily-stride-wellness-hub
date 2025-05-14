
import React from 'react';
import { useFitness } from '@/context/FitnessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WeightForm } from '@/components/forms/WeightForm';
import { format, subDays } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StatCard } from '@/components/ui/StatCard';
import { Weight } from 'lucide-react';

const WeightTracking = () => {
  const { weightLogs, user } = useFitness();

  // Sort weight logs by date
  const sortedWeightLogs = [...weightLogs].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Calculate statistics
  let initialWeight = sortedWeightLogs.length > 0 ? sortedWeightLogs[0].weight : user.weight;
  let currentWeight = sortedWeightLogs.length > 0 ? sortedWeightLogs[sortedWeightLogs.length - 1].weight : user.weight;
  let weightChange = currentWeight - initialWeight;
  let percentChange = initialWeight > 0 ? (weightChange / initialWeight) * 100 : 0;

  // Prepare chart data
  const chartData = sortedWeightLogs.map(log => ({
    date: format(new Date(log.date), 'MMM d'),
    weight: log.weight
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Weight Tracking</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Current Weight"
          value={`${currentWeight.toFixed(1)} kg`}
          icon={<Weight size={24} />}
        />
        <StatCard
          title="Weight Change"
          value={`${weightChange >= 0 ? '+' : ''}${weightChange.toFixed(1)} kg`}
          trend={weightChange < 0 ? 'down' : weightChange > 0 ? 'up' : 'neutral'}
          trendValue={`${Math.abs(percentChange).toFixed(1)}%`}
        />
        <StatCard
          title="Starting Weight"
          value={`${initialWeight.toFixed(1)} kg`}
          description="First logged weight"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Weight History</CardTitle>
              <CardDescription>
                Track your weight changes over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        padding={{ left: 20, right: 20 }}
                      />
                      <YAxis 
                        domain={[
                          (dataMin: number) => Math.floor(dataMin - 2),
                          (dataMax: number) => Math.ceil(dataMax + 2)
                        ]}
                      />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="#9b87f5"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#9b87f5' }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-500">
                    No weight data available yet. Start logging to see your progress!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Log Weight</CardTitle>
            <CardDescription>
              Track your weight regularly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WeightForm />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Weight History</CardTitle>
        </CardHeader>
        <CardContent>
          {sortedWeightLogs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-right">Weight (kg)</th>
                    <th className="px-4 py-2 text-right">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedWeightLogs
                    .slice()
                    .reverse()
                    .map((log, index, array) => {
                      const prevLog = index < array.length - 1 ? array[index + 1] : null;
                      const change = prevLog ? log.weight - prevLog.weight : 0;
                      
                      return (
                        <tr key={format(log.date, 'yyyy-MM-dd')} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{format(log.date, 'MMM d, yyyy')}</td>
                          <td className="px-4 py-3 text-right font-medium">{log.weight.toFixed(1)}</td>
                          <td className="px-4 py-3 text-right">
                            {index < array.length - 1 && (
                              <span className={`${change < 0 ? 'text-green-500' : change > 0 ? 'text-red-500' : 'text-gray-500'}`}>
                                {change > 0 ? '+' : ''}
                                {change.toFixed(1)}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-10 text-center text-gray-500">
              No weight logs yet. Start tracking your weight above!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WeightTracking;
