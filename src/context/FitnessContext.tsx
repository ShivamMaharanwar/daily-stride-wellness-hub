
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Workout, Meal, WeightLog, DailyStats } from '@/types';
import { format } from 'date-fns';

// Sample data for initial state
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
const threeDaysAgo = new Date(today);
threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
const fourDaysAgo = new Date(today);
fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);
const fiveDaysAgo = new Date(today);
fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
const sixDaysAgo = new Date(today);
sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);

const initialUser: User = {
  id: '1',
  name: 'John Doe',
  age: 30,
  gender: 'male',
  weight: 80,
  height: 180,
  goal: 'weight_loss',
  dailyGoals: {
    steps: 10000,
    calories: 2000,
    workouts: 1,
    water: 8,
  },
};

const initialWorkouts: Workout[] = [
  {
    id: '1',
    date: today,
    type: 'Running',
    duration: 30,
    caloriesBurned: 300,
    notes: 'Morning run in the park',
  },
  {
    id: '2',
    date: yesterday,
    type: 'Strength Training',
    duration: 45,
    caloriesBurned: 250,
    notes: 'Upper body workout',
  },
  {
    id: '3',
    date: twoDaysAgo,
    type: 'Yoga',
    duration: 60,
    caloriesBurned: 150,
    notes: 'Evening yoga session',
  },
  {
    id: '4',
    date: threeDaysAgo,
    type: 'Cycling',
    duration: 40,
    caloriesBurned: 400,
    notes: 'Bike ride around the lake',
  },
];

const initialMeals: Meal[] = [
  {
    id: '1',
    date: today,
    name: 'Oatmeal with fruits',
    calories: 350,
    protein: 15,
    carbs: 60,
    fat: 5,
    mealType: 'breakfast',
  },
  {
    id: '2',
    date: today,
    name: 'Chicken salad',
    calories: 450,
    protein: 35,
    carbs: 20,
    fat: 25,
    mealType: 'lunch',
  },
  {
    id: '3',
    date: today,
    name: 'Salmon with vegetables',
    calories: 550,
    protein: 40,
    carbs: 25,
    fat: 30,
    mealType: 'dinner',
  },
  {
    id: '4',
    date: today,
    name: 'Protein shake',
    calories: 200,
    protein: 30,
    carbs: 5,
    fat: 3,
    mealType: 'snack',
  },
  {
    id: '5',
    date: yesterday,
    name: 'Eggs and toast',
    calories: 400,
    protein: 20,
    carbs: 35,
    fat: 15,
    mealType: 'breakfast',
  },
];

const initialWeightLogs: WeightLog[] = [
  { date: sixDaysAgo, weight: 82.5 },
  { date: fiveDaysAgo, weight: 82.2 },
  { date: fourDaysAgo, weight: 82.0 },
  { date: threeDaysAgo, weight: 81.7 },
  { date: twoDaysAgo, weight: 81.5 },
  { date: yesterday, weight: 81.0 },
  { date: today, weight: 80.8 },
];

const initialDailyStats: DailyStats[] = [
  {
    date: today,
    caloriesConsumed: 1550,
    caloriesBurned: 300,
    steps: 8500,
    activeMinutes: 45,
    workoutsCompleted: 1,
    waterIntake: 6,
  },
  {
    date: yesterday,
    caloriesConsumed: 1800,
    caloriesBurned: 250,
    steps: 7500,
    activeMinutes: 40,
    workoutsCompleted: 1,
    waterIntake: 8,
  },
  {
    date: twoDaysAgo,
    caloriesConsumed: 2100,
    caloriesBurned: 150,
    steps: 5000,
    activeMinutes: 30,
    workoutsCompleted: 1,
    waterIntake: 5,
  },
  {
    date: threeDaysAgo,
    caloriesConsumed: 1700,
    caloriesBurned: 400,
    steps: 9000,
    activeMinutes: 60,
    workoutsCompleted: 1,
    waterIntake: 7,
  },
];

