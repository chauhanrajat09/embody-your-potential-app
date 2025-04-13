
import { supabase } from '@/lib/supabase-client';

export interface Exercise {
  id?: string;
  name: string;
  target: string;
  equipment: string;
  difficulty: string;
  category?: string;
  rep_range?: string;
  demo_url?: string;
  description?: string;
  created_at?: string;
}

export const exerciseService = {
  async getExercises(): Promise<Exercise[]> {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching exercises:', error);
      throw error;
    }
    
    return data;
  },
  
  async getExercisesByTarget(target: string): Promise<Exercise[]> {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('target', target)
      .order('name');
    
    if (error) {
      console.error(`Error fetching exercises for target ${target}:`, error);
      throw error;
    }
    
    return data;
  },
  
  async getExercisesByCategory(category: string): Promise<Exercise[]> {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('category', category)
      .order('name');
    
    if (error) {
      console.error(`Error fetching exercises for category ${category}:`, error);
      throw error;
    }
    
    return data;
  },
  
  async addExercise(exercise: Exercise): Promise<Exercise> {
    const { data, error } = await supabase
      .from('exercises')
      .insert([exercise])
      .select()
      .single();
    
    if (error) {
      console.error('Error adding exercise:', error);
      throw error;
    }
    
    return data;
  }
};
