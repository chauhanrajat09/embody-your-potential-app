
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Dumbbell, Clock, Users, ArrowRight, Calendar } from 'lucide-react';

interface WorkoutTemplateProps {
  title: string;
  exercises: number;
  duration: string;
  level: string;
  image?: string;
}

const WorkoutTemplate: React.FC<WorkoutTemplateProps> = ({ 
  title, exercises, duration, level, image 
}) => {
  return (
    <Card className="overflow-hidden card-hover">
      <div 
        className="h-40 bg-gradient-to-br from-empowerfit-purple-light to-empowerfit-blue flex items-center justify-center"
      >
        <Dumbbell className="h-16 w-16 text-white opacity-75" />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{title}</CardTitle>
          <Badge variant={
            level === 'Beginner' ? 'outline' : 
            level === 'Intermediate' ? 'default' : 
            'destructive'
          }>
            {level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="flex text-sm text-gray-500">
          <div className="flex items-center">
            <Dumbbell className="h-4 w-4 mr-1" />
            <span>{exercises} exercises</span>
          </div>
          <div className="mx-3">•</div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{duration}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4">
        <div className="flex items-center text-xs text-gray-500">
          <Users className="h-3 w-3 mr-1" />
          <span>Popular template</span>
        </div>
        <Button variant="ghost" size="sm" className="text-empowerfit-purple">
          <span className="mr-1">Use</span>
          <ArrowRight className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const Workouts: React.FC = () => {
  const templates = [
    {
      title: "Full Body Beginner",
      exercises: 8,
      duration: "45 min",
      level: "Beginner"
    },
    {
      title: "Upper/Lower Split",
      exercises: 12,
      duration: "60 min",
      level: "Intermediate"
    },
    {
      title: "Push/Pull/Legs",
      exercises: 15,
      duration: "75 min",
      level: "Advanced"
    },
    {
      title: "HIIT Circuit",
      exercises: 10,
      duration: "30 min",
      level: "Intermediate"
    },
    {
      title: "Bodyweight Basics",
      exercises: 6,
      duration: "40 min",
      level: "Beginner"
    },
    {
      title: "Strength Foundation",
      exercises: 9,
      duration: "55 min",
      level: "Intermediate"
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="workouts" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader username="John" />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Workouts</h1>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" /> Schedule
              </Button>
              <Button className="gradient-purple">
                <Plus className="mr-2 h-4 w-4" /> Create Workout
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="templates">
            <TabsList className="mb-6">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="my-workouts">My Workouts</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template, index) => (
                  <WorkoutTemplate key={index} {...template} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="my-workouts">
              <div className="bg-white rounded-xl p-8 text-center">
                <Dumbbell className="h-12 w-12 text-empowerfit-purple mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-bold mb-2">Create Your First Workout</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Start by creating a custom workout routine tailored to your fitness goals.
                </p>
                <Button className="gradient-purple">
                  <Plus className="mr-2 h-4 w-4" /> Create Workout
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="recent">
              <div className="text-center py-12">
                <p className="text-gray-500">No recent workouts found</p>
              </div>
            </TabsContent>
            
            <TabsContent value="favorites">
              <div className="text-center py-12">
                <p className="text-gray-500">No favorite workouts found</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
