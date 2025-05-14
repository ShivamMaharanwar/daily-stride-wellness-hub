
import React, { useState } from 'react';
import { useFitness } from '@/context/FitnessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WorkoutForm } from '@/components/forms/WorkoutForm';
import { format } from 'date-fns';
import { Dumbbell, Clock, Calendar } from 'lucide-react';

const Activity = () => {
  const { workouts, getFormattedDate } = useFitness();
  const [activeTab, setActiveTab] = useState('history');

  // Sort workouts by date (newest first)
  const sortedWorkouts = [...workouts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Activity Tracking</h1>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full sm:w-[400px]">
          <TabsTrigger value="history">Workout History</TabsTrigger>
          <TabsTrigger value="add">Log Workout</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedWorkouts.length > 0 ? (
              sortedWorkouts.map((workout) => (
                <Card key={workout.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="bg-fitness-purple bg-opacity-10 pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg flex items-center">
                        <Dumbbell className="mr-2 h-4 w-4" />
                        {workout.type}
                      </CardTitle>
                      <CardDescription className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {getFormattedDate(workout.date)}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-fitness-purpleDark" />
                        <span>{workout.duration} minutes</span>
                      </div>
                      <div className="font-medium">{workout.caloriesBurned} calories</div>
                    </div>
                    {workout.notes && (
                      <p className="text-sm text-gray-500 mt-2 border-t pt-2">{workout.notes}</p>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-10 text-gray-500">
                No workouts logged yet. Start tracking your activities!
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="add" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Log a New Workout</CardTitle>
              <CardDescription>
                Record your workout details to track your progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WorkoutForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Activity;
