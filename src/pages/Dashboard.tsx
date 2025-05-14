
import React from 'react';
import { useFitness } from '@/context/FitnessContext';
import { StatCard } from '@/components/ui/StatCard';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { BarChart, Activity, Dumbbell, Weight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const { 
    user, 
    getTodaysStats, 
    getRemainingCalories, 
    weightLogs,
  } = useFitness();
  
  const todaysStats = getTodaysStats();
  const remainingCalories = getRemainingCalories();
  
  // Calculate percentages for progress rings
  const stepsPercentage = todaysStats ? Math.min(100, (todaysStats.steps / user.dailyGoals.steps) * 100) : 0;
  const activeMinutesPercentage = todaysStats ? Math.min(100, (todaysStats.activeMinutes / 60) * 100) : 0;
  const workoutsPercentage = todaysStats ? Math.min(100, (todaysStats.workoutsCompleted / user.dailyGoals.workouts) * 100) : 0;
  const waterPercentage = todaysStats ? Math.min(100, (todaysStats.waterIntake / user.dailyGoals.water) * 100) : 0;

  // Prepare data for the weight chart
  const chartData = weightLogs
    .slice()
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map(log => ({
      date: format(log.date, 'MMM d'),
      weight: log.weight
    }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Calories Consumed"
          value={todaysStats?.caloriesConsumed || 0}
          description={`${remainingCalories} calories remaining`}
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2"></path><path d="M18 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path></svg>}
        />
        <StatCard
          title="Calories Burned"
          value={todaysStats?.caloriesBurned || 0}
          icon={<Activity size={24} />}
        />
        <StatCard
          title="Steps Taken"
          value={todaysStats?.steps.toLocaleString() || 0}
          description={`Goal: ${user.dailyGoals.steps.toLocaleString()}`}
          trend="up"
          trendValue="+12% vs yesterday"
        />
        <StatCard
          title="Active Minutes"
          value={todaysStats?.activeMinutes || 0}
          description="minutes today"
          icon={<Dumbbell size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Rings */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Today's Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col items-center">
                <ProgressRing 
                  progress={stepsPercentage} 
                  color="#9b87f5"
                  size={100}
                  strokeWidth={8}
                >
                  <div className="text-center">
                    <p className="text-lg font-bold">{Math.round(stepsPercentage)}%</p>
                    <p className="text-xs text-gray-500">Steps</p>
                  </div>
                </ProgressRing>
                <p className="mt-2 text-sm text-center">
                  {todaysStats?.steps.toLocaleString() || 0} / {user.dailyGoals.steps.toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <ProgressRing 
                  progress={activeMinutesPercentage} 
                  color="#33C3F0"
                  size={100}
                  strokeWidth={8}
                >
                  <div className="text-center">
                    <p className="text-lg font-bold">{Math.round(activeMinutesPercentage)}%</p>
                    <p className="text-xs text-gray-500">Active</p>
                  </div>
                </ProgressRing>
                <p className="mt-2 text-sm text-center">
                  {todaysStats?.activeMinutes || 0} min
                </p>
              </div>

              <div className="flex flex-col items-center">
                <ProgressRing 
                  progress={workoutsPercentage} 
                  color="#f97316"
                  size={100}
                  strokeWidth={8}
                >
                  <div className="text-center">
                    <p className="text-lg font-bold">{todaysStats?.workoutsCompleted || 0}</p>
                    <p className="text-xs text-gray-500">Workout</p>
                  </div>
                </ProgressRing>
                <p className="mt-2 text-sm text-center">
                  {todaysStats?.workoutsCompleted || 0} / {user.dailyGoals.workouts}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <ProgressRing 
                  progress={waterPercentage} 
                  color="#4ade80"
                  size={100}
                  strokeWidth={8}
                >
                  <div className="text-center">
                    <p className="text-lg font-bold">{todaysStats?.waterIntake || 0}</p>
                    <p className="text-xs text-gray-500">Water</p>
                  </div>
                </ProgressRing>
                <p className="mt-2 text-sm text-center">
                  {todaysStats?.waterIntake || 0} / {user.dailyGoals.water} glasses
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weight Progress */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Weight className="mr-2 h-5 w-5" />
              Weight Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="#9b87f5" 
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }} 
                    />
                    <XAxis dataKey="date" />
                    <YAxis 
                      domain={[
                        (dataMin: number) => Math.floor(dataMin - 2),
                        (dataMax: number) => Math.ceil(dataMax + 2)
                      ]}
                    />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500">
                  No weight data available
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
