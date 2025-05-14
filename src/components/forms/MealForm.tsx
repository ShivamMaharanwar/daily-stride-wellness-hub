
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFitness } from '@/context/FitnessContext';
import { format } from 'date-fns';
import { toast } from 'sonner';

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export const MealForm = () => {
  const { addMeal } = useFitness();
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [mealType, setMealType] = useState<MealType | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !calories || !protein || !carbs || !fat || !mealType) {
      toast.error('Please fill in all fields');
      return;
    }

    addMeal({
      date: new Date(date),
      name,
      calories: parseInt(calories),
      protein: parseInt(protein),
      carbs: parseInt(carbs),
      fat: parseInt(fat),
      mealType: mealType as MealType,
    });

    toast.success('Meal added successfully');
    
    // Reset form
    setName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
    setMealType('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={format(new Date(), 'yyyy-MM-dd')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mealType">Meal Type</Label>
          <Select value={mealType} onValueChange={(value) => setMealType(value as MealType)}>
            <SelectTrigger id="mealType">
              <SelectValue placeholder="Select meal type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="breakfast">Breakfast</SelectItem>
              <SelectItem value="lunch">Lunch</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
              <SelectItem value="snack">Snack</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Food Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Chicken salad with vinaigrette"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="calories">Calories</Label>
          <Input
            id="calories"
            type="number"
            min="0"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="kcal"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="protein">Protein (g)</Label>
          <Input
            id="protein"
            type="number"
            min="0"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            placeholder="g"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="carbs">Carbs (g)</Label>
          <Input
            id="carbs"
            type="number"
            min="0"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
            placeholder="g"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fat">Fat (g)</Label>
          <Input
            id="fat"
            type="number"
            min="0"
            value={fat}
            onChange={(e) => setFat(e.target.value)}
            placeholder="g"
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-fitness-purple hover:bg-fitness-purpleDark">
        Add Meal
      </Button>
    </form>
  );
};
