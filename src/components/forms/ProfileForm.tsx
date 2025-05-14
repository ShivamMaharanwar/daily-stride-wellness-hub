
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFitness } from '@/context/FitnessContext';
import { toast } from 'sonner';

export const ProfileForm = () => {
  const { user, setUser } = useFitness();
  
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age.toString());
  const [gender, setGender] = useState(user.gender);
  const [weight, setWeight] = useState(user.weight.toString());
  const [height, setHeight] = useState(user.height.toString());
  const [goal, setGoal] = useState(user.goal);
  const [stepsGoal, setStepsGoal] = useState(user.dailyGoals.steps.toString());
  const [caloriesGoal, setCaloriesGoal] = useState(user.dailyGoals.calories.toString());
  const [workoutsGoal, setWorkoutsGoal] = useState(user.dailyGoals.workouts.toString());
  const [waterGoal, setWaterGoal] = useState(user.dailyGoals.water.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !age || !gender || !weight || !height || !goal || !stepsGoal || !caloriesGoal || !workoutsGoal || !waterGoal) {
      toast.error('Please fill in all fields');
      return;
    }

    setUser({
      ...user,
      name,
      age: parseInt(age),
      gender: gender as 'male' | 'female' | 'other',
      weight: parseFloat(weight),
      height: parseInt(height),
      goal: goal as 'weight_loss' | 'muscle_gain' | 'maintenance',
      dailyGoals: {
        steps: parseInt(stepsGoal),
        calories: parseInt(caloriesGoal),
        workouts: parseInt(workoutsGoal),
        water: parseInt(waterGoal),
      },
    });

    toast.success('Profile updated successfully');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              min="13"
              max="120"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={gender} onValueChange={(value) => setGender(value as 'male' | 'female' | 'other')}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              min="30"
              max="300"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Weight in kg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              min="100"
              max="250"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Height in cm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Fitness Goal</Label>
            <Select 
              value={goal} 
              onValueChange={(value) => setGoal(value as 'weight_loss' | 'muscle_gain' | 'maintenance')}
            >
              <SelectTrigger id="goal">
                <SelectValue placeholder="Select goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weight_loss">Weight Loss</SelectItem>
                <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Daily Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="stepsGoal">Daily Steps Goal</Label>
            <Input
              id="stepsGoal"
              type="number"
              min="1000"
              step="500"
              value={stepsGoal}
              onChange={(e) => setStepsGoal(e.target.value)}
              placeholder="Steps goal"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="caloriesGoal">Daily Calories Goal</Label>
            <Input
              id="caloriesGoal"
              type="number"
              min="1000"
              step="50"
              value={caloriesGoal}
              onChange={(e) => setCaloriesGoal(e.target.value)}
              placeholder="Calorie goal"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="workoutsGoal">Daily Workouts Goal</Label>
            <Input
              id="workoutsGoal"
              type="number"
              min="0"
              max="10"
              value={workoutsGoal}
              onChange={(e) => setWorkoutsGoal(e.target.value)}
              placeholder="Workouts goal"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="waterGoal">Daily Water Goal (glasses)</Label>
            <Input
              id="waterGoal"
              type="number"
              min="1"
              max="30"
              value={waterGoal}
              onChange={(e) => setWaterGoal(e.target.value)}
              placeholder="Water glasses goal"
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full md:w-auto bg-fitness-purple hover:bg-fitness-purpleDark">
        Save Profile
      </Button>
    </form>
  );
};
