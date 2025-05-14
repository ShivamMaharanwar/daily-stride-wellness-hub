
import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export const StatCard = ({
  title,
  value,
  icon,
  description,
  trend,
  trendValue,
  className = '',
}: StatCardProps) => {
  return (
    <div className={`stat-card ${className}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon && <div className="text-fitness-purple">{icon}</div>}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold">{value}</p>
          {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        </div>
        
        {trend && trendValue && (
          <div className={`flex items-center text-xs font-medium ${
            trend === 'up' 
              ? 'text-green-500' 
              : trend === 'down' 
                ? 'text-red-500' 
                : 'text-gray-400'
          }`}>
            {trend === 'up' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L12 10.586V7z" clipRule="evenodd" />
              </svg>
            )}
            {trend === 'down' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 13a1 1 0 100-2H8.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 13H12z" clipRule="evenodd" />
              </svg>
            )}
            {trendValue}
          </div>
        )}
      </div>
    </div>
  );
};
