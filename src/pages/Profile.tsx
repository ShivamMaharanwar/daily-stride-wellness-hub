
import React from 'react';
import { useFitness } from '@/context/FitnessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProfileForm } from '@/components/forms/ProfileForm';

const Profile = () => {
  const { user } = useFitness();
  
  // Calculate BMI
  const heightInMeters = user.height / 100;
  const bmi = user.weight / (heightInMeters * heightInMeters);
  
  // Determine BMI category
  let bmiCategory = '';
  let bmiColor = '';
  
  if (bmi < 18.5) {
    bmiCategory = 'Underweight';
    bmiColor = 'text-blue-500';
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiCategory = 'Normal weight';
    bmiColor = 'text-green-500';
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory = 'Overweight';
    bmiColor = 'text-orange-500';
  } else {
    bmiCategory = 'Obese';
    bmiColor = 'text-red-500';
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Profile Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-xl bg-fitness-purple text-white">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-500 text-sm">
                {user.age} years old • {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Height</span>
                <span className="font-medium">{user.height} cm</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Weight</span>
                <span className="font-medium">{user.weight} kg</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">BMI</span>
                <span className={`font-medium ${bmiColor}`}>
                  {bmi.toFixed(1)} ({bmiCategory})
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Goal</span>
                <span className="font-medium capitalize">{user.goal.replace('_', ' ')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>
                Update your personal information and goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
