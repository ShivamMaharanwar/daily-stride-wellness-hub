
export interface User {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  weight: number; // in kg
  height: number; // in cm
  goal: 'weight_loss' | 'muscle_gain' | 'maintenance';
  dailyGoals: {
    steps: number;
    calories: number;
    workouts: number;
    water: number;
  }
}

export interface Workout {
  id: string;
  date: Date;
  type: string;
  duration: number; // in minutes
  caloriesBurned: number;
  notes?: string;
}

export interface Meal {
  id: string;
  date: Date;
  name: string;
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface WeightLog {
  date: Date;
  weight: number; // in kg
}

export interface DailyStats {
  date: Date;
  caloriesConsumed: number;
  caloriesBurned: number;
  steps: number;
  activeMinutes: number;
  workoutsCompleted: number;
  waterIntake: number; // in glasses
}
