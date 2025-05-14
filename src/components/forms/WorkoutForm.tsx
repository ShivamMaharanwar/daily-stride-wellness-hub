
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFitness } from '@/context/FitnessContext';
import { format } from 'date-fns';
import { toast } from 'sonner';

const workoutTypes = [
  'Running',
  'Walking',
  'Cycling',
  'Swimming',
  'Strength Training',
  'HIIT',
  'Yoga',
  'Pilates',
  'Hiking',
  'Dancing',
  'Sports',
  'Other'
];

export const WorkoutForm = () => {
  const { addWorkout } = useFitness();
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!type || !duration || !caloriesBurned) {
      toast.error('Please fill in all required fields');
      return;
    }

    addWorkout({
      date: new Date(date),
      type,
      duration: parseInt(duration),
      caloriesBurned: parseInt(caloriesBurned),
      notes,
    });

    toast.success('Workout added successfully');
    
    // Reset form
    setDate(format(new Date(), 'yyyy-MM-dd'));
    setType('');
    setDuration('');
    setCaloriesBurned('');
    setNotes('');
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
          <Label htmlFor="type">Workout Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select workout type" />
            </SelectTrigger>
            <SelectContent>
              {workoutTypes.map((workoutType) => (
                <SelectItem key={workoutType} value={workoutType}>
                  {workoutType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Duration in minutes"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="calories">Calories Burned</Label>
          <Input
            id="calories"
            type="number"
            min="1"
            value={caloriesBurned}
            onChange={(e) => setCaloriesBurned(e.target.value)}
            placeholder="Calories burned"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any notes about your workout"
          className="min-h-[100px]"
        />
      </div>

      <Button type="submit" className="w-full bg-fitness-purple hover:bg-fitness-purpleDark">
        Add Workout
      </Button>
    </form>
  );
};
