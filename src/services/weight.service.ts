
import { supabase } from '@/lib/supabase-client';

export interface WeightEntry {
  id?: string;
  user_id?: string;
  date: Date;
  weight: number;
  body_fat?: number;
  time_of_day: string;
  notes?: string;
  created_at?: string;
}

export const weightService = {
  async getWeightEntries(): Promise<WeightEntry[]> {
    const { data, error } = await supabase
      .from('weight_entries')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Error fetching weight entries:', error);
      throw error;
    }
    
    return data.map(entry => ({
      ...entry,
      date: new Date(entry.date)
    }));
  },
  
  async addWeightEntry(entry: WeightEntry): Promise<WeightEntry> {
    const { data, error } = await supabase
      .from('weight_entries')
      .insert([{
        date: entry.date.toISOString().split('T')[0],
        weight: entry.weight,
        body_fat: entry.body_fat,
        time_of_day: entry.time_of_day,
        notes: entry.notes
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error adding weight entry:', error);
      throw error;
    }
    
    return {
      ...data,
      date: new Date(data.date)
    };
  },
  
  async updateWeightEntry(id: string, entry: Partial<WeightEntry>): Promise<WeightEntry> {
    const { data, error } = await supabase
      .from('weight_entries')
      .update({
        ...(entry.date && { date: entry.date.toISOString().split('T')[0] }),
        ...(entry.weight && { weight: entry.weight }),
        ...(entry.body_fat !== undefined && { body_fat: entry.body_fat }),
        ...(entry.time_of_day && { time_of_day: entry.time_of_day }),
        ...(entry.notes !== undefined && { notes: entry.notes })
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating weight entry:', error);
      throw error;
    }
    
    return {
      ...data,
      date: new Date(data.date)
    };
  },
  
  async deleteWeightEntry(id: string): Promise<void> {
    const { error } = await supabase
      .from('weight_entries')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting weight entry:', error);
      throw error;
    }
  },
  
  async exportWeightData(): Promise<string> {
    const { data, error } = await supabase
      .from('weight_entries')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) {
      console.error('Error exporting weight data:', error);
      throw error;
    }
    
    // Convert to CSV
    const headers = ['Date', 'Weight', 'Body Fat %', 'Time of Day', 'Notes'];
    const csvData = data.map(entry => {
      return [
        entry.date,
        entry.weight,
        entry.body_fat || '',
        entry.time_of_day,
        entry.notes || ''
      ].join(',');
    });
    
    return [headers.join(','), ...csvData].join('\n');
  }
};
