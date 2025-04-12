
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WeightTracking from '@/components/weight/WeightTracking';

const WeightLogger: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="weight" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader username="John" />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Weight Logger</h1>
          </div>
          
          <WeightTracking />
        </div>
      </div>
    </div>
  );
};

export default WeightLogger;
