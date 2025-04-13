
import { supabase } from '@/lib/supabase-client';

export interface WorkoutSet {
  id?: string;
  weight: number;
  reps: number;
  set_number: number;
  exercise_log_id?: string;
}

export interface ExerciseLog {
  id?: string;
  exercise_id: string;
  exercise_name: string;
  workout_log_id?: string;
  notes?: string;
  sets: WorkoutSet[];
  created_at?: string;
}

export interface WorkoutLog {
  id?: string;
  user_id?: string;
  workout_template_id?: string | null;
  name: string;
  date: Date;
  duration?: number; // in minutes
  notes?: string;
  exercises: ExerciseLog[];
  created_at?: string;
}

export const workoutService = {
  async getWorkoutLogs(): Promise<WorkoutLog[]> {
    const { data, error } = await supabase
      .from('workout_logs')
      .select(`
        *,
        exercises:exercise_logs(
          *,
          sets:workout_sets(*)
        )
      `)
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Error fetching workout logs:', error);
      throw error;
    }
    
    return data.map((log: any) => ({
      ...log,
      date: new Date(log.date),
    }));
  },
  
  async addWorkoutLog(workoutLog: WorkoutLog): Promise<WorkoutLog> {
    // First create the workout log
    const { data: workoutData, error: workoutError } = await supabase
      .from('workout_logs')
      .insert([{
        workout_template_id: workoutLog.workout_template_id,
        name: workoutLog.name,
        date: workoutLog.date.toISOString().split('T')[0],
        duration: workoutLog.duration,
        notes: workoutLog.notes
      }])
      .select()
      .single();
    
    if (workoutError) {
      console.error('Error adding workout log:', workoutError);
      throw workoutError;
    }
    
    // Then add all exercise logs for this workout
    const exerciseLogs = await Promise.all(
      workoutLog.exercises.map(async (exercise) => {
        const { data: exerciseData, error: exerciseError } = await supabase
          .from('exercise_logs')
          .insert([{
            exercise_id: exercise.exercise_id,
            exercise_name: exercise.exercise_name,
            workout_log_id: workoutData.id,
            notes: exercise.notes
          }])
          .select()
          .single();
        
        if (exerciseError) {
          console.error('Error adding exercise log:', exerciseError);
          throw exerciseError;
        }
        
        // Then add all sets for this exercise
        const sets = await Promise.all(
          exercise.sets.map(async (set, index) => {
            const { data: setData, error: setError } = await supabase
              .from('workout_sets')
              .insert([{
                weight: set.weight,
                reps: set.reps,
                set_number: index + 1,
                exercise_log_id: exerciseData.id
              }])
              .select()
              .single();
            
            if (setError) {
              console.error('Error adding workout set:', setError);
              throw setError;
            }
            
            return setData;
          })
        );
        
        return {
          ...exerciseData,
          sets
        };
      })
    );
    
    return {
      ...workoutData,
      date: new Date(workoutData.date),
      exercises: exerciseLogs
    };
  },
  
  async logQuickExercise(exerciseLog: {
    exercise_id: string;
    exercise_name: string;
    date: Date;
    notes?: string;
    sets: Array<{ weight: number; reps: number }>;
  }): Promise<WorkoutLog> {
    // Create a quick workout log
    return this.addWorkoutLog({
      name: `Quick ${exerciseLog.exercise_name}`,
      date: exerciseLog.date,
      exercises: [{
        exercise_id: exerciseLog.exercise_id,
        exercise_name: exerciseLog.exercise_name,
        notes: exerciseLog.notes,
        sets: exerciseLog.sets.map((set, index) => ({
          weight: set.weight,
          reps: set.reps,
          set_number: index + 1
        }))
      }]
    });
  }
};
