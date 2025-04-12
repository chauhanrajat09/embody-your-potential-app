
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, User, Search } from 'lucide-react';

interface DashboardHeaderProps {
  username: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ username }) => {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold gradient-purple gradient-text mr-2">
          EmpowerFit
        </h1>
      </div>
      
      <div className="relative w-full max-w-sm mx-6 hidden md:block">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input 
          type="text" 
          placeholder="Search exercises, workouts..."
          className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-empowerfit-purple-light"
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
        <div className="hidden md:block">
          <p className="text-sm font-medium">Hi, {username}</p>
          <p className="text-xs text-gray-500">Premium Member</p>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
