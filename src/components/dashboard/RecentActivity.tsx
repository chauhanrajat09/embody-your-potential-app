
import React from 'react';
import { CalendarDays, BarChart2, ArrowUpRight } from 'lucide-react';

interface ActivityItemProps {
  date: string;
  workout: string;
  duration: string;
  volume: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ date, workout, duration, volume }) => {
  return (
    <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="bg-empowerfit-purple-light/10 p-2 rounded-full mr-4">
        <CalendarDays className="h-5 w-5 text-empowerfit-purple" />
      </div>
      <div className="flex-1">
        <p className="font-medium">{workout}</p>
        <div className="flex text-sm text-gray-500">
          <p>{date}</p>
          <span className="mx-2">•</span>
          <p>{duration}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center text-sm font-medium text-empowerfit-blue">
          <BarChart2 className="h-3.5 w-3.5 mr-1" />
          {volume}
        </div>
        <button className="text-gray-400 hover:text-empowerfit-purple mt-1">
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const RecentActivity: React.FC = () => {
  const activities = [
    { 
      date: "Apr 11", 
      workout: "Leg Day", 
      duration: "58 min", 
      volume: "8,540 kg" 
    },
    { 
      date: "Apr 9", 
      workout: "Push Workout", 
      duration: "45 min", 
      volume: "5,230 kg" 
    },
    { 
      date: "Apr 7", 
      workout: "Pull Workout", 
      duration: "52 min", 
      volume: "6,120 kg" 
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Recent Activity</h2>
        <button className="text-sm text-empowerfit-purple font-medium">View All</button>
      </div>
      
      <div className="space-y-2">
        {activities.map((activity, index) => (
          <ActivityItem
            key={index}
            date={activity.date}
            workout={activity.workout}
            duration={activity.duration}
            volume={activity.volume}
          />
        ))}
      </div>
      
      {activities.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No recent workouts</p>
          <p className="text-sm mt-1">Start logging your fitness journey today</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
