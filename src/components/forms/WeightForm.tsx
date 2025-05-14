
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFitness } from '@/context/FitnessContext';
import { format } from 'date-fns';
import { toast } from 'sonner';

export const WeightForm = () => {
  const { addWeightLog } = useFitness();
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [weight, setWeight] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!weight) {
      toast.error('Please enter your weight');
      return;
    }

    addWeightLog({
      date: new Date(date),
      weight: parseFloat(weight),
    });

    toast.success('Weight logged successfully');
    
    // Reset form
    setWeight('');
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
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            min="30"
            max="300"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kg"
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-fitness-purple hover:bg-fitness-purpleDark mt-2">
        Log Weight
      </Button>
    </form>
  );
};
