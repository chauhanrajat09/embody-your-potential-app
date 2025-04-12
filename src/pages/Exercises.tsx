
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ExerciseDatabase from '@/components/workouts/ExerciseDatabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Exercises: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="exercises" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader username="John" />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Exercise Library</h1>
            <Button className="gradient-purple">
              <Plus className="mr-2 h-4 w-4" /> Create Exercise
            </Button>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Exercises</TabsTrigger>
              <TabsTrigger value="strength">Strength</TabsTrigger>
              <TabsTrigger value="cardio">Cardio</TabsTrigger>
              <TabsTrigger value="flexibility">Flexibility</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <ExerciseDatabase />
            </TabsContent>
            <TabsContent value="strength">
              <ExerciseDatabase />
            </TabsContent>
            <TabsContent value="cardio">
              <ExerciseDatabase />
            </TabsContent>
            <TabsContent value="flexibility">
              <ExerciseDatabase />
            </TabsContent>
            <TabsContent value="custom">
              <ExerciseDatabase />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Exercises;
