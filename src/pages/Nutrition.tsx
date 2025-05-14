
import React, { useState } from 'react';
import { useFitness } from '@/context/FitnessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MealForm } from '@/components/forms/MealForm';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { format, isToday } from 'date-fns';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

const Nutrition = () => {
  const { meals, getTodaysStats, getRemainingCalories, getMacroTotals, user } = useFitness();
  const [activeTab, setActiveTab] = useState('summary');
  
  const todaysStats = getTodaysStats();
  const remainingCalories = getRemainingCalories();
  const caloriesPercentage = todaysStats ? Math.min(100, (todaysStats.caloriesConsumed / user.dailyGoals.calories) * 100) : 0;
  
  // Get today's meals
  const todaysMeals = meals.filter(meal => isToday(new Date(meal.date)));
  
  // Get macro totals for today
  const macroTotals = getMacroTotals(new Date());
  const totalMacros = macroTotals.protein + macroTotals.carbs + macroTotals.fat;
  
  // Prepare data for macro distribution pie chart
  const macroData = [
    { name: 'Protein', value: macroTotals.protein, color: '#9b87f5' },
    { name: 'Carbs', value: macroTotals.carbs, color: '#33C3F0' },
    { name: 'Fat', value: macroTotals.fat, color: '#f97316' },
  ];

  // Group meals by meal type
  const mealsByType: Record<string, typeof meals> = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: [],
  };
  
  todaysMeals.forEach(meal => {
    mealsByType[meal.mealType].push(meal);
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Nutrition Tracking</h1>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full sm:w-[400px]">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="meals">Meals</TabsTrigger>
          <TabsTrigger value="add">Log Meal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Calories Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Calories</CardTitle>
                <CardDescription>Daily Goal: {user.dailyGoals.calories}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center pt-2">
                <ProgressRing 
                  progress={caloriesPercentage} 
                  color="#9b87f5"
                  size={150}
                >
                  <div className="text-center">
                    <p className="text-2xl font-bold">{todaysStats?.caloriesConsumed || 0}</p>
                    <p className="text-sm text-gray-500">consumed</p>
                  </div>
                </ProgressRing>
                <p className="mt-4 text-center">
                  <span className={remainingCalories < 0 ? 'text-red-500' : 'text-green-500'}>
                    {remainingCalories} calories
                  </span> {remainingCalories < 0 ? 'over budget' : 'remaining'}
                </p>
              </CardContent>
            </Card>
            
            {/* Macro Distribution */}
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Macro Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center justify-between h-[200px]">
                  <div className="w-full md:w-1/2 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={macroData}
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {macroData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                          <Label
                            content={({ viewBox }) => {
                              const { cx, cy } = viewBox as { cx: number, cy: number };
                              return (
                                <text x={cx} y={cy} fill="#888888" textAnchor="middle" dominantBaseline="central">
                                  <tspan x={cx} dy="-0.5em" fontSize="16" fontWeight="bold">
                                    {totalMacros}g
                                  </tspan>
                                  <tspan x={cx} dy="1.5em" fontSize="12">
                                    Total
                                  </tspan>
                                </text>
                              );
                            }}
                          />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="flex flex-col space-y-4 mt-4 md:mt-0">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-[#9b87f5] mr-2"></div>
                      <div>
                        <p className="font-medium">Protein</p>
                        <p className="text-sm text-gray-500">{macroTotals.protein}g ({Math.round(macroTotals.protein * 4)} kcal)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-[#33C3F0] mr-2"></div>
                      <div>
                        <p className="font-medium">Carbs</p>
                        <p className="text-sm text-gray-500">{macroTotals.carbs}g ({Math.round(macroTotals.carbs * 4)} kcal)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-[#f97316] mr-2"></div>
                      <div>
                        <p className="font-medium">Fat</p>
                        <p className="text-sm text-gray-500">{macroTotals.fat}g ({Math.round(macroTotals.fat * 9)} kcal)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="meals" className="mt-6">
          <div className="space-y-6">
            {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => (
              <div key={mealType} className="space-y-4">
                <h3 className="text-lg font-medium capitalize">{mealType}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mealsByType[mealType].length > 0 ? (
                    mealsByType[mealType].map(meal => (
                      <Card key={meal.id} className="overflow-hidden">
                        <CardHeader className="bg-fitness-purple bg-opacity-10 pb-2">
                          <CardTitle className="text-base">{meal.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="grid grid-cols-4 gap-2 text-sm">
                            <div>
                              <p className="font-medium">{meal.calories}</p>
                              <p className="text-xs text-gray-500">Calories</p>
                            </div>
                            <div>
                              <p className="font-medium">{meal.protein}g</p>
                              <p className="text-xs text-gray-500">Protein</p>
                            </div>
                            <div>
                              <p className="font-medium">{meal.carbs}g</p>
                              <p className="text-xs text-gray-500">Carbs</p>
                            </div>
                            <div>
                              <p className="font-medium">{meal.fat}g</p>
                              <p className="text-xs text-gray-500">Fat</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-2 p-4 border border-dashed rounded-lg text-center text-gray-500">
                      No {mealType} logged today
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="add" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Log a Meal</CardTitle>
              <CardDescription>
                Record what you eat to track your nutrition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MealForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Nutrition;
