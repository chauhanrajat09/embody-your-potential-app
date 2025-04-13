
import { createClient } from '@supabase/supabase-js';

// Use hardcoded default values if environment variables are not available
// IMPORTANT: These should be replaced with your actual Supabase project values
// after you've set them up in your environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Log a more helpful error message instead of crashing the app
if (supabaseUrl === 'https://your-project-id.supabase.co' || supabaseAnonKey === 'your-anon-key') {
  console.warn(
    'Using placeholder Supabase credentials. Please replace with your actual Supabase URL and anon key in the environment variables.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export a function to check if we're using real credentials
export const isUsingRealSupabaseCredentials = () => {
  return supabaseUrl !== 'https://your-project-id.supabase.co' && 
         supabaseAnonKey !== 'your-anon-key';
};