interface FitnessContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  workouts: Workout[];
  setWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>;
  meals: Meal[];
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
  weightLogs: WeightLog[];
  setWeightLogs: React.Dispatch<React.SetStateAction<WeightLog[]>>;
  dailyStats: DailyStats[];
  setDailyStats: React.Dispatch<React.SetStateAction<DailyStats[]>>;
  addWorkout: (workout: Omit<Workout, 'id'>) => void;
  addMeal: (meal: Omit<Meal, 'id'>) => void;
  addWeightLog: (weightLog: WeightLog) => void;
  updateDailyStats: (date: Date, stats: Partial<DailyStats>) => void;
  getTodaysStats: () => DailyStats | undefined;
  getRemainingCalories: () => number;
  getMacroTotals: (date: Date) => { protein: number; carbs: number; fat: number };
  getFormattedDate: (date: Date) => string;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export const FitnessProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(initialUser);
  const [workouts, setWorkouts] = useState<Workout[]>(initialWorkouts);
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>(initialWeightLogs);
  const [dailyStats, setDailyStats] = useState<DailyStats[]>(initialDailyStats);

  const addWorkout = (workout: Omit<Workout, 'id'>) => {
    const newWorkout = {
      ...workout,
      id: Math.random().toString(36).substr(2, 9),
    };
    setWorkouts((prev) => [...prev, newWorkout]);
    
    // Update daily stats
    updateDailyStats(workout.date, {
      caloriesBurned: (getTodaysStats()?.caloriesBurned || 0) + workout.caloriesBurned,
      activeMinutes: (getTodaysStats()?.activeMinutes || 0) + workout.duration,
      workoutsCompleted: (getTodaysStats()?.workoutsCompleted || 0) + 1,
    });
  };

  const addMeal = (meal: Omit<Meal, 'id'>) => {
    const newMeal = {
      ...meal,
      id: Math.random().toString(36).substr(2, 9),
    };
    setMeals((prev) => [...prev, newMeal]);
    
    // Update daily stats
    updateDailyStats(meal.date, {
      caloriesConsumed: (getTodaysStats()?.caloriesConsumed || 0) + meal.calories,
    });
  };

  const addWeightLog = (weightLog: WeightLog) => {
    setWeightLogs((prev) => {
      // Remove any existing log for the same date
      const filtered = prev.filter(
        (log) => format(log.date, 'yyyy-MM-dd') !== format(weightLog.date, 'yyyy-MM-dd')
      );
      return [...filtered, weightLog];
    });
    
    // Update user weight
    setUser((prev) => ({
      ...prev,
      weight: weightLog.weight,
    }));
  };

  const updateDailyStats = (date: Date, stats: Partial<DailyStats>) => {
    setDailyStats((prev) => {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const existingStatIndex = prev.findIndex(
        (stat) => format(stat.date, 'yyyy-MM-dd') === formattedDate
      );

      if (existingStatIndex >= 0) {
        const newStats = [...prev];
        newStats[existingStatIndex] = {
          ...newStats[existingStatIndex],
          ...stats,
        };
        return newStats;
      } else {
        return [
          ...prev,
          {
            date,
            caloriesConsumed: 0,
            caloriesBurned: 0,
            steps: 0,
            activeMinutes: 0,
            workoutsCompleted: 0,
            waterIntake: 0,
            ...stats,
          },
        ];
      }
    });
  };

  const getTodaysStats = () => {
    const formattedToday = format(new Date(), 'yyyy-MM-dd');
    return dailyStats.find((stat) => format(stat.date, 'yyyy-MM-dd') === formattedToday);
  };

  const getRemainingCalories = () => {
    const todaysStats = getTodaysStats();
    if (!todaysStats) return user.dailyGoals.calories;
    
    return user.dailyGoals.calories - todaysStats.caloriesConsumed + todaysStats.caloriesBurned;
  };

  const getMacroTotals = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const dailyMeals = meals.filter((meal) => format(meal.date, 'yyyy-MM-dd') === formattedDate);
    
    return dailyMeals.reduce(
      (acc, meal) => {
        acc.protein += meal.protein;
        acc.carbs += meal.carbs;
        acc.fat += meal.fat;
        return acc;
      },
      { protein: 0, carbs: 0, fat: 0 }
    );
  };
  
  const getFormattedDate = (date: Date) => {
    return format(date, 'MMM d, yyyy');
  };

  return (
    <FitnessContext.Provider
      value={{
        user,
        setUser,
        workouts,
        setWorkouts,
        meals,
        setMeals,
        weightLogs,
        setWeightLogs,
        dailyStats,
        setDailyStats,
        addWorkout,
        addMeal,
        addWeightLog,
        updateDailyStats,
        getTodaysStats,
        getRemainingCalories,
        getMacroTotals,
        getFormattedDate,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (context === undefined) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};
