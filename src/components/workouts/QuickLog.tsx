
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Trash2, CalendarClock, Save, Clock, Dumbbell } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Set {
  weight: string;
  reps: string;
  id: string;
}

interface QuickLogProps {
  onComplete?: () => void;
}

const QuickLog: React.FC<QuickLogProps> = ({ onComplete }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [bodyPart, setBodyPart] = useState("");
  const [exercise, setExercise] = useState("");
  const [notes, setNotes] = useState("");
  const [useKg, setUseKg] = useState(true);
  const [sets, setSets] = useState<Set[]>([
    { weight: "", reps: "", id: "1" }
  ]);

  const bodyPartOptions = [
    "Chest", "Back", "Legs", "Shoulders", "Arms", "Core", "Full Body"
  ];

  const exerciseOptions: Record<string, string[]> = {
    "Chest": ["Bench Press", "Incline Press", "Cable Fly", "Push-Up", "Chest Dip"],
    "Back": ["Pull-Up", "Lat Pulldown", "Barbell Row", "Dumbbell Row", "Deadlift"],
    "Legs": ["Squat", "Leg Press", "Deadlift", "Lunges", "Leg Extension"],
    "Shoulders": ["Shoulder Press", "Lateral Raise", "Front Raise", "Face Pull", "Upright Row"],
    "Arms": ["Bicep Curl", "Tricep Extension", "Hammer Curl", "Skull Crusher", "Chin-Up"],
    "Core": ["Plank", "Crunch", "Leg Raise", "Russian Twist", "Ab Rollout"],
    "Full Body": ["Burpee", "Clean and Press", "Thruster", "Turkish Get-Up", "Mountain Climber"]
  };

  const handleAddSet = () => {
    setSets([...sets, { weight: "", reps: "", id: Date.now().toString() }]);
  };

  const handleRemoveSet = (id: string) => {
    if (sets.length > 1) {
      setSets(sets.filter(set => set.id !== id));
    }
  };

  const updateSet = (id: string, field: 'weight' | 'reps', value: string) => {
    setSets(sets.map(set => 
      set.id === id ? { ...set, [field]: value } : set
    ));
  };

  const handleSave = () => {
    // This would typically save to a database
    console.log({
      date,
      bodyPart,
      exercise,
      sets: sets.map(set => ({
        weight: parseFloat(set.weight),
        reps: parseInt(set.reps),
        unit: useKg ? 'kg' : 'lb'
      })),
      notes
    });
    
    // Reset form or provide feedback
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Dumbbell className="h-5 w-5 mr-2" />
          Quick Workout Log
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Date & Time Selection */}
        <div className="flex items-center gap-4">
          <div className="space-y-2 flex-1">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarClock className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2 flex-1">
            <Label>Time</Label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              <Input 
                type="time" 
                className="border-none focus-visible:outline-none focus-visible:ring-0 p-0 h-auto"
                defaultValue="12:00"
              />
            </div>
          </div>
        </div>

        {/* Body Part & Exercise Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bodyPart">Body Part</Label>
            <Select value={bodyPart} onValueChange={setBodyPart}>
              <SelectTrigger>
                <SelectValue placeholder="Select body part" />
              </SelectTrigger>
              <SelectContent>
                {bodyPartOptions.map(part => (
                  <SelectItem key={part} value={part}>{part}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="exercise">Exercise</Label>
            <Select value={exercise} onValueChange={setExercise} disabled={!bodyPart}>
              <SelectTrigger>
                <SelectValue placeholder={bodyPart ? "Select exercise" : "Select body part first"} />
              </SelectTrigger>
              <SelectContent>
                {bodyPart && exerciseOptions[bodyPart]?.map(ex => (
                  <SelectItem key={ex} value={ex}>{ex}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Weight Unit Toggle */}
        <div className="flex items-center justify-between">
          <Label>Weight Unit</Label>
          <div className="flex items-center space-x-2">
            <span className="text-sm">kg</span>
            <Switch 
              checked={!useKg} 
              onCheckedChange={() => setUseKg(!useKg)} 
            />
            <span className="text-sm">lb</span>
          </div>
        </div>

        {/* Sets & Reps */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Sets & Reps</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={handleAddSet}
              disabled={!exercise}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Set
            </Button>
          </div>
          
          {sets.map((set, index) => (
            <div key={set.id} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder={`Weight (${useKg ? 'kg' : 'lb'})`}
                  value={set.weight}
                  onChange={(e) => updateSet(set.id, 'weight', e.target.value)}
                  disabled={!exercise}
                />
              </div>
              
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Reps"
                  value={set.reps}
                  onChange={(e) => updateSet(set.id, 'reps', e.target.value)}
                  disabled={!exercise}
                />
              </div>
              
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveSet(set.id)}
                disabled={sets.length <= 1 || !exercise}
              >
                <Trash2 className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Notes (optional)</Label>
          <Textarea
            placeholder="Add any notes about this exercise..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Save Button */}
        <Button 
          onClick={handleSave} 
          className="w-full gradient-purple"
          disabled={!bodyPart || !exercise || !sets.some(s => s.weight && s.reps)}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Exercise
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickLog;
