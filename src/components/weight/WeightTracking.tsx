
import React, { useState } from 'react';
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
import { CalendarIcon, Download, LineChart, Scale, Settings2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import WeightChart from './WeightChart';

interface WeightEntry {
  date: Date;
  weight: number;
  bodyFat?: number;
  timeOfDay: string;
  notes?: string;
}

const WeightTracking: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [weight, setWeight] = useState<string>('');
  const [bodyFat, setBodyFat] = useState<string>('');
  const [timeOfDay, setTimeOfDay] = useState<string>('morning');
  const [notes, setNotes] = useState<string>('');
  const [useKg, setUseKg] = useState<boolean>(true);
  const [weights, setWeights] = useState<WeightEntry[]>([
    { date: new Date(2023, 3, 1), weight: 80, bodyFat: 18, timeOfDay: 'morning' },
    { date: new Date(2023, 3, 3), weight: 79.5, bodyFat: 17.8, timeOfDay: 'morning' },
    { date: new Date(2023, 3, 5), weight: 79.2, bodyFat: 17.5, timeOfDay: 'morning' },
    { date: new Date(2023, 3, 7), weight: 78.8, bodyFat: 17.2, timeOfDay: 'morning' },
    { date: new Date(2023, 3, 10), weight: 78.5, bodyFat: 17.0, timeOfDay: 'morning' },
    { date: new Date(2023, 3, 12), weight: 78.2, bodyFat: 16.8, timeOfDay: 'morning' },
    { date: new Date(2023, 3, 15), weight: 77.8, bodyFat: 16.5, timeOfDay: 'morning' },
  ]);
  const [chartPeriod, setChartPeriod] = useState<'7' | '30' | '90'>('30');

  const handleAddWeight = () => {
    if (!weight) return;
    
    const newWeight = {
      date,
      weight: parseFloat(weight),
      bodyFat: bodyFat ? parseFloat(bodyFat) : undefined,
      timeOfDay,
      notes
    };
    
    setWeights([...weights, newWeight]);
    setWeight('');
    setBodyFat('');
    setNotes('');
  };

  const handleExportData = () => {
    // Export to CSV
    const headers = ['Date', 'Weight', 'Body Fat %', 'Time of Day', 'Notes'];
    const csvData = weights.map(entry => {
      return [
        format(entry.date, 'yyyy-MM-dd'),
        entry.weight,
        entry.bodyFat || '',
        entry.timeOfDay,
        entry.notes || ''
      ].join(',');
    });
    
    const csv = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `weight-data-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

            <Button className="w-full gradient-purple" onClick={handleAddWeight}>
              Save Weight Entry
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
          <WeightChart weights={weights} period={chartPeriod} useKg={useKg} />
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">Recent Entries</h3>
            <div className="max-h-64 overflow-y-auto">
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
                  {weights.slice().reverse().slice(0, 10).map((entry, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="py-2">{format(entry.date, 'MMM dd, yyyy')}</td>
                      <td className="py-2">{entry.weight} {useKg ? 'kg' : 'lb'}</td>
                      <td className="py-2">{entry.bodyFat ? `${entry.bodyFat}%` : '-'}</td>
                      <td className="py-2 capitalize">{entry.timeOfDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeightTracking;
