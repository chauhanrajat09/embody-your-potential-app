
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import EnhancedExerciseDatabase from '@/components/workouts/EnhancedExerciseDatabase';
import QuickLog from '@/components/workouts/QuickLog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, List, Clock } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';

const Exercises: React.FC = () => {
  const [openQuickLog, setOpenQuickLog] = useState(false);
  const { toast } = useToast();

  const handleQuickLogComplete = () => {
    setOpenQuickLog(false);
    toast({
      title: "Exercise logged",
      description: "Your exercise has been saved successfully.",
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="exercises" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader username="John" />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Exercise Library</h1>
            <div className="flex gap-2">
              <Dialog open={openQuickLog} onOpenChange={setOpenQuickLog}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Clock className="mr-2 h-4 w-4" /> Quick Log
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Quick Log Exercise</DialogTitle>
                    <DialogDescription>
                      Quickly log a single exercise without creating a full workout.
                    </DialogDescription>
                  </DialogHeader>
                  <QuickLog onComplete={handleQuickLogComplete} />
                </DialogContent>
              </Dialog>
              
              <Button className="gradient-purple">
                <Plus className="mr-2 h-4 w-4" /> Create Exercise
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="database">
            <TabsList className="mb-6">
              <TabsTrigger value="database">Exercise Database</TabsTrigger>
              <TabsTrigger value="recent">Recent Exercises</TabsTrigger>
              <TabsTrigger value="history">Exercise History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="database" className="mt-0">
              <EnhancedExerciseDatabase />
            </TabsContent>
            
            <TabsContent value="recent" className="mt-0">
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <List className="h-12 w-12 text-empowerfit-purple mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-bold mb-2">No Recent Exercises</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Log your first exercise to see it appear here.
                </p>
                <Button className="gradient-purple" onClick={() => setOpenQuickLog(true)}>
                  <Clock className="mr-2 h-4 w-4" /> Quick Log Exercise
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="mt-0">
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <Clock className="h-12 w-12 text-empowerfit-purple mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-bold mb-2">No Exercise History</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Your exercise history will appear here after you log workouts.
                </p>
                <Button className="gradient-purple" onClick={() => setOpenQuickLog(true)}>
                  <Clock className="mr-2 h-4 w-4" /> Quick Log Exercise
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Exercises;
