
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, Download, LineChart, Scale, Settings2, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import WeightChart from './WeightChart';
import { useToast } from '@/hooks/use-toast';
import { weightService, WeightEntry } from '@/services/weight.service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const WeightTracking: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [weight, setWeight] = useState<string>('');
  const [bodyFat, setBodyFat] = useState<string>('');
  const [timeOfDay, setTimeOfDay] = useState<string>('morning');
  const [notes, setNotes] = useState<string>('');
  const [useKg, setUseKg] = useState<boolean>(true);
  const [chartPeriod, setChartPeriod] = useState<'7' | '30' | '90'>('30');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Query to fetch weight entries
  const { data: weights = [], isLoading } = useQuery({
    queryKey: ['weightEntries'],
    queryFn: weightService.getWeightEntries,
  });

  // Mutation to add a weight entry
  const addWeightMutation = useMutation({
    mutationFn: weightService.addWeightEntry,
    onSuccess: () => {
      // Invalidate the query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['weightEntries'] });
      
      toast({
        title: "Weight entry added",
        description: "Your weight entry has been saved successfully.",
      });
      
      // Reset form fields
      setWeight('');
      setBodyFat('');
      setNotes('');
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save weight entry",
        variant: "destructive",
      });
    },
  });

  const handleAddWeight = () => {
    if (!weight) return;
    
    const newWeight: WeightEntry = {
      date,
      weight: parseFloat(weight),
      body_fat: bodyFat ? parseFloat(bodyFat) : undefined,
      time_of_day: timeOfDay,
      notes
    };
    
    addWeightMutation.mutate(newWeight);
  };

  const handleExportData = async () => {
    try {
      const csvData = await weightService.exportWeightData();
      
      // Create downloadable file
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `weight-data-${format(new Date(), 'yyyy-MM-dd')}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Data exported",
        description: "Your weight data has been exported as CSV.",
      });
    } catch (error: any) {
      toast({
        title: "Export failed",
        description: error.message || "Failed to export weight data",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Scale className="h-5 w-5 mr-2" />
            Log Weight
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
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
                    <CalendarIcon className="mr-2 h-4 w-4" />
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

            <div className="space-y-2">
              <Label>Time of Day</Label>
              <Select defaultValue={timeOfDay} onValueChange={setTimeOfDay}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time of day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Weight</Label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">kg</span>
                  <Switch 
                    checked={useKg} 
                    onCheckedChange={setUseKg} 
                  />
                  <span className="text-sm text-gray-500">lb</span>
                </div>
              </div>
              <Input 
                type="number" 
                placeholder={`Weight in ${useKg ? 'kg' : 'lb'}`}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Body Fat % (optional)</Label>
              <Input 
                type="number" 
                placeholder="Body fat percentage"
                value={bodyFat}
                onChange={(e) => setBodyFat(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Notes (optional)</Label>
              <Textarea 
                placeholder="Any notes about this measurement..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <Button 
              className="w-full gradient-purple" 
              onClick={handleAddWeight}
              disabled={addWeightMutation.isPending || !weight}
            >
              {addWeightMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Weight Entry"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <LineChart className="h-5 w-5 mr-2" />
            Weight Progress
          </CardTitle>
          <div className="flex space-x-2">
            <Tabs value={chartPeriod} onValueChange={(value: string) => setChartPeriod(value as '7' | '30' | '90')}>
              <TabsList>
                <TabsTrigger value="7">7 Days</TabsTrigger>
                <TabsTrigger value="30">30 Days</TabsTrigger>
                <TabsTrigger value="90">90 Days</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="icon" onClick={handleExportData}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 text-empowerfit-purple animate-spin" />
            </div>
          ) : (
            <>
              <WeightChart weights={weights} period={chartPeriod} useKg={useKg} />
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Recent Entries</h3>
                <div className="max-h-64 overflow-y-auto">
                  {weights.length > 0 ? (
                    <table className="w-full text-sm">
                      <thead>
                        <tr>
                          <th className="text-left pb-2">Date</th>
                          <th className="text-left pb-2">Weight</th>
                          <th className="text-left pb-2">Body Fat</th>
                          <th className="text-left pb-2">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {weights.slice(0, 10).map((entry) => (
                          <tr key={entry.id} className="border-t border-gray-100">
                            <td className="py-2">{format(entry.date, 'MMM dd, yyyy')}</td>
                            <td className="py-2">{entry.weight} {useKg ? 'kg' : 'lb'}</td>
                            <td className="py-2">{entry.body_fat ? `${entry.body_fat}%` : '-'}</td>
                            <td className="py-2 capitalize">{entry.time_of_day}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No weight entries yet. Start by logging your weight.</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WeightTracking;
