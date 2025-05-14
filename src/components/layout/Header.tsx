
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useFitness } from '@/context/FitnessContext';
import { format } from 'date-fns';

export const Header = () => {
  const { user } = useFitness();
  const today = new Date();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <SidebarTrigger className="mr-4 md:hidden text-gray-500 hover:text-gray-800" />
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Hello, {user.name}</h2>
          <p className="text-sm text-gray-500">{format(today, 'EEEE, MMMM d, yyyy')}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <span className="hidden md:inline-block text-sm font-medium text-gray-600">
          Goal: {user.goal.replace('_', ' ')}
        </span>
      </div>
    </header>
  );
};
