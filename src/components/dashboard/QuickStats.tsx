
import React from 'react';
import { ArrowUp, Calendar, Dumbbell, Activity, Clock } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  positive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, positive = true }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">{title}</span>
        <div className="bg-gray-100 p-1.5 rounded-full">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <h3 className="text-xl font-bold">{value}</h3>
        <div className={`flex items-center text-xs ${positive ? 'text-green-500' : 'text-red-500'}`}>
          <ArrowUp className={`h-3 w-3 mr-0.5 ${!positive && 'rotate-180'}`} />
          {change}
        </div>
      </div>
    </div>
  );
};

const QuickStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Workouts This Month"
        value="12"
        change="25%"
        icon={<Calendar className="h-4 w-4 text-empowerfit-purple" />}
      />
      <StatCard
        title="Total Weight Lifted"
        value="64,350 kg"
        change="10%"
        icon={<Dumbbell className="h-4 w-4 text-empowerfit-blue" />}
      />
      <StatCard
        title="Weekly Activity"
        value="4 days"
        change="0%"
        positive={false}
        icon={<Activity className="h-4 w-4 text-empowerfit-purple" />}
      />
      <StatCard
        title="Avg. Workout Duration"
        value="52 min"
        change="5%"
        icon={<Clock className="h-4 w-4 text-empowerfit-blue" />}
      />
    </div>
  );
};

export default QuickStats;
