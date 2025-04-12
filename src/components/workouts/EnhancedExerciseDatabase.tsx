
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, ChevronRight, Dumbbell, Heart, Award, Filter, 
  BarChart2, User, Play, Plus, Info 
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ExerciseProps {
  name: string;
  target: string;
  equipment: string;
  difficulty: string;
  personalRecord?: string;
  category?: string;
  repRange?: string;
  demoUrl?: string;
}

const ExerciseItem: React.FC<ExerciseProps> = ({ 
  name, target, equipment, difficulty, personalRecord, category, repRange, demoUrl 
}) => {
  const [showDemo, setShowDemo] = useState(false);
  
  return (
    <div className="flex items-center justify-between p-3 border-b hover:bg-gray-50">
      <div className="flex items-center">
        <div className="bg-empowerfit-gray-light p-2 rounded-lg mr-3">
          <Dumbbell className="h-6 w-6 text-empowerfit-purple" />
        </div>
        <div>
          <h3 className="font-medium">{name}</h3>
          <div className="flex text-xs text-gray-500 mt-0.5 flex-wrap gap-1">
            <span>{target}</span>
            <span className="mx-1.5">•</span>
            <span>{equipment}</span>
            <span className="mx-1.5">•</span>
            <span>{difficulty}</span>
            {repRange && (
              <>
                <span className="mx-1.5">•</span>
                <span className="text-empowerfit-purple">{repRange} reps</span>
              </>
            )}
            {category && (
              <Badge variant="outline" className="ml-1 text-xs">{category}</Badge>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center">
        {personalRecord && (
          <div className="flex items-center mr-4 bg-empowerfit-gray-light px-2 py-1 rounded text-xs font-medium">
            <Award className="h-3 w-3 text-yellow-500 mr-1" />
            <span>PR: {personalRecord}</span>
          </div>
        )}
        <div className="flex">
          {demoUrl && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setShowDemo(!showDemo)}>
                    <Play className="h-4 w-4 text-empowerfit-blue" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View exercise demo</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <Button variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {showDemo && demoUrl && (
        <div className="absolute left-0 right-0 mt-2 border-t pt-3 bg-white px-3 pb-3">
          <div className="flex justify-center">
            <img 
              src={demoUrl} 
              alt={`${name} demonstration`} 
              className="h-48 rounded-lg shadow-md" 
            />
          </div>
          <p className="text-xs text-center text-gray-500 mt-2">
            {name} demonstration - Proper form is essential for effective results.
          </p>
        </div>
      )}
    </div>
  );
};

const EnhancedExerciseDatabase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bodyPartFilter, setBodyPartFilter] = useState('all');
  const [equipmentFilter, setEquipmentFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [currentTab, setCurrentTab] = useState('all');
  
  const exercises = [
    {
      name: "Barbell Back Squat",
      target: "Legs",
      equipment: "Barbell",
      difficulty: "Intermediate",
      personalRecord: "100kg",
      category: "Compound",
      repRange: "5-8",
      demoUrl: "https://media.giphy.com/media/1qfKN8Dt0CRdCRxz9q/giphy.gif"
    },
    {
      name: "Bench Press",
      target: "Chest",
      equipment: "Barbell",
      difficulty: "Intermediate",
      personalRecord: "75kg",
      category: "Compound",
      repRange: "8-12",
      demoUrl: "https://media.giphy.com/media/2UCt7zbmsLoCXybx6t/giphy.gif"
    },
    {
      name: "Deadlift",
      target: "Back",
      equipment: "Barbell",
      difficulty: "Intermediate",
      personalRecord: "140kg",
      category: "Compound",
      repRange: "3-6",
      demoUrl: "https://media.giphy.com/media/2bYewfs8P0aft9Dghm/giphy.gif"
    },
    {
      name: "Pull-Up",
      target: "Back",
      equipment: "Bodyweight",
      difficulty: "Intermediate",
      category: "Compound",
      repRange: "6-12",
      demoUrl: "https://media.giphy.com/media/23hPPMRgPxbNBlPQe3/giphy.gif"
    },
    {
      name: "Shoulder Press",
      target: "Shoulders",
      equipment: "Dumbbell",
      difficulty: "Beginner",
      category: "Compound",
      repRange: "8-12",
      demoUrl: "https://media.giphy.com/media/W3CLbW5KIL46riJIHc/giphy.gif"
    },
    {
      name: "Leg Extensions",
      target: "Legs",
      equipment: "Machine",
      difficulty: "Beginner",
      category: "Isolation",
      repRange: "12-15",
      demoUrl: "https://media.giphy.com/media/26vUBaFiXE9P3BXC8/giphy.gif"
    },
    {
      name: "Bicep Curl",
      target: "Arms",
      equipment: "Dumbbell",
      difficulty: "Beginner",
      category: "Isolation",
      repRange: "12-15",
      demoUrl: "https://media.giphy.com/media/JTzI2kM0ymlizRwyV2/giphy.gif"
    },
    {
      name: "Lateral Raise",
      target: "Shoulders",
      equipment: "Dumbbell",
      difficulty: "Beginner",
      category: "Isolation",
      repRange: "12-15",
      demoUrl: "https://media.giphy.com/media/3oKIPtjElfqwMOTbH2/giphy.gif"
    },
    {
      name: "Cable Fly",
      target: "Chest",
      equipment: "Cable",
      difficulty: "Intermediate",
      category: "Hypertrophy",
      repRange: "10-15",
      demoUrl: "https://media.giphy.com/media/UvQ3RjhZCnDxHJCmU1/giphy.gif"
    },
    {
      name: "Romanian Deadlift",
      target: "Legs",
      equipment: "Barbell",
      difficulty: "Intermediate",
      category: "Hypertrophy",
      repRange: "8-12",
      demoUrl: "https://media.giphy.com/media/26BGF5RsJWgPGNKda/giphy.gif"
    },
    {
      name: "Incline Dumbbell Press",
      target: "Chest",
      equipment: "Dumbbell",
      difficulty: "Intermediate",
      category: "Hypertrophy",
      repRange: "8-12",
      demoUrl: "https://media.giphy.com/media/3oKIPtjElfqwMOTbH2/giphy.gif"
    },
    {
      name: "Dumbbell Row",
      target: "Back",
      equipment: "Dumbbell",
      difficulty: "Beginner",
      category: "Hypertrophy",
      repRange: "8-12",
      demoUrl: "https://media.giphy.com/media/3oKIPtjElfqwMOTbH2/giphy.gif"
    },
    {
      name: "Tricep Pushdown",
      target: "Arms",
      equipment: "Cable",
      difficulty: "Beginner",
      category: "Hypertrophy",
      repRange: "10-15",
      demoUrl: "https://media.giphy.com/media/l2JJsEx6cCbDpvzTq/giphy.gif"
    }
  ];
  
  const filteredExercises = exercises.filter(exercise => {
    // Apply main category filter
    if (currentTab === 'hypertrophy' && exercise.category !== 'Hypertrophy') return false;
    if (currentTab === 'strength' && (exercise.repRange === '12-15' || exercise.repRange === '10-15')) return false;
    if (currentTab === 'cardio' && exercise.target !== 'Cardio') return false;
    if (currentTab === 'favorites') return false; // For demo purposes
    if (currentTab === 'custom') return false;  // For demo purposes
    
    // Apply search filter
    if (searchTerm && !exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !exercise.target.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Apply body part filter
    if (bodyPartFilter !== 'all' && exercise.target !== bodyPartFilter) {
      return false;
    }
    
    // Apply equipment filter
    if (equipmentFilter !== 'all' && exercise.equipment !== equipmentFilter) {
      return false;
    }
    
    // Apply difficulty filter
    if (difficultyFilter !== 'all' && exercise.difficulty !== difficultyFilter) {
      return false;
    }
    
    return true;
  });

  return (
    <Card className="shadow-md">
      <CardContent className="p-0">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search exercises..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all" className="mt-4" onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="strength">Strength</TabsTrigger>
              <TabsTrigger value="hypertrophy">Hypertrophy</TabsTrigger>
              <TabsTrigger value="cardio">Cardio</TabsTrigger>
              <TabsTrigger value="favorites">
                <Heart className="h-4 w-4 mr-1" />
                Favorites
              </TabsTrigger>
              <TabsTrigger value="custom">
                <User className="h-4 w-4 mr-1" />
                Custom
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="flex-1 min-w-[120px]">
                <Select value={bodyPartFilter} onValueChange={setBodyPartFilter}>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue placeholder="Body Part" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Body Parts</SelectItem>
                    <SelectItem value="Chest">Chest</SelectItem>
                    <SelectItem value="Back">Back</SelectItem>
                    <SelectItem value="Legs">Legs</SelectItem>
                    <SelectItem value="Shoulders">Shoulders</SelectItem>
                    <SelectItem value="Arms">Arms</SelectItem>
                    <SelectItem value="Core">Core</SelectItem>
                    <SelectItem value="Cardio">Cardio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1 min-w-[120px]">
                <Select value={equipmentFilter} onValueChange={setEquipmentFilter}>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue placeholder="Equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Equipment</SelectItem>
                    <SelectItem value="Barbell">Barbell</SelectItem>
                    <SelectItem value="Dumbbell">Dumbbell</SelectItem>
                    <SelectItem value="Machine">Machine</SelectItem>
                    <SelectItem value="Cable">Cable</SelectItem>
                    <SelectItem value="Bodyweight">Bodyweight</SelectItem>
                    <SelectItem value="Kettlebell">Kettlebell</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1 min-w-[120px]">
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button size="sm" variant="outline" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
            </div>
          </Tabs>
        </div>
        
        <TabsContent value="hypertrophy" className="mt-0">
          <div className="p-3 bg-empowerfit-purple-light bg-opacity-10 border-b">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 mt-0.5 text-empowerfit-purple" />
              <div>
                <h4 className="font-medium text-sm">Hypertrophy Focus</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Exercises optimized for muscle growth. Aim for 8-12 reps per set, moderate to heavy weights, and focus on time under tension.
                  Recovery is key - allow 48-72 hours between training the same muscle group.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <div className="max-h-96 overflow-y-auto relative">
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exercise, index) => (
              <ExerciseItem key={index} {...exercise} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No exercises found</p>
              <Button variant="outline" className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Create Exercise
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedExerciseDatabase;
